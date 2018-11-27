class ImageAdd extends BaseImageHandler {

	constructor(window, document, callback, resetHandlers) {
		super(window, document)
		this.callback = callback
		this.resetHandlers = resetHandlers

		this.createDropContainer = () => {
			let dropContainer = this.document.createElement('div')
			
			dropContainer.style.width = '500px'
			dropContainer.style.height = '150px'
			dropContainer.style.position = 'absolute'
			dropContainer.style.top = '25px'
			dropContainer.style.right = '30px'
			dropContainer.style.border = '7px dashed #888'
			dropContainer.style.borderRadius = '30px'
			dropContainer.style.cursor = 'pointer'
			
			return dropContainer
		}

		this.createLabel = () => {
			let label = this.document.createElement('div')

			label.style.color = '#888'
			label.style.fontSize = '70px'
			label.style.fontFamily = 'monospace'
			label.style.fontWeight = 'bold'
			label.style.position = 'relative'
			label.style.top = '20px'
			label.style.left = '50px'
			label.innerHTML = 'DROP HERE'

			return label
		}

		this.noopHandler = event => {
			event.stopPropagation()
			event.preventDefault()
		}

		this.drop = event => {
			event.stopPropagation()
			event.preventDefault()

			let imageUrl = event.dataTransfer.getData('URL')
			let image = this.document.createElement('img')
			image.src = imageUrl
			image.style.width = '100%'

			let gallery = this.document.getElementById('gallery')
			gallery.insertBefore(image, gallery.firstChild)

			this.resetHandlers()
			this.callback(Array.prototype.slice.call(this.getAllImages()).map(image => image.src))
		}

		this.appendDropContainer = () => {
			let dropContainer = this.createDropContainer()
			let icon = this.createLabel()
	
			dropContainer.appendChild(icon)
			this.document.body.appendChild(dropContainer)
	
			dropContainer.addEventListener('dragenter', this.noopHandler);
			dropContainer.addEventListener('dragexit', this.noopHandler);
			dropContainer.addEventListener('dragover', this.noopHandler);
			dropContainer.addEventListener('drop', this.drop);
		}

		this.appendDropContainer()
	}

}

