let sample = {
	"penguins": [
		[0, 0],
		[1, 0],
		[2, 1],
		[3, 2],
	],
}

console.log(JSON.stringify(sample));

try {
	const response = await fetch("../../php/process.php", {
		method: "POST",
		body: JSON.stringify({
			action: "add_community_level",
			level: sample,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let result = await response.text();
	console.log(result);
} catch (e) {
	console.log(e);
}