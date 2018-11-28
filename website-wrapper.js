document.addEventListener('DOMContentLoaded', () => {
	let electron = require('electron')
	let remote = electron.remote.require('./main')
	let frame = document.createElement('iframe')
	frame.src = remote.getUrl()
	let callback = remote.updateImages.bind(remote)

	document.body.appendChild(frame)
	let frameWindow = frame.contentWindow

	frameWindow.addEventListener('load', () => {
		let frameDocument = frameWindow.document
		frameDocument.body.style.overflowX = 'hidden'

		let imageDrag = new ImageDrag(frameWindow, frameDocument, callback)
		let imageDelete = new ImageDelete(frameWindow, frameDocument, callback)
		new ImageAdd(frameWindow, frameDocument, callback, () => {
			imageDrag.resetHandlers()
			imageDelete.resetHandlers()
		})
	})
})