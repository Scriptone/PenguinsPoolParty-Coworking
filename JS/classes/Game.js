import levels from '../data/levels.js';
import Board from './Board.js';
import Pattern from './Pattern.js';
class Game {
	constructor() {}

	init(level) {
		this.penguins = levels[level].Penguins;
		this.board = new Board(this.penguins);
		this.board.draw();

		let levelTag = document.querySelector(".level");
		levelTag.innerHTML = `Level: ${level}`;

		this.patterns = [];
		let patterns = document.querySelectorAll(".pattern");

		for (let pattern of patterns) {
			this.patterns.push(new Pattern(pattern));
			
		}

	}

	drag(event) {
		//console.log(event);
		// let drag = document.querySelector(".drag");
		
		// drag.style.left = event.clientX - 25 + "px";
		// drag.style.top = event.clientY - 25 + "px";
	}
	start() {
		
		document.addEventListener("mousemove", this.drag);

		
		
	}
}

export default Game;