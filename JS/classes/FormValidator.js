"use strict";
(function () {
	class FormValidator {
		validators = [];
		errors = [];

		constructor(form) {
			this.form = form;

			this.form.addEventListener("submit", (event) =>
				this.onSubmit(event)
			);
			this.resetSummary();
		}

		onSubmit(event) {
			this.resetSummary();
			this.removeInlineErrors();
			const isValid = this.validate();
			if (!isValid) {
				event.preventDefault();
				//voorkom verdere, onmiddellijke (hint), propagatie van het event
				event.stopImmediatePropagation();
				this.showSummary();
				this.showInlineErrors();
			}
		}
		validate() {
			this.errors = [];
			this.validators.forEach((validator) => {
				const isValid = validator.method(validator.field);
				if (!isValid) {
					//Als error al aanwezig is, niet toevoegen
					if (
						this.errors.find(
							(error) => error.name === validator.name
						)
					)
						return;
					this.errors.push(validator);
				}
			});

			return this.errors.length === 0;
		}

		addValidator(validatorObject) {
			let field = this.form.elements[validatorObject.name];
			if (!field) return;
			this.validators.push({
				//spread
				...validatorObject,
				field,
			});

			
			if (validatorObject.hint) {
				const hint = this.createInlineHint(validatorObject);
				field.labels[0].appendChild(hint);
			}
		}

		createInlineHint(validator) {
			const span = document.createElement("span");
			span.classList.add("field-hint");
			span.innerText = validator.hint;
			return span;
		}
		createInlineError(validator) {
			const span = document.createElement("span");
			span.classList.add("field-error");
			span.innerText = validator.message;
			span.id = `${validator.name}-error`;

			const warning = document.createElement("i");
			warning.classList.add("fa", "fa-exclamation-triangle");
			span.insertBefore(warning, span.firstChild);
			return span;
		}

		showInlineErrors() {
			this.errors.forEach((error) => {
				const errorElement = this.createInlineError(error);
				const field = error.field;
				if (field instanceof Node) {
					field.classList.add("invalid");
					field.setAttribute("aria-invalid", true);
					field.labels[0].appendChild(errorElement);
				} else if (error.field instanceof NodeList) {
					error.field.forEach((node) => {
						node.classList.add("invalid");
						node.setAttribute("aria-invalid", true);
						node.setAttribute(
							"aria-describedby",
							`${errorElement.id}-error`
						);
					});

					const closestField = error.field[0].closest("fieldset");
					const legend = closestField?.querySelector("legend");
					if (legend) {
						legend.appendChild(errorElement);
					}
				}
			});
		}

		removeInlineErrors() {
			this.form
				.querySelectorAll(".field-error")
				.forEach((element) => element.remove());

			let invalidFields = this.form.querySelectorAll(".invalid");
			invalidFields.forEach((field) => {
				field.classList.remove("invalid");
				field.removeAttribute("aria-invalid");
				field.removeAttribute("aria-describedby");
			});
		}
		resetSummary() {
			const summary = this.form.querySelector(".errorSummary");
			summary?.classList.add("hidden");
			summary?.querySelectorAll("li").forEach((li) => li.remove());
		}
		showSummary() {
			const summary = this.form.querySelector(".errorSummary");
			const list = summary?.querySelector("ul");
			if (!list) return;
			summary.classList.remove("hidden");

			this.errors.forEach((error) => {
				const listItem = document.createElement("li");
				const link = document.createElement("a");
				listItem.appendChild(link);
				link.innerText = error.message;
				link.href = `#${error.name}`;
				link.classList.add("errorLink");

				const warning = document.createElement("i");
				warning.classList.add("fa", "fa-exclamation-triangle");
				link.insertBefore(warning, link.firstChild);
				list.appendChild(listItem);
			});

			summary.focus();
		}
	}

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

	formValidator.addValidator({
		name: "password",
		method: (field) =>
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(field.value),
		message: `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number`,
		hint: `8 characters, 1 uppercase, 1 lowercase, 1 number`,
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
		const response = await fetch("../php/process.php", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		console.log(result);
		try {
			const error = result.error;
			if (error) {
				formValidator.errors.push({
					name: "Server error",
					message: error,
				});
				formValidator.showSummary();
			} else {
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
			}
		} catch (error) {
			formValidator.errors.push({
				name: "Server error",
				message: error,
			});
			formValidator.showSummary();
		}

		//Reset form
		this.reset();
	});

	//Moest er een passwoord zijn
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
