class Pattern {
	constructor(element) {
		this.element = element;

		this.element.ondragstart = function () {
			return false;
		};

		//Clone pattern
		this.clone = this.element.cloneNode(true);
		this.clone.classList.add("clone");
		this.clone.style.position = "absolute";
		this.clone.style.left = this.element.offsetLeft + "px";
		this.clone.style.top = this.element.offsetTop + "px";

		this.clone.style.transformOrigin = "center";
		this.element.parentNode.appendChild(this.clone);

		this.element.style.filter = "grayScale(100%)";
		this.element.style.zIndex = "1";
		this.clone.style.zIndex = "2";

		this.clone.ondragstart = function () {
			return false;
		};
		this.clone.addEventListener("mousedown", (event) =>
			this.startDrag(event)
		);
		document.addEventListener("mouseup", (event) => this.stopDrag(event));
		document.addEventListener("mousemove", (event) => this.drag(event));

		//Scrollwheel
		document.addEventListener("wheel", (event) => this.rotate(event));

		//Of toetsenbord pijltjes
		document.addEventListener("keydown", (event) => {
			//Links of rechts
			event.deltaY =
				event.keyCode == 37 ? -1 : event.keyCode == 39 ? 1 : 0;

			console.log(event.deltaY);
			if (event.deltaY != 0) this.rotate(event);

			//Flip indien spatie
			if (event.keyCode == 32) this.flip();
		});
	}

	startDrag(event) {
		this.dragging = true;
		this.offsetX = event.clientX - this.clone.offsetLeft;
		this.offsetY = event.clientY - this.clone.offsetTop;
	}

	stopDrag(event) {

		if (!this.dragging) return;
		//Check if clone is on board
		let board = document.querySelector("#board");
		let boardRect = board.getBoundingClientRect();
		let cloneRect = this.clone.getBoundingClientRect();

		if (
			cloneRect.left > boardRect.left &&
			cloneRect.right < boardRect.right &&
			cloneRect.top > boardRect.top &&
			cloneRect.bottom < boardRect.bottom
		) {
			//Clone is on board
			this.clone.style.left = cloneRect.left - boardRect.left + "px";
			this.clone.style.top = cloneRect.top - boardRect.top + "px";

			//Add clone to board
			board.appendChild(this.clone);
		} else {
			//Clone is not on board
			//Go back to original location
			this.clone.style.left = this.element.offsetLeft + "px";
			this.clone.style.top = this.element.offsetTop + "px";
		}

		this.dragging = false;

		//Conclusie: nieuwe patronen maken in JS zelf, want een volledige SVG is niet handig.
	}

	drag(event) {
		if (!this.dragging) return;
		this.clone.style.left = event.clientX - this.offsetX + "px";
		this.clone.style.top = event.clientY - this.offsetY + "px";
	}

	rotate(event) {
		event.preventDefault();
		if (!this.dragging) return;

		let direction = event.deltaY > 0 ? 1 : -1;
		let currentRotation = this.clone.style.rotate;
		currentRotation = currentRotation == "" ? 0 : parseInt(currentRotation);
		let newRotation = currentRotation + direction * 60;

		console.log(newRotation);
		this.clone.style.rotate = `${newRotation}deg`;
	}

	flip() {

		if (!this.dragging) return;
		let currentScale = this.clone.style.scale;
		currentScale = currentScale == "" ? 1 : parseInt(currentScale);
		let newScale = currentScale * -1;
		this.clone.style.scale = `${newScale} 1`;
	}
}

export default Pattern;
