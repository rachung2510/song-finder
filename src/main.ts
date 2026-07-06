import { FileAction, registerFileAction, Permission, type Node } from '@nextcloud/files'
import { showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

const POLL_INTERVAL = 10000 // poll for job completion
const DONE_TTL = 6000 // how long "done" checkmark lingers
const FADE_MS = 400 // length of fade-out transition; must match css

const BADGE_CLASS = 'song-finder-badge'

type JobState = 'running' | 'done'

interface Job {
	fileid: number
	path: string
	name: string
	state: JobState
	pollTimer?: number
	clearTimer?: number
}

const jobs = new Map<number, Job>()

const runningPaths = new Set<string>()

const SPINNER_SVG =
	'<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2Z"/></svg>'
const CHECK_SVG =
	'<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'

function injectStyles(): void {
	if (document.getElementById('song-finder-styles')) {
		return
	}
	const style = document.createElement('style')
	style.id = 'song-finder-styles'
	style.textContent = `
		.${BADGE_CLASS} {
			display: inline-flex;
			align-items: center;
			margin-inline-start: 6px;
			vertical-align: middle;
			opacity: 1;
			transition: opacity ${FADE_MS}ms ease;
		}
		.${BADGE_CLASS}--hiding {
			opacity: 0;
		}
		.${BADGE_CLASS}[data-state="running"] {
			color: var(--color-primary-element, #0082c9);
			animation: song-finder-spin 1s linear infinite;
		}
		.${BADGE_CLASS}[data-state="done"] {
			color: var(--color-success, #46ba61);
		}
		@keyframes song-finder-spin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
	`
	document.head.appendChild(style)
}

function findRow(fileid: number): HTMLElement | null {
	return document.querySelector(`[data-cy-files-list-row-fileid="${fileid}"]`)
}

function findBadgeHost(row: HTMLElement): HTMLElement {
	return (
		(row.querySelector('.files-list__row-name-text') as HTMLElement | null) ??
		(row.querySelector('.files-list__row-name') as HTMLElement | null) ??
		row
	)
}

let renderScheduled = false
function scheduleRender(): void {
	if (renderScheduled) {
		return
	}
	renderScheduled = true
	window.requestAnimationFrame(() => {
		renderScheduled = false
		renderBadges()
	})
}

function renderBadges(): void {
	// Drop badges whose job is gone.
	document.querySelectorAll<HTMLElement>(`.${BADGE_CLASS}`).forEach((el) => {
		const id = Number(el.dataset.fileid)
		if (!jobs.has(id)) {
			el.remove()
		}
	})

	for (const job of jobs.values()) {
		const row = findRow(job.fileid)
		if (!row) {
			continue
		}
		let badge = row.querySelector<HTMLElement>(`.${BADGE_CLASS}`)
		if (!badge) {
			badge = document.createElement('span')
			badge.className = BADGE_CLASS
			badge.dataset.fileid = String(job.fileid)
			findBadgeHost(row).appendChild(badge)
		}
		if (badge.dataset.state !== job.state) {
			badge.dataset.state = job.state
			badge.innerHTML = job.state === 'running' ? SPINNER_SVG : CHECK_SVG
			badge.title =
				job.state === 'running'
					? `Identifying songs in ${job.name}…`
					: 'Song identification done'
		}
	}
}

let observer: MutationObserver | null = null
function ensureObserver(): void {
	if (observer) {
		return
	}
	const container =
		document.querySelector('[data-cy-files-list]') ??
		document.querySelector('.files-list') ??
		document.body
	observer = new MutationObserver(() => scheduleRender())
	observer.observe(container, { childList: true, subtree: true })
}

function finishJob(job: Job): void {
	job.state = 'done'
	runningPaths.delete(job.path)
	if (job.pollTimer) {
		window.clearInterval(job.pollTimer)
		job.pollTimer = undefined
	}
	scheduleRender()

	job.clearTimer = window.setTimeout(() => {
		const badge = findRow(job.fileid)?.querySelector<HTMLElement>(`.${BADGE_CLASS}`)
		badge?.classList.add(`${BADGE_CLASS}--hiding`)
		window.setTimeout(() => {
			jobs.delete(job.fileid)
			scheduleRender()
		}, FADE_MS)
	}, DONE_TTL)
}

async function getStatus(path: string): Promise<{ running: boolean }> {
	const response = await axios.get(generateUrl('/apps/song_finder/status'), {
		params: { path },
	})
	return response.data
}

function watchJob(job: Job, path: string): void {
	job.pollTimer = window.setInterval(async () => {
		try {
			const status = await getStatus(path)
			if (!status.running) {
				finishJob(job)
			}
		} catch (e) {
			if (job.pollTimer) {
				window.clearInterval(job.pollTimer)
			}
			jobs.delete(job.fileid)
			runningPaths.delete(path)
			scheduleRender()
			showError('Could not check Song Finder status')
			console.error(e)
		}
	}, POLL_INTERVAL)
}

function startTracking(node: Node, path: string): Job {
	const fileid = node.fileid as number
	const name = path.split('/').pop() || path
	const job: Job = { fileid, path, name, state: 'running' }
	jobs.set(fileid, job)
	runningPaths.add(path)
	injectStyles()
	ensureObserver()
	scheduleRender()
	watchJob(job, path)
	return job
}

registerFileAction(new FileAction({
	id: 'song_finder',
	displayName: () => 'Identify songs',
	iconSvgInline: () => '<svg viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" d="M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm2 11.5a2 2 0 1 1-1-1.73V6h3v2h-2v5.5Z"/></svg>',

	enabled: (nodes) => {
		if (nodes.length !== 1) {
			return false
		}
		const node = nodes[0]
		if (runningPaths.has(node.path)) {
			return false
		}
		return (node.permissions & Permission.READ) !== 0
	},

	exec: async (node) => {
		const path = node.path
		try {
			const status = await getStatus(path)
			if (status.running) {
				// A job (possibly for another file) is already using the single lock.
				startTracking(node, path)
				return false
			}
			await axios.post(generateUrl('/apps/song_finder/start'), { path })
			startTracking(node, path)
			return true
		} catch (e) {
			runningPaths.delete(path)
			console.error(e)
			return false
		}
	},
}))
