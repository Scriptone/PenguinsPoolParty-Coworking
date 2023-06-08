import levels from "../data/levels.js";
import Board from "../classes/Board.js";
import Penguin from "../classes/Penguin.js";

const levelParent = document.querySelector(".our .levels");

const onLevelClicked = (level, event) => {
	sessionStorage.setItem("level", level);
	window.location.href = `../spel`;
};

const lastUnlockedLevel =
	Number(sessionStorage.getItem("levels_completed") || 0) + 1;

const makeLevel = (level, difficulty) => {
	let levelContainer = document.createElement("button");
	levelContainer.classList.add(
		"level",
		level <= lastUnlockedLevel ? "unlocked" : "locked"
	);

	let levelHeader = document.createElement("h5");
	levelHeader.innerText = `Level: ${level}`;
	levelHeader.classList.add("level-header");

	levelContainer.appendChild(levelHeader);

	let levelObject = levels[difficulty][level];
	let penguins = levelObject.Penguins;

	let board = new Board({
		parent: levelContainer,
		penguins: penguins,
		tileWidth: 20,
		tileHeight: 17.6,
	});
	board.draw();

	levelContainer.addEventListener("click", onLevelClicked.bind(this, level));
	return levelContainer;
};

let currentDifficulty = null;
for (let difficulty of Object.keys(levels)) {
	let difficultyContainer = document.createElement("section");
	difficultyContainer.classList.add("difficulty");
	difficultyContainer.classList.add(difficulty.toLowerCase());

	if (difficulty === "Starters") {
		difficultyContainer.classList.add("active");
		currentDifficulty = difficultyContainer;
	}
	levelParent.appendChild(difficultyContainer);

	let heading = document.createElement("h4");
	heading.innerText = difficulty;
	difficultyContainer.appendChild(heading);

	let levelsContainer = document.createElement("div");
	levelsContainer.classList.add("levels-container");
	difficultyContainer.appendChild(levelsContainer);

	for (let level of Object.keys(levels[difficulty])) {
		level = Number(level);
		let levelContainer = makeLevel(level, difficulty);
		levelsContainer.appendChild(levelContainer);
	}
}

const nextButton = document.querySelector(".our .btn-next");
const previousButton = document.querySelector(".our .btn-previous");
const onPreviousClicked = () => {
	let previousDifficulty = currentDifficulty.previousElementSibling;
	if (!previousDifficulty) return;
	currentDifficulty.classList.remove("active");
	currentDifficulty = previousDifficulty;
	currentDifficulty.classList.add("active");

	if (!currentDifficulty.previousElementSibling)
		previousButton.classList.add("locked");

	nextButton.classList.remove("locked");
};

const onNextClicked = () => {
	let nextDifficulty = currentDifficulty.nextElementSibling;
	if (!nextDifficulty) return;
	currentDifficulty.classList.remove("active");
	currentDifficulty = nextDifficulty;
	currentDifficulty.classList.add("active");

	if (!currentDifficulty.nextElementSibling)
		nextButton.classList.add("locked");

	previousButton.classList.remove("locked");
};

nextButton.addEventListener("click", onNextClicked);
previousButton.addEventListener("click", onPreviousClicked);
previousButton.classList.add("locked");

// //Community levels section
// try {
// 	const response = await fetch("../../php/process.php", {
// 		method: "POST",
// 		body: JSON.stringify({
// 			action: "get_community_levels",
// 		}),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});

// 	const communityLevels = await response.json();
// 	console.log(communityLevels);
// 	//communityLevels = communityLevels if array, otherwise empty array
// 	const communityLevelsParent = document.querySelector(".community .levels-container");
// 	if (Array.isArray(communityLevels) && communityLevels.length > 0) {
// 		for (let level of communityLevels) {
// 			console.log(level);
// 			let levelContainer =  document.createElement("button");
// 			levelContainer.classList.add("level", "unlocked");

// 			let levelHeader = document.createElement("h5");
// 			levelHeader.innerText = `Level: ${level.id}`;
// 			levelHeader.classList.add("level-header");

// 			levelContainer.appendChild(levelHeader);

// 			let penguins = JSON.parse(level.penguins);
// 			//Every penguin is an array of 2 elements, x and y, convert to a Penguin object
// 			penguins = penguins.map(penguin => {
// 				return new Penguin(penguin[0], penguin[1]);
// 			});


// 			let board = new Board({
// 				parent: levelContainer,
// 				penguins: penguins,
// 				tileWidth: 20,
// 				tileHeight: 17.6,
// 			});
// 			board.draw();

// 			levelContainer.addEventListener("click", onLevelClicked.bind(this, level.id));
// 			communityLevelsParent.appendChild(levelContainer);

// 		}
// 	} else {
// 		console.log("No levels");
// 		const noLevels = document.createElement("h5");
// 		noLevels.classList.add("level-header");
// 		noLevels.innerText = "There are no community levels yet.";

// 		communityLevelsParent.appendChild(noLevels);
// 	}
// } catch (error) {
// 	console.log(error);
// }
