import Game from "./classes/Game.js";
("use strict");

(function () {
	const spel = new Game();
	let level = 1;
	spel.init(level);
	spel.start();
})();
