import Game from "../classes/Game.js";
import levels from "../data/levels.js";
("use strict");

(function () {
	const victory = document.querySelector(".victory");

	let totalLevels = 0;
	for (let difficulty in levels) {
		totalLevels += Object.keys(levels[difficulty]).length;
	}

	let { difficulty, level } = JSON.parse(sessionStorage.getItem("data"));

	let levelData = levels[difficulty]?.[level] || levels.Starters[1];

	const setData = (level) => {
		difficulty = null;
		for (let diff in levels) {
			if (levels[diff][level]) {
				difficulty = diff;
				break;
			}
		}
		sessionStorage.setItem(
			"data",
			JSON.stringify({ difficulty, level }, (key, value) => {
				if (!isNaN(value)) value = Number(value);
				return value;
			})
		);
		levelData = levels[difficulty]?.[level];
	};

	let spel = null;
	let nextLevel = document.querySelector(".next-level");
	let previousLevel = document.querySelector(".previous-level");
	let restart = document.querySelector(".redo-level");
	const restartGame = () => {
		//location.reload();
		spel?.cleanUp();
		console.log("Game cleaned up");

		//Create new game with new levelData
		spel = new Game(difficulty, level, levelData);
		spel.start();

		if (level === totalLevels) {
			nextLevel.classList.add("locked");
		} else {
			nextLevel.classList.remove("locked");
		}

		if (level === 1) {
			console.log("Disabled");
			previousLevel.classList.add("locked");
		} else {
			previousLevel.classList.remove("locked");
		}
	};

	restartGame();

	nextLevel.addEventListener("click", function () {
		level++;
		setData(level);
		restartGame();
	});

	previousLevel.addEventListener("click", function () {
		level--;
		setData(level);
		restartGame();
	});

	restart.addEventListener("click", function () {
		restartGame();
	});

	spel.onComplete(() => {
		console.log("Level complete");
		victory.classList.add("active");
		setTimeout(() => {
			victory.classList.remove("active");
		}, 3000);
	});

	victory.addEventListener("click", () => victory.classList.remove("active"));
	
})();
