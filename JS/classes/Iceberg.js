import Pattern from "./Pattern.js";

class Iceberg {
	static tileWidth = 50;
	static tileHeight = 44;
	constructor(point) {
		this.element = document.createElement("div");
		this.element.classList.add("iceberg");

		this.point = point;
	}

	draw() {
		const element = this.element;
		element.style.width = Iceberg.tileWidth + "px";
		element.style.height = Iceberg.tileHeight + "px";
	}
}

export default Iceberg;
