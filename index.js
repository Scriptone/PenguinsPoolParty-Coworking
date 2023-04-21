"use strict";
(function () {
	const map = document.querySelector("#map");
	const hexagonWidth = 50;
	const hexagonHeight = 44;
	//Geneer map
	const geneerMap = function (mapWidth = 5, mapHeight = 4) {
		const mapWidthPx = (hexagonWidth / 4) * (mapWidth * 3 + 1);
		const mapHeightPx = mapHeight * hexagonHeight;
		map.style.width = mapWidthPx + "px";
		map.style.height = mapHeightPx + "px";
		for (let i = 0; i < mapHeight; i++) {
			for (let j = 0; j < mapWidth; j++) {
				let hex = document.createElement("div");
				hex.classList.add("hexagon");
				hex.classList.add(`hexagon-${i}-${j}`);

				hex.style.width = hexagonWidth + "px";
				hex.style.height = hexagonHeight + "px";
				//Hexagon positioneren
				hex.style.left = j * hexagonWidth * 0.75 + "px";

				hex.style.top =
					i * hexagonHeight - ((j % 2) * hexagonHeight) / 2 + "px";

				hex.innerHTML = i + "-" + j;
				map.appendChild(hex);
			}
		}
	};

	geneerMap();
})();
