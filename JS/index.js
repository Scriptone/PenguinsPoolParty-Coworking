import Game from "./classes/Game.js";
("use strict");

(function () {
	const spel = new Game();
	let level = 2;
	spel.init(level);
	spel.start();
})();
