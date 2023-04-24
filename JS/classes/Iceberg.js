import Pattern from "./Pattern.js";

class Iceberg {
	static tileWidth = 50;
	static tileHeight = 44;
	constructor(pattern, point) {
		this.element = document.createElement("div");
		this.element.classList.add("iceberg");

		this.pattern = pattern;
		this.point = point;
		this.initialPoint = point;
		this.cache = []; //Each rotation point is cached
	}

	draw() {
		const element = this.element;
		element.style.width = Iceberg.tileWidth + "px";
		element.style.height = Iceberg.tileHeight + "px";

		let point = this.point;
		this.left = point[0] * Iceberg.tileWidth * 0.75;
		this.top =
			point[1] * Iceberg.tileHeight -
			(Math.abs(point[0] % 2) * Iceberg.tileHeight) / 2;

		element.style.left = this.left + this.pattern.padding * 8 + "px";
		element.style.top = this.top + this.pattern.padding * 8 + "px";
	}
}

export default Iceberg;
