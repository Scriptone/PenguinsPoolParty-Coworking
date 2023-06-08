import FormValidator from "../classes/FormValidator.js";

(() => {
	// selecteer je form
	const form = document.querySelector(".form");
	if (!form) return;

	// maak een nieuwe instantie van FormValidator
	const formValidator = new FormValidator(form);

	formValidator.addValidator({
		name: "username",
		method: (field) => field.value.trim().length > 0,
		message: "Username is a required field and was not filled in",
	});

	formValidator.addValidator({
		name: "username",

		//Regex
		method: (field) => /^[a-zA-Z0-9]{5,}$/.test(field.value),
		message:
			"Username must be at least 5 characters long and may only contain letters and numbers",
	});

	formValidator.addValidator({
		name: "password",
		method: (field) => field.value.trim().length > 0,
		message: "Password is a required field and was not filled in",
	});

	if (form.id === "register")
		//Enkel bij register.
		formValidator.addValidator({
			name: "password",
			//method field, at least 7 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
			method: (field) =>
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/.test(
					field.value
				),
			message:
				"Password must be at least 7 characters long and contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
			hint: `E.g. Password123!`,
		});

	formValidator.addValidator({
		name: "confirm-password",
		method: (field) => field.value.trim().length > 0,
		message: "Confirm password is a required field and was not filled in",
	});

	formValidator.addValidator({
		name: "confirm-password",
		method: (field) => field.value === form.password.value,
		message: "Confirm password does not match password",
	});

	formValidator.addValidator({
		name: "email",
		method: (field) => field.value.trim().length > 0,
		message: "E-mail is a required field and was not filled in",
	});

	formValidator.addValidator({
		name: "email",
		method: (field) =>
			field.value
				.trim()
				.match(
					/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
				),
		message: "E-mail does not match the expected format",
		hint: `E.g. name@domain.com`,
	});

	form.addEventListener("submit", async function (event) {
		event.preventDefault();
		console.log("Gaat verzonden worden");

		//Send to process.php
		const formData = new FormData(this);
		let data = Object.fromEntries(formData.entries());
		const action = this.id;
		data["action"] = action;

		console.log(data);

		try {
			const response = await fetch("../php/process.php", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();

			console.log(result);

			const error = result.error;
			if (error) throw new Error(error);

			console.log(action);
			switch (action) {
				case "register":
				case "login":
					sessionStorage.setItem("username", result.username);
					sessionStorage.setItem(
						"levels_completed",
						result.levels_completed
					);
					sessionStorage.setItem(
						"level",
						result.levels_completed + 1
					);
					window.location.href = "../";
					console.log(result);
			}
			//Reset form
			this.reset();
		} catch (error) {
			formValidator.errors.push({
				name: "Server error",
				message: error,
			});
			formValidator.showSummary();
		}
	});

	//Moest er een paswoord zijn
	const passwords = document.querySelectorAll("input[type='password']");
	passwords.forEach((password) => {
		//Knop voor visibility
		const button = password.nextElementSibling;
		button.addEventListener("click", function () {
			let type = password.getAttribute("type");
			type = type == "password" ? "text" : "password";
			password.setAttribute("type", type);
			button.classList.toggle("fa-eye-slash");
			button.classList.toggle("fa-eye");
		});
	});
})();
