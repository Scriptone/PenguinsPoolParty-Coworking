import Penguin from "../classes/Penguin.js";
const levels = {
	"1": {
		Penguins: [
			new Penguin(1, 1),
			new Penguin(2, 0),
			new Penguin(3, 1),
			new Penguin(2, 3)
		],

	},

	"2": {
		Penguins: [
			new Penguin(2, 1),
			new Penguin(2, 2),
			new Penguin(3, 3),
			new Penguin(4, 1)
		],
	}
};

export default levels;
