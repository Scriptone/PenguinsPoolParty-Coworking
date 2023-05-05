import levels from "../data/levels.js";
import Board from "../classes/Board.js";

("use strict");
(function () {
	const levelParent = document.querySelector(".levels");
	const previousButton = document.querySelector(".btn-prev");
	const nextButton = document.querySelector(".btn-next");

	const onLevelClicked = (level, event) => {
		sessionStorage.setItem("level", level);
		window.location.href = `../spel`;
	};

	const lastUnlockedLevel =
		Number(sessionStorage.getItem("levels_completed") || 0) + 1;

	for (let difficulty of Object.keys(levels)) {
		let difficultyContainer = document.createElement("section");
		difficultyContainer.classList.add("difficulty");
		difficultyContainer.classList.add(difficulty.toLowerCase());

		if (difficulty === "Starters")
			difficultyContainer.classList.add("active");

		levelParent.appendChild(difficultyContainer);

		let heading = document.createElement("h2");
		heading.innerText = difficulty;
		difficultyContainer.appendChild(heading);

		let levelsContainer = document.createElement("div");
		levelsContainer.classList.add("levels-container");
		difficultyContainer.appendChild(levelsContainer);

		for (let level of Object.keys(levels[difficulty])) {
			level = Number(level);

			let levelContainer = document.createElement("button");
			levelContainer.classList.add(
				"level",
				level <= lastUnlockedLevel ? "unlocked" : "locked"
			);

			let levelHeader = document.createElement("h3");
			levelHeader.innerText = `Level: ${level}`;
			levelHeader.classList.add("level-header");

			levelContainer.appendChild(levelHeader);
			levelsContainer.appendChild(levelContainer);

			let levelObject = levels[difficulty][level];
			let penguins = levelObject.Penguins;

			let board = new Board({
				parent: levelContainer,
				penguins: penguins,
				tileWidth: 20,
				tileHeight: 17.6,
			});
			board.draw();

			levelContainer.addEventListener(
				"click",
				onLevelClicked.bind(this, level)
			);
		}
	}

	const onPreviousClicked = () => {
		let currentDifficulty = document.querySelector(".active");
		let previousDifficulty = currentDifficulty.previousElementSibling;
		if (previousDifficulty === null) return;
		currentDifficulty.classList.remove("active");
		previousDifficulty.classList.add("active");

		if (!previousDifficulty.previousElementSibling)
			previousButton.classList.add("locked");

		nextButton.classList.remove("locked");
	};

	const onNextClicked = () => {
		let currentDifficulty = document.querySelector(".active");
		let nextDifficulty = currentDifficulty.nextElementSibling;
		if (nextDifficulty === null) return;
		currentDifficulty.classList.remove("active");
		nextDifficulty.classList.add("active");

		if (!nextDifficulty.nextElementSibling)
			nextButton.classList.add("locked");

		previousButton.classList.remove("locked");
	};

	previousButton.addEventListener("click", onPreviousClicked);
	nextButton.addEventListener("click", onNextClicked);

	previousButton.classList.add("locked");
})();
