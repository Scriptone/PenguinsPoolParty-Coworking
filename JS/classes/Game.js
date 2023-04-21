import levels from '../data/levels.js';
import Board from './Board.js';
class Game {
	constructor() {}

	start(level) {
		this.penguins = levels[level].Penguins;
		this.board = new Board(this.penguins);
		this.board.draw();
	}
}

export default Game;