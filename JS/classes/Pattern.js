const patterns = document.querySelector(".patterns");
import Iceberg from "./Iceberg.js";
import Tile from "./Tile.js";
import Board from "./Board.js";
class Pattern {
	constructor(points, board) {
		this.element = document.createElement("div");
		this.element.classList.add("pattern");
		this.board = board;
		this.padding = 2; // rem
		this.width = 0;
		this.height = 0;
		this.icebergs = [];
		this.events = {};
		for (let point of points) {
			let iceberg = new Iceberg(
				this,
				point,
				this.board.tileWidth,
				this.board.tileHeight
			);
			this.icebergs.push(iceberg);
		}

		this.dragging = false;
		this.startX = 0;
		this.startY = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		this.totalOffsetX = 0;
		this.totalOffsetY = 0;
		this.rotation = 0;
		this.flipped = false;

		this.draw();

		//Mouse
		this.events.mouseup = document.addEventListener(
			"mouseup",
			this.stopDrag.bind(this)
		);
		this.events.mousemove = document.addEventListener(
			"mousemove",
			this.drag.bind(this)
		);

		//Touch
		this.events.touchend = document.addEventListener(
			"touchend",
			this.stopDrag.bind(this)
		);
		this.events.touchmove = document.addEventListener(
			"touchmove",
			this.drag.bind(this)
		);

		this.events.gesturechange = document.addEventListener(
			"gesturechange",
			this.gestureChange.bind(this)
		);
		this.events.keydown = document.addEventListener("keydown", (event) => {
			let key = event.key;

			if (key === "ArrowUp" || key === "ArrowDown") {
				this.flip();
				return;
			}
			let delta = key === "ArrowRight" ? 1 : key === "ArrowLeft" ? -1 : 0;

			if (delta == 0) return;
			this.rotate(delta);
		});

		patterns.appendChild(this.element);
	}

	draw() {
		// TODO: Zorgen dat het patroon geen negatieve coordinaten heeft
		this.icebergs.forEach((iceberg) => {
			iceberg.element.removeEventListener(
				"mousedown",
				this.events.mousedown
			);
			iceberg.element.removeEventListener(
				"touchstart",
				this.events.touchstart
			);
		});

		let mostLeft = 0;
		let mostRight = 0;
		let mostTop = 0;
		let mostBottom = 0;

		this.icebergs.forEach((iceberg) => {
			iceberg.draw(this.offsetX, this.offsetY);

			mostLeft = Math.min(mostLeft, iceberg.left);
			mostRight = Math.max(mostRight, iceberg.left + iceberg.width);
			mostTop = Math.min(mostTop, iceberg.top);
			mostBottom = Math.max(mostBottom, iceberg.top + iceberg.height);

			this.events.mousedown = iceberg.element.addEventListener(
				"mousedown",
				this.startDrag.bind(this, iceberg)
			);
			this.events.touchstart = iceberg.element.addEventListener(
				"touchstart",
				this.startDrag.bind(this, iceberg)
			);

			this.element.appendChild(iceberg.element);
		});

		this.width = mostRight - mostLeft;
		this.height = mostBottom - mostTop;
		this.element.style.width = this.width + this.padding * 16 + "px";
		this.element.style.height = this.height + this.padding * 16 + "px";

		if (!this.dragging) {
			return;
		}

		//Fix als je draait dat je muis nog steeds op dezelfde iceberg staat.
		let bounding = this.dragging.element.getBoundingClientRect();

		this.startX = bounding.left + bounding.width / 2 - this.offsetX;
		this.startY = bounding.top + bounding.height / 2 - this.offsetY;

		this.offsetX = this.mouseX - this.startX;
		this.offsetY = this.mouseY - this.startY;

		for (let iceberg of this.icebergs) {
			iceberg.draw(this.offsetX, this.offsetY);
		}
		this.board.selectPattern(this, this.dragging);
	}
	startDrag(iceberg, event) {
		console.log("startDrag");
		console.log(event);
		event.preventDefault();

		if (this.dragging) {
			return;
		}
		if (!(event.button == 0 || event.touches)) return; //Only left click
		this.dragging = iceberg;
		this.startX = event.clientX || event.touches[0].clientX;
		this.startY = event.clientY || event.touches[0].clientY;	
		this.offsetX = 0;
		this.offsetY = 0;
		iceberg.element.classList.add("dragging");


	}

