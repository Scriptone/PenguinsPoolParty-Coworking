"use strict";
(async function () {
	const welcome_screen = document.querySelector(".welcome-screen");

	const loginLink = document.querySelector('.nav-link[href$="/login/"]');
	const logoutLink = document.querySelector('.nav-link[href$="/logout/"]');

	logoutLink.parentElement.style.display = "none";

	let level = sessionStorage.getItem("level");
	sessionStorage.setItem("level", level || 1);

	// Update the welcome screen
	let username = sessionStorage.getItem("username") || "Guest";

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
			if (data.username) {
				console.log(
					"This was needed, we existed on the server but not in the session"
				);
				sessionStorage.setItem("username", data.username);
				sessionStorage.setItem(
					"levels_completed",
					data.levels_completed
				);
				username = data.username;
			}
		} catch (error) {
			console.log("Something failed", error);
		}
	}

	let h2 = welcome_screen?.querySelector("h2");
	if (h2) h2.innerHTML = `Welcome, ${username}!`;

	loginLink.parentElement.style.display =
		username == "Guest" ? "flex" : "none";
	logoutLink.parentElement.style.display =
		username == "Guest" ? "none" : "flex";
})();
