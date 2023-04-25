import levels from "../data/levels.js";
import Board from "../classes/Board.js";

const levelParent = document.querySelector(".levels");
("use strict");
(function () {
	const onLevelClicked = (difficulty, level, event) => {
		sessionStorage.setItem("difficulty", difficulty);
		sessionStorage.setItem("level", level);
		window.location.href = `/spel`;
	};

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
			let levelContainer = document.createElement("button");
			levelContainer.classList.add("level");

			let levelHeader = document.createElement("h3");
			levelHeader.innerText = `Level: ${level}`;
			levelHeader.classList.add("level-header");
			levelContainer.appendChild(levelHeader);

			levelsContainer.appendChild(levelContainer);

			let levelObject = levels[difficulty][level];
			let penguins = levelObject.Penguins;

			let board = new Board(levelContainer, penguins);
			board.draw();

			levelContainer.addEventListener(
				"click",
				onLevelClicked.bind(this, difficulty, level)
			);
		}
	}
})();