	stopDrag(event) {
		event.preventDefault();
		console.log("stopDrag");
		//Dropped on the board
		if (!(event.button == 0 || event.touches?.length == 1) || !this.dragging) return;
		let iceberg = this.dragging;

		let board = this.board;
		let result = board.drawPattern(this, iceberg);
		if (result) {
			//this.element.remove(); Niet zo mooi
			this.element.style.opacity = 0;
			this.element.style.pointerEvents = "none";
		} else {
			this.reset();
		}
		this.dragging = false;
		iceberg.element.classList.remove("dragging");
	}

	drag(event) {
		event.preventDefault();
		console.log("drag");
		if (!this.dragging) return;

		this.mouseX = event.clientX || event.touches[0].clientX;
		this.mouseY = event.clientY || event.touches[0].clientY;
		this.offsetX = this.mouseX - this.startX;
		this.offsetY = this.mouseY - this.startY;

		for (let iceberg of this.icebergs) {
			iceberg.draw(this.offsetX, this.offsetY);
		}

		this.board.selectPattern(this, this.dragging);

		
	}

	rotate(delta) {
		if (!this.dragging) return;

		this.rotation = (this.rotation + delta) % 6;
		// if between 0 and 3 keep it there, between 3 - 6 it should become -3 - -1
		if (this.rotation > 3) this.rotation -= 6;
		if (this.rotation < -3) this.rotation += 6;

		this.width = 0;
		this.height = 0;

		for (let iceberg of this.icebergs) {
			let point = iceberg.initialPoint;
			let x = point[0];
			let y = point[1];

			let newX = iceberg.cache[this.rotation]?.[0];
			let newY = iceberg.cache[this.rotation]?.[1];

			if (!newX || !newY) {
				let angle = this.rotation * (Math.PI / 3);

				newX = x * Math.cos(angle) - y * Math.sin(angle);
				newY = x * Math.sin(angle) + y * Math.cos(angle);

				newX = Math.round(newX);
				newY = Math.round(newY);

				//Hacky way om newY te fixen voor sommige cases
				newY = Math.abs(newX % 2) == 1 && newY < 0 ? newY + 1 : newY;
			}

			point = [newX, newY];

			iceberg.point = point;

			iceberg.cache[this.rotation] = [newX, newY];
		}

		this.draw();
	}

	gestureChange(event) {
		if (!this.dragging) return;

		let rotation = event.rotation;
		let lastRotation = this.lastRotation || rotation;
		let delta = rotation - lastRotation;

		if (Math.abs(delta) > 10) {
			this.rotate(delta > 0 ? 1 : -1);
			this.lastRotation = rotation;
		}
	}

	
	flip() {
		if (!this.dragging) return;

		this.flipped = !this.flipped;

		for (let iceberg of this.icebergs) {
			let point = iceberg.point;
			let x = point[0];
			let y = point[1];

			let newX = -x;
			let newY = y;

			point = [newX, newY];

			iceberg.point = point;
			iceberg.cache = [];
		}

		this.draw();
	}

	reset() {
		this.dragging = false;
		this.startX = 0;
		this.startY = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		this.element.classList.add("pattern--error");
		setTimeout(() => {
			this.element.classList.remove("pattern--error");
		}, 250);
		//this.element.classList.remove("pattern--error");

		this.draw();
	}

	cleanUp() {
		this.element.remove();
		this.element = null;
		this.board = null;
		for (let iceberg of this.icebergs) {
			iceberg.cleanUp();
		}
		this.icebergs = null;
		for (let event of Object.keys(this.events)) {
			document.removeEventListener(event, this.events[event]);
		}
	}
}

export default Pattern;
