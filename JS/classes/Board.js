import Tile from "./Tile.js";

class Board {
	constructor (penguins) {
		this.penguins = penguins;
		this.element = document.getElementById("board");
		this.tiles = [];
		this.height = 4;
		this.width = 5;
	}

	draw() {
		
		for (let i = 0; i < this.height; i++) {
			this.tiles[i] = [];
			for (let j = 0; j < this.width; j++) {
				let tile = new Tile(i, j)
				this.tiles[i][j] = tile;
				tile.draw();
				this.element.appendChild(tile.element);

				// Add penguins to the board
				for (let penguin of this.penguins) {
					if (penguin.x == i && penguin.y == j) {
						penguin.setTile(tile);
					}
				}
			}
		}
		const mapWidthPx = (Tile.tileWidth / 4) * (this.width * 3 + 1);
		const mapHeightPx = this.height * Tile.tileHeight + Tile.tileHeight / 2;
		this.element.style.width = mapWidthPx + "px";
		this.element.style.height = mapHeightPx + "px";
	}
}

export default Board;
