import Penguin from "../classes/Penguin.js";
const levels = {
	Starters: {
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

		9: {
			Penguins: [
				new Penguin(0, 1),
				new Penguin(0, 3),
				new Penguin(2, 3),
				new Penguin(3, 1),
			],
		},

		10: {
			Penguins: [
				new Penguin(0, 0),
				new Penguin(0, 2),
				new Penguin(2, 3),
				new Penguin(4, 3),
			],
		},

		11: {
			Penguins: [new Penguin(1, 1), new Penguin(1, 2), new Penguin(1, 3)],
		},

		12: {
			Penguins: [
				new Penguin(0, 0),
				new Penguin(1, 0),
				new Penguin(3, 0),
				new Penguin(4, 0),
			],
		},

		13: {
			Penguins: [new Penguin(2, 0), new Penguin(4, 1), new Penguin(4, 2)],
		},

		14: {
			Penguins: [
				new Penguin(0, 3),
				new Penguin(1, 3),
				new Penguin(3, 3),
				new Penguin(4, 3),
			],
		},

		15: {
			Penguins: [new Penguin(1, 0), new Penguin(2, 0), new Penguin(4, 2)],
		},

		16: {
			Penguins: [
				new Penguin(1, 2),
				new Penguin(2, 3),
				new Penguin(3, 2),
				new Penguin(4, 3),
			],
		},
	},

	Junior: {
		17: {
			Penguins: [new Penguin(3, 0), new Penguin(3, 1), new Penguin(4, 3)],
		},
		18: {
			Penguins: [
				new Penguin(0, 0),
				new Penguin(1, 2),
				new Penguin(2, 3),
				new Penguin(3, 1),
			],
		},
	},

	Expert: {
		33: {
			Penguins: [],
		},
	},

	Master: {
		49: {
			Penguins: [],
		},
	},
};

export default levels;
