import levels from "../JS/data/levels.js";
import Board from "../JS/classes/Board.js";

const levelParent = document.querySelector(".levels");
"use strict";
(function () {
	
	for (let level of Object.keys(levels)) {
		let penguins = levels[level].Penguins;

		let board = new Board(levelParent, penguins);
		board.draw();
	}
})();
