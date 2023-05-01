("use strict");
(function () {
	const button = document.querySelector(".info");
	const overlay = document.querySelector(".overlay");
	const hamburger = document.querySelector(".hamburger-btn");

	const toggleOverlay = () => {
		overlay.classList.toggle("active");
	};

	const toggleHamburger = () => {
		hamburger.setAttribute(
			"aria-expanded",
			hamburger.getAttribute("aria-expanded") === "true"
				? "false"
				: "true"
		);
	};

	hamburger.addEventListener("click", toggleHamburger);

	button.addEventListener("click", toggleOverlay);
	overlay.addEventListener("click", toggleOverlay);
})();
