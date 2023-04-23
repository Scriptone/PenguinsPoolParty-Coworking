import Tile from "./Tile.js";

class Board {
	constructor(penguins) {
		this.penguins = penguins;
		this.element = document.getElementById("board");
		this.tiles = [];
		this.height = 4;
		this.width = 5;
		this.padding = 2;
	}

	draw() {
		for (let i = 0; i < this.height; i++) {
			this.tiles[i] = [];
			for (let j = 0; j < this.width; j++) {
				let tile = new Tile(i, j);
				this.tiles[i][j] = tile;
				tile.draw();

				tile.element.style.left =
					j * Tile.tileWidth * 0.75 + this.padding * 8 + "px";

				tile.element.style.top =
					i * Tile.tileHeight +
					((j % 2 == 0 ? 1 : 0) * Tile.tileHeight) / 2 +
					this.padding * 8 +
					"px";

				this.element.appendChild(tile.element);

				// Add penguins to the board
				for (let penguin of this.penguins) {
					if (penguin.x == i && penguin.y == j) {
						tile.addPenguin(penguin);
					}
				}
			}
		}

		this.boardWidth = (Tile.tileWidth / 4) * (this.width * 3 + 1);
		this.boardHeight = this.height * Tile.tileHeight + Tile.tileHeight / 2;
		this.element.style.width = this.boardWidth + this.padding * 16 + "px";
		this.element.style.height = this.boardHeight + this.padding * 16 + "px";
	}

	setPatterns(patterns) {
		this.patterns = patterns;

		for (let pattern of this.patterns) {
			pattern.setBoard(this);
		}
	}

	drawPattern(pattern, iceberg) {
		//Positie
		let { startX, startY } = pattern;

		//board properties
		let { boardWidth, boardHeight } = this;

		//Positie
		let boardRect = this.element.getBoundingClientRect();
		let boardX = boardRect.left;
		let boardY = boardRect.top;

		//In bounds
		if (
			startX < boardX ||
			startY < boardY ||
			startX > boardX + boardWidth ||
			startY > boardY + boardHeight
		)
			return false;

		//Zoek dichtsbijzijnde tile
		let tile = null;
		for (let _tile of this.tiles.flat()) {
			let { element } = _tile;
			let tileRect = element.getBoundingClientRect();
			let tileX = tileRect.left;
			let tileY = tileRect.top;

			if (
				startX > tileX &&
				startX < tileX + Tile.tileWidth &&
				startY > tileY &&
				startY < tileY + Tile.tileHeight
			) {
				tile = _tile;
				break;
			}
		}

		//Geen tile of als er een penguin staat
		if (!tile || tile.penguin) return false;

		console.log(tile);

		//Kan het patroon hier geplaatst worden?
		for (let point of pattern.points) {
			let x = point[0];
			let y = point[1];
			console.log(x, y);
			let _tile = this.tiles[tile.x + x][tile.y + y];

			if (!_tile || _tile.penguin) {
				console.log("Kan niet", _tile);
				return false;
			}

		}

		//Plaats het patroon
		console.log("Plaats patroon");
	}
}

export default Board;
