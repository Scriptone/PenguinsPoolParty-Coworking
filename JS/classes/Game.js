import levels from "../data/levels.js";
import Board from "./Board.js";

import patterns from "../data/patterns.js";

const game = document.querySelector(".game");
class Game {
	constructor() {}

	init(difficulty, level) {
		this.level = level;
		this.board = new Board(game, levels[difficulty][level].Penguins);
		
		this.patterns = patterns;
		this.board.setPatterns(this.patterns);
	}

	start() {
		this.board.draw();
	}
}

export default Game;
