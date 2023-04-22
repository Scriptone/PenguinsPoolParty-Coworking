class Tile {
	static tileWidth = 51;
	static tileHeight = 44;
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.element = document.createElement("div");
		this.icebergs = [];
	}

	draw() {
		const element = this.element;
		element.classList.add("tile");
		element.classList.add(`tile-${this.x}-${this.y}`);
		element.style.width = Tile.tileWidth + "px";
		element.style.height = Tile.tileHeight + "px";
	}

	addIceberg(iceberg) {
		this.icebergs.push(iceberg);
		this.element.appendChild(iceberg.element);
	}
}

export default Tile;
