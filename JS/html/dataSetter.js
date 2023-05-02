"use strict";
(async function () {
	const welcome_screen = document.querySelector(".welcome-screen");
	const loginLink = document.querySelector(".nav-link[href='./login/']");
	const logoutLink = document.querySelector(".nav-link[href='./logout/']");

	logoutLink.parentElement.style.display = "none";
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

	// Update the welcome screen
	let username = sessionStorage.getItem("username") || "Guest";
	let h2 = welcome_screen?.querySelector("h2");
	if (h2) h2.innerHTML = `Welcome, ${username}!`;

	
	// Get user info
	if (username == "Guest") {
		try {
			const result = await fetch("../../php/process.php", {
				method: "POST",
				body: JSON.stringify({ action: "get_user" }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await result.json();
			console.log(data);
			if (data.username) {
				console.log("This was needed, we existed on the server but not in the session")
				sessionStorage.setItem("username", data.username);
				sessionStorage.setItem("levels_completed", data.levels_completed);
				username = data.username;
			}
		} catch (error) {
			console.log("Something failed", error);
		}
	}

	loginLink.parentElement.style.display = username == "Guest" ? "flex" : "none";
	logoutLink.parentElement.style.display = username == "Guest" ? "none" : "flex";

})();
