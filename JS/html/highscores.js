"use strict";
(async function () {
	const body = document.querySelector(".highscores-body");
	if (!body) return;

	try {
		const response = await fetch("../../php/process.php", {
			method: "POST",
			body: JSON.stringify({ action: "highscores" }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		console.log(result);

		const highscores = result;
		let rank = 1;
		for (const highscore of highscores) {
			const row = document.createElement("tr");
			row.innerHTML = `<td>${rank}</td><td>${highscore.username}</td><td>${highscore["levels_completed"]}</td>`;
			body.appendChild(row);
			rank++;
		}
	} catch (error) {
		console.log("Something failed", error);
		const row = document.createElement("tr");
		row.innerHTML = `<td>Something failed</td>`;
		body.appendChild(row);
	}
})();
