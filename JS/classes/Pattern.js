const patterns = document.querySelector(".patterns");
import Iceberg from "./Iceberg.js";
class Pattern {
	constructor(points) {
		this.element = document.createElement("div");
		this.element.classList.add("pattern");

		this.points = points;
		this.icebergs = [];

		let patternWidth = 0;
		let patternHeight = 0;
		for (let i = 0; i < points.length; i++) {
			let point = points[i];
			let iceberg = new Iceberg(point);
			this.icebergs.push(iceberg);
			iceberg.draw();
			iceberg.element.innerHTML = point;

			let left = point[0] * Iceberg.tileWidth * 0.75;
			let top = point[1] * Iceberg.tileHeight - (point[0] % 2) * Iceberg.tileHeight / 2;
			iceberg.element.style.left = left + "px";
			iceberg.element.style.top = top + "px";

			patternWidth = Math.max(patternWidth, left);
			patternHeight = Math.max(patternHeight, top);

			this.element.appendChild(iceberg.element);
		}


		this.element.style.width = patternWidth + Iceberg.tileWidth + "px";
		this.element.style.height = patternHeight + Iceberg.tileHeight + "px";
		this.element.addEventListener("mousedown", this.startDrag.bind(this));
		this.element.addEventListener("mouseup", this.stopDrag.bind(this));
		this.element.addEventListener("mousemove", this.drag.bind(this));

		this.dragging = false;
		this.offsetX = 0;
		this.offsetY = 0;

		patterns.appendChild(this.element);
	}

	startDrag(event) {
		this.dragging = true;
	}

	stopDrag(event) {
		this.dragging = false;
	}

	drag(event) {
		if (!this.dragging) return;
		console.log("dragging");
	}
}

export default Pattern;
