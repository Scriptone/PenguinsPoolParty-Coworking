import Tile from "./Tile.js";
import Pattern from "./Pattern.js";
const main = document.querySelector("main");

function calculateScale(innerWidth) {
	return -1.68  + .36 * Math.log(innerWidth);
}

class Board {
	static padding = 1;
	constructor({ parent, penguins, tileWidth = 75, patternPoints }) {
		const innerWidth = window.innerWidth;
		this.penguins = penguins;
		this.element = document.createElement("div");
		this.element.classList.add("board");
		parent.append(this.element);
		this.tiles = [];
		this.height = 4;
		this.width = 5;

		let scale = calculateScale(innerWidth);
		console.log(scale);

		this.tileWidth = tileWidth * scale;
		this.tileHeight = tileWidth * (66 / 75) * scale;

		this.patterns = [];
		if (!patternPoints) {
			return;
		}
		for (let patternPoint of patternPoints) {
			let pattern = new Pattern(patternPoint, this);
			this.patterns.push(pattern);
		}
		this.patternsRemaining = this.patterns.length;
	}

	draw() {
		for (let y = 0; y < this.height; y++) {
			this.tiles[y] = [];
			for (let x = 0; x < this.width; x++) {
				let tile = new Tile(x, y, this.tileWidth, this.tileHeight);
				this.tiles[y][x] = tile;
				tile.draw();

				tile.element.style.left = `${
					x * this.tileWidth * 0.75 + Board.padding * 8
				}px`;

				tile.element.style.top = `${
					y * this.tileHeight +
					((x % 2 === 0 ? 1 : 0) * this.tileHeight) / 2 +
					Board.padding * 8
				}px`;
				this.element.appendChild(tile.element);

				// Add penguins to the board
				for (let penguin of this.penguins) {
					if (penguin.x === x && penguin.y === y) {
						tile.addPenguin(penguin);
					}
				}
			}
		}

		this.boardWidth = (this.tileWidth / 4) * (this.width * 3 + 1);
		this.boardHeight = this.height * this.tileHeight + this.tileHeight / 2;
		this.element.style.width = `${this.boardWidth + Board.padding * 16}px`;
		this.element.style.height = `${
			this.boardHeight + Board.padding * 16
		}px`;
	}

	findAvailablePattern(pattern) {
		//Positie
		let iceberg = pattern.icebergs[0];
		let boundingIceberg = iceberg.element.getBoundingClientRect();

		let startX = boundingIceberg.x + boundingIceberg.width / 2;
		let startY = boundingIceberg.y + boundingIceberg.height / 2;

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
				startX < tileX + this.tileWidth &&
				startY > tileY &&
				startY < tileY + this.tileHeight
			) {
				tile = _tile;
				break;
			}

			//Afstand berekenen
			let tileCenterX = tileX + this.tileWidth / 2;
			let tileCenterY = tileY + this.tileHeight / 2;

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

	selectPattern(pattern) {
		//Plaats het patroon
		let [tile, startPointX, startPointY] =
			this.findAvailablePattern(pattern) || [];

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
	drawPattern(pattern) {
		//Plaats het patroon
		let [tile, startPointX, startPointY] =
			this.findAvailablePattern(pattern) || [];

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

		this.patternsRemaining--;
		if (this.patternsRemaining === 0) {
			this.onCompleteCallback();
		}
		return true; //Patroon geplaatst
	}

	cleanUp() {
		for (let tile of this.tiles.flat()) {
			tile.cleanUp();
		}
		this.tiles = [];
		this.penguins = [];
		this.element.remove();
		this.element = null;

		for (let pattern of this.patterns) {
			pattern.cleanUp();
		}
		this.patterns = null;
		this.onCompleteCallback = null;
	}

	// Check if the game is over
	onComplete(callback) {
		this.onCompleteCallback = callback;
	}
}

export default Board;
