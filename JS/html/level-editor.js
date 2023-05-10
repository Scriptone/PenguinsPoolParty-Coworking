import Board from "../classes/Board.js";
import Tile from "../classes/Tile.js";
import Penguin from "../classes/Penguin.js";
// try {
// 	const response = await fetch("../../php/process.php", {
// 		method: "POST",
// 		body: JSON.stringify({
// 			action: "add_community_level",
// 			level: sample,
// 		}),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});

// 	let result = await response.text();
// 	console.log(result);
// } catch (e) {
// 	console.log(e);
// }

const game = document.querySelector(".game");
const levelContainer = document.createElement("section");
levelContainer.classList.add("level");
game.appendChild(levelContainer);

const patterns = [
	new Penguin(0, 0),
	new Penguin(1, 0),
	new Penguin(2, 0),
	new Penguin(3, 0),
]
const board = new Board({
	parent: levelContainer,
	penguins: [],
	tileWidth: 75,
	tileHeight: 66,
});
board.draw();
