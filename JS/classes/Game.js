import levels from "../data/levels.js";
import  Board  from "./Board.js";

import patterns from "../data/patterns.js";

const game = document.querySelector(".game");
class Game {
	

	constructor(difficulty, level) {
		const levelContainer = document.createElement("section");
		levelContainer.classList.add("level");
		game.appendChild(levelContainer);
	
		const levelHeader = document.createElement("h3");
		levelHeader.innerText = `Level: ${level}`;
		levelHeader.classList.add("level-header");
		levelContainer.appendChild(levelHeader);

		this.level = level;
		this.board = new Board(levelContainer, levels[difficulty][level].Penguins);

		this.patterns = patterns;
		this.board.setPatterns(this.patterns);
	}

	start() {
		this.board.draw();
	}
}

export default Game;
