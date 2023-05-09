("use strict");

export const showVictoryDialog = function(time) {
	const wonDialog = document.querySelector(".won-dialog");
	const timePlayed = document.querySelector(".game-time");

	wonDialog.showModal();
	timePlayed.innerHTML = "You completed the level in:\n" + time + " seconds";

	wonDialog
		.querySelector(".close-btn")
		.addEventListener("click", () => wonDialog.close());
}