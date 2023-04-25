import levels from "../JS/data/levels.js";
import Board from "../JS/classes/Board.js";

const levelParent = document.querySelector(".levels");
("use strict");
(function () {
	for (let difficulty of Object.keys(levels)) {
		let difficultyContainer = document.createElement("section");
		difficultyContainer.classList.add("difficulty");
		difficultyContainer.classList.add(difficulty.toLowerCase());
		levelParent.appendChild(difficultyContainer);

		let heading = document.createElement("h2");
		heading.innerText = difficulty;
		difficultyContainer.appendChild(heading);

		let levelsContainer = document.createElement("div");
		levelsContainer.classList.add("levels-container");
		difficultyContainer.appendChild(levelsContainer);


		for (let level of Object.keys(levels[difficulty])) {
			
			let levelContainer = document.createElement("div");
			levelContainer.classList.add("level");

			let levelHeader = document.createElement("h3");
			levelHeader.innerText = `Level: ${level}`;
			levelHeader.classList.add("level-header");
			levelContainer.appendChild(levelHeader);

			levelsContainer.appendChild(levelContainer);
			level = levels[difficulty][level];
			let penguins = level.Penguins;

			let board = new Board(levelContainer, penguins);
			board.draw();
		}
	}
})();
