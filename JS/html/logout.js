"use strict";
(async function () {
	
	

	//Set server-side session data
	const result = await fetch("../../php/process.php", {
		method: "POST",
		body: JSON.stringify({ action: "logout" }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	console.log(result);
	const data = await result.json();
	console.log(data);
	//Set client-side session data
	sessionStorage.clear();
	window.location.href = "../";
})();
