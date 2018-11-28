class ImageDelete extends BaseImageHandler {

	constructor(window, document, callback) {
		super(window, document)
		this.callback = callback

		this.connectHandlers = () => {
			this.pollImagesLoaded(() => {
				this.getAllImages().forEach( (image, index) => {
					let doubleClickHandler = () => {
						if(confirm('Really delete the image?')) {
							this.deleteImage(image);
						}
					}
	
					image.removeEventListener('dblClick', doubleClickHandler)
					image.addEventListener('dblclick', doubleClickHandler)
				})
			})
		}

		this.deleteImage = image => {
			image.parentNode.removeChild(image)
			this.callback(Array.prototype.slice.call(this.getAllImages()).map(image => image.src))
		}

		this.connectHandlers()
	}

	resetHandlers() {
		this.connectHandlers()
	}
}
