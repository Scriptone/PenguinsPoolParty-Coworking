import Tile from "./Tile.js";
const main = document.querySelector("main");
class Board {
	constructor(parent, penguins) {
		this.penguins = penguins;
		this.element = document.createElement("div");
		this.element.classList.add("board");
		parent.appendChild(this.element);
		this.tiles = [];
		this.height = 4;
		this.width = 5;
		this.padding = 2;
	}

	draw() {
		
		for (let y = 0; y < this.height; y++) {
			this.tiles[y] = [];
			for (let x = 0; x < this.width; x++) {
				let tile = new Tile(x, y);
				this.tiles[y][x] = tile;
				tile.draw();

				tile.element.style.left =
					x * Tile.tileWidth * 0.75 + this.padding * 8 + "px";

				tile.element.style.top =
					y * Tile.tileHeight +
					((x % 2 == 0 ? 1 : 0) * Tile.tileHeight) / 2 +
					this.padding * 8 +
					"px";

				this.element.appendChild(tile.element);

				// Add penguins to the board
				for (let penguin of this.penguins) {
					if (penguin.x == x && penguin.y == y) {
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

	findAvailablePattern(pattern, iceberg) {
		//Positie
		let { startX, startY } = pattern;

		//Zoek dichtsbijzijnde tile
		let tile = null;
		let distance = null;
		let closestTile = null;
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

			//Afstand berekenen
			let tileCenterX = tileX + Tile.tileWidth / 2;
			let tileCenterY = tileY + Tile.tileHeight / 2;

			let _distance = Math.hypot(
				tileCenterX - startX,
				tileCenterY - startY
			);

			if (
				(_distance < distance || closestTile == null) &&
				_distance < Tile.tileWidth
			) {
				distance = _distance;
				closestTile = _tile;
			}
		}

		tile = tile || closestTile;

		if (!tile) {
			return;
		}
		let icebergPoint = iceberg.point;
		let startPointX = tile.x - icebergPoint[0]; //Icebergpoint aftrekken van tilepoint om de startpositie te krijgen
		let startPointY = tile.y - icebergPoint[1];

		//StartPointY corrigeren voor de oneven kolommen
		startPointY =
			startPointY +
			(Math.abs(startPointX % 2) == 1 &&
			Math.abs(icebergPoint[0] % 2) == 1
				? 1
				: 0);

		//Kan het patroon hier geplaatst worden?
		for (let iceberg of pattern.icebergs) {
			let point = iceberg.point;
			let x = point[0] + startPointX;
			let y = point[1] + startPointY;

			/*
	De patronen  zijn gebasseerd op de kolommen die lager staan, dus als 
	je een patroon dropt op een kolom die hoger staat, dan moet je de y met 1 verlagen
	*/
			y = y + (startPointX % 2 == 1 && x % 2 == 0 ? -1 : 0);

			let _tile = this.tiles[y]?.[x];

			// Indien de tile niet bestaat, of er staat al een pinguin of een ijsberg op, dan kan het patroon niet geplaatst worden
			if (!_tile || _tile.penguin || _tile.iceberg) {
				return false;
			}
		}

		return [tile, startPointX, startPointY];
	}

	selectPattern(pattern, iceberg) {
		//Plaats het patroon
		let [tile, startPointX, startPointY] =
			this.findAvailablePattern(pattern, iceberg) || [];

		//Verwijder de vorige selectie
		for (let tile of this.tiles.flat()) {
			tile.element.classList.remove("selected");
		}

		if (!tile) {
			return false;
		}
		//Selecteer de nieuwe tiles
		for (let iceberg of pattern.icebergs) {
			let point = iceberg.point;
			let x = point[0] + startPointX;
			let y = point[1] + startPointY;
			y = y + (startPointX % 2 == 1 && x % 2 == 0 ? -1 : 0);

			let _tile = this.tiles[y][x];
			_tile.element.classList.add("selected");
		}

		return true; //Patroon geplaatst
	}
	drawPattern(pattern, iceberg) {
		//Plaats het patroon
		let [tile, startPointX, startPointY] =
			this.findAvailablePattern(pattern, iceberg) || [];

		if (!tile) {
			return false;
		}

		for (let iceberg of pattern.icebergs) {
			let point = iceberg.point;
			let x = point[0] + startPointX;
			let y = point[1] + startPointY;
			y = y + (startPointX % 2 == 1 && x % 2 == 0 ? -1 : 0);

			let _tile = this.tiles[y][x];
			_tile.addIceberg(iceberg);
		}

		return true; //Patroon geplaatst
	}
}

export default Board;
