import levels from "../data/levels.js";
import Board from "./Board.js";

import patterns from "../data/patterns.js";
class Game {
	constructor() {}

	init(level) {
		this.level = level;
		this.penguins = levels[level].Penguins;
		this.board = new Board(this.penguins);
		this.patterns = patterns;
		this.board.setPatterns(this.patterns);
	}

	start() {
		this.board.draw();
		
		let levelTag = document.querySelector(".level");
		levelTag.innerHTML = `Level: ${this.level}`;
	}
}

export default Game;
