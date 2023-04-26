import Game from "../classes/Game.js";
import levels from "../data/levels.js";
("use strict");

(function () {
	//levels is an object containing objects with the levels
	let totalLevels = 0;
	for (let difficulty in levels) {
		totalLevels += Object.keys(levels[difficulty]).length;
	}

	let level = sessionStorage.getItem("level") || 1;
	let difficulty = null;
	for (let diff in levels) {
		if (levels[diff][level]) {
			difficulty = diff;
		}
	}

	let levelData = levels[difficulty]?.[level];
	if (!levelData) {
		level = 1;
		difficulty = "Starters",
		levelData = levels[difficulty]?.[level];
	}
	const spel = new Game(difficulty, level);
	spel.start();
	let nextLevel = document.querySelector(".next-level");
	nextLevel.addEventListener("click", function () {
		level++;
		sessionStorage.setItem("level", level);
		location.reload();
	});

	let previousLevel = document.querySelector(".previous-level");
	previousLevel.addEventListener("click", function () {
		level--;
		sessionStorage.setItem("level", level);
		location.reload();
	});

	let restart = document.querySelector(".redo-level");
	restart.addEventListener("click", function () {
		sessionStorage.setItem("level", level);
		location.reload();
	});

	if (level == totalLevels) {
		nextLevel.style.filter = "grayscale(100%)";
		nextLevel.style.pointerEvents = "none";
	}

	if (level == 1) {
		previousLevel.style.filter = "grayscale(75%)";
		previousLevel.style.pointerEvents = "none";
	}


	spel.onComplete(() => {
		console.log("Level complete");
	});
})();
