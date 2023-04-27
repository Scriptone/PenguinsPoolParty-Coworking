import Pattern from "./Pattern.js";
import Tile from "./Tile.js";
class Iceberg  {

	constructor(pattern, point) {
		this.element = document.createElement("div");
		this.element.classList.add("iceberg");

		this.pattern = pattern;
		this.point = point;
		this.initialPoint = point;
		this.cache = []; //Each rotation point is cached
	}

	draw(offsetX = 0, offsetY = 0) {
		const element = this.element;
		element.style.width = Tile.tileWidth + "px";
		element.style.height = Tile.tileHeight + "px";

		let point = this.point;
		this.left = point[0] * Tile.tileWidth * 0.75;
		this.top =
			point[1] * Tile.tileHeight -
			(Math.abs(point[0] % 2) * Tile.tileHeight) / 2;

		element.style.left = this.left + offsetX + this.pattern.padding * 8 + "px";
		element.style.top = this.top + offsetY + this.pattern.padding * 8 + "px";
		//element.innerHTML = `${this.point[0]}, ${this.point[1]}`;
	}
}

export default Iceberg;
