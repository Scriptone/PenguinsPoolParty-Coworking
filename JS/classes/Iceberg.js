import Pattern from "./Pattern.js";
import Tile from "./Tile.js";
class Iceberg {
	constructor(pattern, point, width, height) {
		this.element = document.createElement("div");
		this.element.classList.add("iceberg");

		this.pattern = pattern;
		this.point = point;
		this.initialPoint = point;
		this.cache = []; //Each rotation point is cached
		this.width = width;
		this.height = height;
	}

	draw(offsetX = 0, offsetY = 0) {
		const element = this.element;
		element.style.width = `${this.width}px`;
		element.style.height = `${this.height}px`;

		let point = this.point;
		this.left = point[0] * this.width * 0.75;
		this.top =
			point[1] * this.height - (Math.abs(point[0] % 2) * this.height) / 2;

		element.style.left =
			`${this.left + offsetX + this.pattern.padding * 8}px`;
		element.style.top = `${this.top + offsetY + this.pattern.padding * 8}px`;
		//element.innerHTML = `${this.point[0]}, ${this.point[1]}`;
	}

	cleanUp() {
		this.element?.remove();
		this.element = null;
		this.pattern = null;
		this.point = null;
		this.initialPoint = null;
		this.cache = null;
	}
}

export default Iceberg;
