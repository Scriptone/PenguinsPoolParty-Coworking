class FormValidator {
	validators = [];
	errors = [];

	constructor(form) {
		this.form = form;

		this.form.addEventListener("submit", (event) => this.onSubmit(event));
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
				if (this.errors.find((error) => error.name === validator.name))
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

export default FormValidator;