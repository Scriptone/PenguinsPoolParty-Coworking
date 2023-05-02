import Board from "./Board.js";

import patterns from "../data/patterns.js";

const game = document.querySelector(".game");
class Game {
	constructor(difficulty, levelId, level) {
		const levelContainer = document.createElement("section");
		levelContainer.classList.add("level");
		game.appendChild(levelContainer);

		const levelHeader = document.createElement("h3");
		levelHeader.innerText = `Level: ${levelId}`;
		levelHeader.classList.add("level-header");

		const difficultySpan = document.createElement("span");
		difficultySpan.innerText = `Difficulty: ${difficulty}`;
		difficultySpan.classList.add(
			difficulty.toLowerCase(),
			"difficulty-span"
		);

		levelHeader.prepend(difficultySpan);
		levelContainer.appendChild(levelHeader);

		this.level = level;
		this.board = new Board({
			parent: levelContainer,
			penguins: level.Penguins,
			tileWidth: 75,
			tileHeight: 66,
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
