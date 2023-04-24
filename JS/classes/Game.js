import levels from "../data/levels.js";
import Board from "./Board.js";

import patterns from "../data/patterns.js";
class Game {
	constructor() {}

	init(level) {
		this.level = level;
		this.board = new Board(levels[level].Penguins);
		this.patterns = patterns;
		this.board.setPatterns(this.patterns);
	}

	start() {
		this.board.draw();
		
	}
}

export default Game;
