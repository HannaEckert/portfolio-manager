class ImageDrag extends BaseImageHandler {

	constructor(window, document, callback) {
		super(window, document)
		this.callback = callback

		this.connectHandlers = () => {
			this.pollImagesLoaded(() => {
				this.getAllImages().forEach( (image, index) => {
					image.id = `image-${index}`
					image.draggable = true

					image.removeEventListener('drop', this.drop)
					image.removeEventListener('dragover', this.dragOver)
					image.removeEventListener('dragstart', this.dragStart)

					image.addEventListener('drop', this.drop)
					image.addEventListener('dragover', this.dragOver)
					image.addEventListener('dragstart', this.dragStart)
				})
			})
		}

		this.dragStart = ev => {
			ev.dataTransfer.setData("text", ev.target.id)
		}

		this.dragOver = ev => {
			ev.preventDefault()
		}

		this.drop = ev => {
			ev.preventDefault()
		
			let id = ev.dataTransfer.getData("text")
			let dragged = this.document.getElementById(id)
			
			let images = Array.prototype.slice.call(this.getAllImages())
			if(images.indexOf(dragged) > images.indexOf(ev.target)) {
				ev.target.parentNode.insertBefore(dragged, ev.target)
			} else {
				ev.target.parentNode.insertBefore(dragged, ev.target.nextSibling)
			}
	
		 this.callback(Array.prototype.slice.call(this.getAllImages()).map(image => image.src))
		}

		this.connectHandlers()
	}

	resetHandlers() {
		this.connectHandlers()
	}
}

