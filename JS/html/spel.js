import Game from "../classes/Game.js";
import levels from "../data/levels.js";
("use strict");

(function () {
	const maxwidth = 1000;

	const victory = document.querySelector(".victory");
	victory?.addEventListener("click", () =>
		victory.classList.remove("active")
	);

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

	const onWindowResize = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const game = document.querySelector(".game");
		if (!game) return;

		//Above maxwidth, scale = 1, at 320px scale = .35
		const scale = Math.min(1, Math.max(0.35, width / maxwidth));
		game.style.transform = `scale(${scale}) `;

		//TODO But also move it up according to the scale
	};

	let spel = null;
	let nextLevel = document.querySelector(".next-level");
	let previousLevel = document.querySelector(".previous-level");
	let restart = document.querySelector(".redo-level");
	let levels_completed = sessionStorage.getItem("levels_completed");
	const onComplete = async () => {
		const currentTime = Date.now();
		const time = Math.floor((currentTime - spel.startTime) / 10) / 100;
		console.log("Level complete");
		victory?.classList.add("active");
		const h2 = victory?.querySelector("h2");
		if (h2) h2.innerHTML = `Level ${level} completed in ${time} seconds!`;
		setTimeout(() => {
			victory?.classList.remove("active");
		}, 3000);

		//Send data to server
		try {
			if (level <= levels_completed) return;
			const data = {
				level,
				time,
				action: "log_level",
			};
			const response = await fetch("../php/process.php", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();
			console.log(result);
			sessionStorage.setItem(
				"levels_completed",
				result.levels_completed ||
					sessionStorage.getItem("levels_completed")
			);
			nextLevel.classList.remove("locked");
		} catch (error) {
			console.log(error);
		}
	};

	const restartGame = () => {
		//location.reload();
		spel?.cleanUp();

		//Create new game with new levelData
		spel = new Game(difficulty, level, levelData);
		spel.start();
		spel.startTime = Date.now();

		if (level === totalLevels || level === levels_completed + 1) {
			nextLevel.classList.add("locked");
		} else {
			nextLevel.classList.remove("locked");
		}

		if (level === 1) {
			previousLevel.classList.add("locked");
		} else {
			previousLevel.classList.remove("locked");
		}

		spel.onComplete(onComplete);
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

	window.addEventListener("resize", onWindowResize);
	onWindowResize();
})();
