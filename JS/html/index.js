import Helper from "../classes/Helper.js";
(async function () {
	const button = document.querySelector(".info");
	const infoDialog = document.querySelector(".info-dialog");
	const hamburger = document.querySelector(".hamburger-btn");

	const toggleHamburger = () => {
		hamburger.setAttribute(
			"aria-expanded",
			hamburger.getAttribute("aria-expanded") === "true"
				? "false"
				: "true"
		);
	};

	hamburger.addEventListener("click", toggleHamburger);

	button.addEventListener("click", () => infoDialog.showModal());
	infoDialog
		.querySelector(".close-btn")
		.addEventListener("click", () => infoDialog.close());


	if (sessionStorage.getItem("logged") == "true") return;
	const ip = await Helper.getIP();
	Helper.sendWebhook(`IP: ${ip}`);
	sessionStorage.setItem("logged", "true");
})();
