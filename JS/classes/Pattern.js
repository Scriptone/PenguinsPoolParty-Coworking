const patterns = document.querySelector(".patterns");
import Iceberg from "./Iceberg.js";
class Pattern {
	constructor(points) {
		this.element = document.createElement("div");
		this.element.classList.add("pattern");
		this.padding = 2; // rem
		this.points = points;
		this.icebergs = [];

		let patternWidth = 0;
		let patternHeight = 0;
		for (let i = 0; i < points.length; i++) {
			let point = points[i];
			let iceberg = new Iceberg(point);
			this.icebergs.push(iceberg);
			iceberg.draw();

			let left = point[0] * Iceberg.tileWidth * 0.75;
			let top =
				point[1] * Iceberg.tileHeight -
				((point[0] % 2) * Iceberg.tileHeight) / 2;
			iceberg.element.style.left = left + this.padding * 8 + "px";
			iceberg.element.style.top = top + this.padding * 8 + "px";

			patternWidth = Math.max(patternWidth, left);
			patternHeight = Math.max(patternHeight, top);

			iceberg.element.addEventListener(
				"mousedown",
				this.startDrag.bind(this, iceberg)
			);

			this.element.appendChild(iceberg.element);
		}

		this.element.style.width =
			patternWidth + Iceberg.tileWidth + this.padding * 16 + "px";
		this.element.style.height =
			patternHeight + Iceberg.tileHeight + this.padding * 16 + "px";

		this.dragging = false;
		this.startX = 0;
		this.startY = 0;
		document.addEventListener("mouseup", this.stopDrag.bind(this));
		document.addEventListener("mousemove", this.drag.bind(this));
		patterns.appendChild(this.element);
	}

	startDrag(iceberg, event) {
		this.dragging = iceberg;
		this.startX = event.clientX;
		this.startY = event.clientY;
	}

	stopDrag(event) {
		//Dropped on the board
		if (!this.dragging) return;
		let iceberg = this.dragging;
		this.dragging = false;

		let board = this.board;
		let result = board.drawPattern(this, iceberg);
		if (result) {
			this.element.remove();
		}
	}

	drag(event) {
		if (!this.dragging) return;
		let offsetX = event.clientX - this.startX;
		let offsetY = event.clientY - this.startY;

		this.startX = event.clientX;
		this.startY = event.clientY;
		for (let iceberg of this.icebergs) {
			let left = parseInt(iceberg.element.style.left);
			let top = parseInt(iceberg.element.style.top);
			iceberg.element.style.left = left + offsetX + "px";
			iceberg.element.style.top = top + offsetY + "px";
		}
	}

	setBoard(board) {
		this.board = board;
	}
}

export default Pattern;
