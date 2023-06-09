import Game from "../classes/Game.js";
import levels from "../data/levels.js";
import Helper from "../classes/Helper.js";
import { showVictoryDialog } from "../html/victoryScreen.js";
("use strict");

(function () {
	const maxwidth = 1000;

	const victory = document.querySelector(".victory");
	victory?.addEventListener("click", () =>
		victory.classList.remove("active")
	);

	let totalLevels = 0;
	let level = Number(sessionStorage.getItem("level")) || 1;
	let levels_completed = sessionStorage.getItem("levels_completed") || 0;
	for (let difficulty in levels) {
		totalLevels += Object.keys(levels[difficulty]).length;
	}

	const onWindowResize = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const game = document.querySelector(".game");
		if (!game) return;

		//Above maxwidth, scale = 1, at 320px scale = .35
		const scale = Math.min(1, Math.max(0.35, width / maxwidth));
		//game.style.transform = `scale(${scale}) `;

		//TODO But also move it up according to the scale
	};

	let spel = null;

	let nextLevel = document.querySelector(".next-level");
	let previousLevel = document.querySelector(".previous-level");
	let restart = document.querySelector(".redo-level");

	const onComplete = async () => {
		console.log("Level complete");

		const currentTime = Date.now();
		const time = Math.floor((currentTime - spel.startTime) / 10) / 100;

		showVictoryDialog(time);

		victory?.classList.add("active");
		const h2 = victory?.querySelector("h2");
		if (h2) h2.innerHTML = `Level ${level} completed in ${time} seconds!`;

		setTimeout(() => {
			victory?.classList.remove("active");
		}, 3000);

		//Send data to server
		try {
			let username = sessionStorage.getItem("username") || "Guest";
			Helper.sendWebhook(
				`User ${username} completed level ${level} in ${time} seconds!`
			);
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

			sessionStorage.setItem(
				"levels_completed",
				result.levels_completed ||
					sessionStorage.getItem("levels_completed")
			);
			levels_completed = sessionStorage.getItem("levels_completed");

			nextLevel.classList.remove("locked");
		} catch (error) {
			console.log(error);
		}
	};

	const restartGame = () => {
		levels_completed =
			Number(sessionStorage.getItem("levels_completed")) || 0;

		//Just to be sure
		level = Math.min(Math.max(1, level), levels_completed + 1, totalLevels);
		sessionStorage.setItem("level", level);
		//location.reload();
		spel?.cleanUp();

		//Create new game with new levelData
		let difficulty = null;
		for (let _difficulty in levels) {
			if (levels[_difficulty][level]) {
				difficulty = _difficulty;
				break;
			}
		}

		const levelData = levels[difficulty][level];
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
		restartGame();
	});

	previousLevel.addEventListener("click", function () {
		level--;
		restartGame();
	});

	restart.addEventListener("click", function () {
		restartGame();
	});

	window.addEventListener("resize", onWindowResize);
	onWindowResize();
})();
