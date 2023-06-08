import Board from "./Board.js";

import patterns from "../data/patterns.js";

const game = document.querySelector(".game");
class Game {
	constructor(difficulty, levelId, level) {
		const levelContainer = document.createElement("div");
		levelContainer.classList.add("level");
		game.appendChild(levelContainer)

		this.level = level;
		this.board = new Board({
			parent: levelContainer,
			penguins: level.Penguins,
			tileWidth: 60,
			patternPoints: patterns,
		});
		this.container = levelContainer;
	}

	start() {
		this.board.draw();
	}

	cleanUp() {
		this.board.cleanUp();
		this.board = null;
		this.level = null;
		this.container.remove();
		this.container = null;
	}
	onComplete(callback) {
		this.board.onComplete(callback);
	}
}

export default Game;
