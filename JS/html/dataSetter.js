"use strict";
(function () {
	let sessionData = sessionStorage.getItem("data");
	if (!sessionData) {
		sessionData = {
			difficulty: "Starters",
			level: 1,
		};
	} else {
		sessionData = JSON.parse(sessionData);
	}

	// Some magic to get the user data from the server
	// and update the sessionData object
	// ...
	const lastUnlockedLevel = 5; // This is the last level the user has unlocked
	sessionStorage.setItem("lastUnlockedLevel", lastUnlockedLevel);

	// Update the sessionData object
	sessionStorage.setItem(
		"data",
		JSON.stringify(sessionData, (key, value) => {
			if (!isNaN(value)) value = Number(value);
			return value;
		})
	);
})();
