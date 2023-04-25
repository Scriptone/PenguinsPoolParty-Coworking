import Game from "./classes/Game.js";
("use strict");

(function () {
	let level = sessionStorage.getItem("level") || 1;
	let difficulty = sessionStorage.getItem("difficulty") || "Starters";
	const spel = new Game();
	spel.init(difficulty, level);
	spel.start();

	
})();
