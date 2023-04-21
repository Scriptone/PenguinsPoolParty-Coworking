import levels from '../data/levels.js';
import Board from './Board.js';
class Game {
	constructor() {}

	init(level) {
		this.penguins = levels[level].Penguins;
		this.board = new Board(this.penguins);
		this.board.draw();

		let levelTag = document.querySelector(".level");
		levelTag.innerHTML = `Level: ${level}`;

	}

	drag(event) {
		//console.log(event);
		// let drag = document.querySelector(".drag");
		
		// drag.style.left = event.clientX - 25 + "px";
		// drag.style.top = event.clientY - 25 + "px";
	}
	start() {
		//While key q is not pressed, print true in console
		
		document.addEventListener("mousemove", this.drag);
		// document.addEventListener("keydown", (event) => {
		// 	if (event.key == "q") {
		// 		console.log("stop");
		// 		document.removeEventListener("mousemove", this.drag);

				
		// 	}
		// });

		
		
	}
}

export default Game;