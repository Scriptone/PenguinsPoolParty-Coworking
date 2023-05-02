"use strict";
(function () {
	const welcome_screen = document.querySelector(".welcome-screen");
	let sessionData = sessionStorage.getItem("data");
	if (!sessionData) {
		sessionData = {
			difficulty: "Starters",
			level: 1,
		};
	} else {
		sessionData = JSON.parse(sessionData);
	}

	// Update the sessionData object
	sessionStorage.setItem(
		"data",
		JSON.stringify(sessionData, (key, value) => {
			if (!isNaN(value)) value = Number(value);
			return value;
		})
	);

	sessionStorage.setItem("levels_completed", sessionStorage.getItem("levels_completed") || 0);

	// Update the welcome screen
	let username = sessionStorage.getItem("username") || "Guest";
	let h2 = welcome_screen?.querySelector("h2");
	if (!h2) return;

	h2.innerHTML = `Welcome, ${username}!`;
})();
