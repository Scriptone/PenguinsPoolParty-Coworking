import Penguin from "../classes/Penguin.js";
const levels = {

	1: {
		Penguins: [
			new Penguin(1, 1),
			new Penguin(2, 0),
			new Penguin(3, 1),
			new Penguin(2, 3),
		],
	},

	2: {
		Penguins: [
			new Penguin(2, 1),
			new Penguin(2, 2),
			new Penguin(3, 3),
			new Penguin(4, 1),
		],
	},

	3: {
		Penguins: [
			new Penguin(1, 1),
			new Penguin(3, 1),
			new Penguin(3, 2),
			new Penguin(4, 2),
		],
	},

	4: {
		Penguins: [
			new Penguin(1, 1),
			new Penguin(2, 0),
			new Penguin(3, 1),
			new Penguin(4, 2),
		],
	},

	5: {
		Penguins: [
			new Penguin(1, 0),
			new Penguin(1, 1),
			new Penguin(0, 3),
			new Penguin(4, 1),
		],
	},

	6: {
		Penguins: [
			new Penguin(3, 0),
			new Penguin(2, 1),
			new Penguin(3, 2),
			new Penguin(0, 3),
		],
	},

	7: {
		Penguins: [
			new Penguin(0, 0),
			new Penguin(1, 1),
			new Penguin(3, 3),
			new Penguin(4, 3),
		],
	},

	8: {
		Penguins: [
			new Penguin(4, 0),
			new Penguin(1, 2),
			new Penguin(2, 2),
			new Penguin(4, 3),
		],
	},
};

export default levels;
