import Game from "../classes/Game.js";
import levels from "../data/levels.js";
("use strict");

(function () {
	let totalLevels = 0;
	for (let difficulty in levels) {
		totalLevels += Object.keys(levels[difficulty]).length;
	}

	let { difficulty, level } = JSON.parse(sessionStorage.getItem("data"));

	const setData = (difficulty, level) => {
		sessionStorage.setItem(
			"data",
			JSON.stringify({ difficulty, level }, (key, value) => {
				if (!isNaN(value)) value = Number(value);
				return value;
			})
		);
	};
	console.log(difficulty, level);
	let levelData = levels[difficulty]?.[level];
	if (!levelData) {
		level = 1;
		(difficulty = "Starters"), (levelData = levels[difficulty]?.[level]);
	}

	const spel = new Game(level, levelData);
	spel.start();

	let nextLevel = document.querySelector(".next-level");
	nextLevel.addEventListener("click", function () {
		level++;
		setData(difficulty, level);
		location.reload();
	});

	let previousLevel = document.querySelector(".previous-level");
	previousLevel.addEventListener("click", function () {
		level--;
		setData(difficulty, level);
		location.reload();
	});

	let restart = document.querySelector(".redo-level");
	restart.addEventListener("click", function () {
		location.reload();
	});

	console.log(level, totalLevels);
	if (level === totalLevels) {
		nextLevel.classList.add("locked");
	}

	if (level === 1) {
		console.log("Disabled");
		previousLevel.classList.add("locked");
	}

	spel.onComplete(() => {
		console.log("Level complete");
	});
})();
