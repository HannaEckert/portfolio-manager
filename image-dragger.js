function ImageDragger(window, document, dropCallback) {

	pollImagesLoaded(() => {
		getAllImages().forEach( (image, index) => {
			image.id = `image-${index}`
			image.draggable = true
			image.addEventListener('drop', drop)
			image.addEventListener('dragover', dragOver)
			image.addEventListener('dragstart', dragStart)
		})
	})	
	
	function dragStart(ev) {
		ev.dataTransfer.setData("text", ev.target.id)
	}
	
	function dragOver(ev) {
		ev.preventDefault()
	}
	
	function drop(ev) {
		ev.preventDefault()
		
		let id = ev.dataTransfer.getData("text")
		let dragged = document.getElementById(id)
		
		images = Array.prototype.slice.call(getAllImages())
		if(images.indexOf(dragged) > images.indexOf(ev.target)) {
			ev.target.parentNode.insertBefore(dragged, ev.target)
		} else {
			ev.target.parentNode.insertBefore(dragged, ev.target.nextSibling)
		}

		dropCallback(Array.prototype.slice.call(getAllImages()).map(image => image.src))
	}
	
	function pollImagesLoaded(callback) {
		let loadingCircle = document.querySelector('.loading_circle')
		
		if(loadingCircle && loadingCircle.classList.contains('p100')) {
			callback()
		} else {
			window.setTimeout(() => {
				pollImagesLoaded(callback)
			}, 1000)
		}
	}

	function getAllImages() {
		return document.querySelectorAll('#gallery img')
	}
}

