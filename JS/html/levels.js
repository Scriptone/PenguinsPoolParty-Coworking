import levels from "../data/levels.js";
import Board from "../classes/Board.js";


("use strict");
(function () {

	const levelParent = document.querySelector(".levels");
	const previousButton = document.querySelector(".btn-prev");
	const nextButton = document.querySelector(".btn-next");

	const onLevelClicked = (difficulty, level, event) => {
		sessionStorage.setItem("difficulty", difficulty);
		sessionStorage.setItem("level", level);
		window.location.href = `/spel`;
	};

	
	for (let difficulty of Object.keys(levels)) {
		let difficultyContainer = document.createElement("section");
		difficultyContainer.classList.add("difficulty");
		difficultyContainer.classList.add(difficulty.toLowerCase());
		if (difficulty === "Starters") {
			difficultyContainer.classList.add("active");
		}
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

	const onPreviousClicked = () => {
		let currentDifficulty = document.querySelector(".active");
		let previousDifficulty = currentDifficulty.previousElementSibling;
		if (previousDifficulty === null) return;
		currentDifficulty.classList.remove("active");
		previousDifficulty.classList.add("active");
	}

	const onNextClicked = () => {
		let currentDifficulty = document.querySelector(".active");
		let nextDifficulty = currentDifficulty.nextElementSibling;
		if (nextDifficulty === null) return;
		currentDifficulty.classList.remove("active");
		nextDifficulty.classList.add("active");
	}

	previousButton.addEventListener("click", onPreviousClicked);
	nextButton.addEventListener("click", onNextClicked);


})();
