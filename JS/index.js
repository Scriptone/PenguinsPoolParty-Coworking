import Game from "./classes/Game.js";
("use strict");

(function () {
	const spel = new Game();
	let level = 1;
	let difficulty = "Starters";
	spel.init(difficulty, level);
	spel.start();

	
})();
