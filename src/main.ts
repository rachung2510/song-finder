import { FileAction, registerFileAction, Permission } from '@nextcloud/files'
import { showSuccess, showInfo, showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

const runningPaths = new Set<string>()

async function getStatus(path: string): Promise<{ running: boolean }> {
	const response = await axios.get(generateUrl('/apps/song_finder/status'), {
		params: { path },
	})
	return response.data
}

function watchJob(path: string): void {
	const timer = window.setInterval(async () => {
		try {
			const status = await getStatus(path)

			if (status.running) {
				runningPaths.add(path)
				const name = path.split('/').pop() || path
				showInfo(`Identifying songs in ${name}...`)
			} else {
				window.clearInterval(timer)
				runningPaths.delete(path)
				showSuccess('Song identification done')
			}
		} catch (e) {
			window.clearInterval(timer)
			runningPaths.delete(path)
			showError('Could not check status')
			console.error(e)
		}
	}, 10000)
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
		const path = node.path
		if (runningPaths.has(path)) {
			return false
		}
		return (node.permissions & Permission.READ) !== 0
	},

	exec: async (node) => {
		const path = node.path
		try {
			const status = await getStatus(path)
			if (status.running) {
				runningPaths.add(path)
				showInfo('Song Finder is already processing this item')
				watchJob(path)
				return false
			}
			runningPaths.add(path)
			await axios.post(generateUrl('/apps/song_finder/start'), {
				path,
			})
			watchJob(path)
			return true
		} catch (e) {
			runningPaths.delete(path)
			console.error(e)
			return false
		}
	},
}))
