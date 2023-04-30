import Game from "../classes/Game.js";
import levels from "../data/levels.js";
("use strict");

(function () {
	let totalLevels = 0;
	for (let difficulty in levels) {
		totalLevels += Object.keys(levels[difficulty]).length;
	}

	let { difficulty, level } = JSON.parse(sessionStorage.getItem("data"));

	let levelData = levels[difficulty]?.[level] || levels.Starters[1];

	const setData = (level) => {
		let difficulty = null;
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

	let spel = new Game(level, levelData);
	spel.start();

	const resetGame = () => {
		//location.reload();
		spel.cleanUp();
		console.log("Game cleaned up");
		
		//Create new game with new levelData
		spel = new Game(level, levelData);
		spel.start();
		
	};
	let nextLevel = document.querySelector(".next-level");
	nextLevel.addEventListener("click", function () {
		level++;
		setData(level);
		resetGame();
	});
	let previousLevel = document.querySelector(".previous-level");
	previousLevel.addEventListener("click", function () {
		level--;
		setData(level);
		resetGame();
	});

	let restart = document.querySelector(".redo-level");
	restart.addEventListener("click", function () {
		resetGame();
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
