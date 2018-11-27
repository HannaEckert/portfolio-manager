document.addEventListener('DOMContentLoaded', () => {
	let electron = require('electron')
	let frame = document.createElement('iframe')
	frame.src = electron.remote.require('./main').getUrl()
	let callback = electron.remote.require('./main').updateImages

	document.body.appendChild(frame)
	let frameWindow = frame.contentWindow

	frameWindow.addEventListener('load', () => {
		let frameDocument = frameWindow.document

		let imageDrag = new ImageDrag(frameWindow, frameDocument, callback)
		let imageDelete = new ImageDelete(frameWindow, frameDocument, callback)
		let imageAdd = new ImageAdd(frameWindow, frameDocument, callback, () => {
			imageDrag.resetHandlers()
			imageDelete.resetHandlers()
		})
	})
})