class BaseImageHandler {
	constructor(window, document) {
		this.window = window
		this.document = document

		this.pollImagesLoaded = callback => {
			let loadingCircle = this.document.querySelector('.loading_circle')
			
			if(loadingCircle && loadingCircle.classList.contains('p100')) {
				callback()
			} else {
				this.window.setTimeout(() => {
					this.pollImagesLoaded(callback)
				}, 200)
			}
		}

		this.getAllImages = () => {
			return this.document.querySelectorAll('#gallery img')
		}
	}

	

	
}
