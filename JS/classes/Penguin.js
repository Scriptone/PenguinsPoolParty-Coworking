class Penguin {
	constructor (x, y) {
		this.tile = null;
		this.x = x;
		this.y = y;
	}

	setTile(tile) {
		this.tile = tile;
		this.tile.element.classList.add("penguin");
	}

	cleanUp() {
		this.tile = null;
	}
}

export default Penguin;