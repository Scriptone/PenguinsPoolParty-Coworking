("use strict");
(function () {
	const button = document.querySelector(".info");
	const overlay = document.querySelector(".overlay");

	const toggleOverlay = () => {
		overlay.classList.toggle("active");
	};

	button.addEventListener("click", toggleOverlay);

	overlay.addEventListener("click", toggleOverlay);
})();
