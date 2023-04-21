
class Tile {
	static tileWidth = 51;
	static tileHeight = 44;
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.element = document.createElement("div");
	}

	draw() {
		const element = this.element;
		element.classList.add("tile");
		element.classList.add(`tile-${this.x}-${this.y}`);
		element.style.width = Tile.tileWidth + "px";
		element.style.height = Tile.tileHeight + "px";

		//Positioning
		element.style.left = this.y * Tile.tileWidth * 0.75 + "px";

		element.style.top =
			this.x * Tile.tileHeight + ((this.y % 2 == 0? 1:0) * Tile.tileHeight) / 2 + "px";

		//element.innerHTML = this.x + "-" + this.y;
	}
}

export default Tile;
