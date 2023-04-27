class Tile {
	static tileWidth = 75;
	static tileHeight = 66;
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.element = document.createElement("div");
		this.iceberg = null;
		this.penguin = null;
	}

	draw() {
		const element = this.element;
		element.classList.add("tile");
		element.classList.add(`tile-${this.x}-${this.y}`);
		element.style.width = `${Tile.tileWidth}px`
		element.style.height = `${Tile.tileHeight}px`

		element.innerHTML = `${this.x}, ${this.y}`
	}

	addIceberg(iceberg) {
		this.iceberg = iceberg;
		this.element.classList.add("iceberg");
		this.element.classList.add("placed");
	}

	addPenguin(penguin) {
		this.penguin = penguin;
		penguin.setTile(this);
	}
}

export default Tile;
