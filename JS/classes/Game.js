import  Board  from "./Board.js";

import patterns from "../data/patterns.js";

const game = document.querySelector(".game");
class Game {
	

	constructor(levelId, level) {
		const levelContainer = document.createElement("section");
		levelContainer.classList.add("level");
		game.appendChild(levelContainer);
	
		const levelHeader = document.createElement("h3");
		levelHeader.innerText = `Level: ${levelId}`;
		levelHeader.classList.add("level-header");
		levelContainer.appendChild(levelHeader);

		this.level = level;
		this.board = new Board(levelContainer, level.Penguins);
		this.board.setPatterns(patterns);
	}

	start() {
		this.board.draw();
	}
	
	onComplete(callback) {
		this.board.onComplete(callback);
	}
}

export default Game;
