import { FileAction, registerFileAction, Permission } from '@nextcloud/files'
import { showSuccess, showInfo, showError } from '@nextcloud/dialogs'
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

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
				const prefix = path.split("/").pop();
				showInfo(`Identifying songs in ${prefix}...`)
			} else {
				window.clearInterval(timer)
				showSuccess('Song identification done')
			}
		} catch (e) {
			window.clearInterval(timer)
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
		return nodes.length === 1
			&& (nodes[0].permissions & Permission.READ) !== 0
	},

	exec: async (node) => {
		try {
			await axios.post(generateUrl('/apps/song_finder/start'), {
				path: node.path,
			})
			watchJob(node.path)
			return true
		} catch (e) {
			console.error(e)
			return false
		}
	},
}))
