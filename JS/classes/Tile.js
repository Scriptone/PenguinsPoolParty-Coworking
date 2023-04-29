class Tile {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.element = document.createElement("div");
		this.iceberg = null;
		this.penguin = null;
		this.width = width;
		this.height = height;
	}

	draw() {
		const element = this.element;
		element.classList.add("tile", `tile-${this.x}-${this.y}`);
		element.style.width = `${this.width}px`;
		element.style.height = `${this.height}px`;

		// element.innerHTML = `${this.x}, ${this.y}`
	}

	addIceberg(iceberg) {
		this.iceberg = iceberg;
		this.element.classList.add("iceberg", "placed");
	}

	addPenguin(penguin) {
		this.penguin = penguin;
		penguin.setTile(this);
	}
}

export default Tile;
