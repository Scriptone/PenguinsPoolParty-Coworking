class Tile {
	static tileWidth = 50;
	static tileHeight = 44;
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.element = document.createElement("div");
		this.icebergs = [];
		this.penguin = null;
	}

	draw() {
		const element = this.element;
		element.classList.add("tile");
		element.classList.add(`tile-${this.x}-${this.y}`);
		element.style.width = Tile.tileWidth + "px";
		element.style.height = Tile.tileHeight + "px";
		element.innerHTML = this.x + ", " + this.y;
	}

	addIceberg(iceberg) {
		this.icebergs.push(iceberg);
		this.element.classList.add("iceberg");
	}

	addPenguin(penguin) {
		this.penguin = penguin;
		penguin.setTile(this);
	}
}

export default Tile;
