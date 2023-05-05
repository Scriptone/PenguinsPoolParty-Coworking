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

		//Dit idee komt van chatgpt om het ervoor te zorgen dat ik die events ook kan verwijderen.
		this.stopDrag = this.stopDrag.bind(this);
		this.drag = this.drag.bind(this);

		for (let point of points) {
			let iceberg = new Iceberg(
				this,
				point,
				this.board.tileWidth,
				this.board.tileHeight
			);
			this.icebergs.push(iceberg);
			iceberg.element.addEventListener(
				"mousedown",
				this.startDrag.bind(this, iceberg)
			);
			iceberg.element.addEventListener(
				"touchstart",
				this.startDrag.bind(this, iceberg)
			);
		}

		this.dragging = false;
		this.startX = 0; // Start position of mouse
		this.startY = 0; // Start position of mouse
		this.offsetX = 0; // Offset of startX and currentX
		this.offsetY = 0; // Offset of startY and currentY
		this.left = 0; // Left position of pattern relative to original position
		this.top = 0; // Top position of pattern relative to original position
		this.rotation = 0;
		this.flipped = false;
		this.dragged = false;
		this.lastTouch = null;
		this.draw();

		document.addEventListener("keydown", (event) => {
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
			this.element.appendChild(iceberg.element);
		});

		this.width = mostRight - mostLeft;
		this.height = mostBottom - mostTop;
		this.element.style.width = `${this.width + this.padding * 16}px`;
		this.element.style.height = `${this.height + this.padding * 16}px`;
		this.left = mostLeft;
		this.top = mostTop;

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
		//Check if any pattenrs are already being dragged
		for (let pattern of this.board.patterns) {
			if (pattern.dragging) {
				return;
			}
		}
		if (!(event.button == 0 || event.touches)) return; //Only left click or touch

		//Double tap?

		this.dragging = iceberg;
		this.mouseX = event.clientX || event.touches[0].clientX;
		this.mouseY = event.clientY || event.touches[0].clientY;
		this.startX = this.mouseX + this.left;
		this.startY = this.mouseY + this.top;
		this.offsetX = 0;
		this.offsetY = 0;
		iceberg.element.classList.add("dragging");

		//Mouse
		document.addEventListener("mouseup", this.stopDrag);
		document.addEventListener("mousemove", this.drag);

		//Touch
		document.addEventListener("touchend", this.stopDrag);
		document.addEventListener("touchmove", this.drag, { passive: false });

		console.log(this.lastTouch);
		if (this.lastTouch && performance.now() - this.lastTouch < 300) {
			this.flip();
			this.lastTouch = null;
			return;
		}
		this.lastTouch = performance.now();
	}

	stopDrag(event) {
		//Dropped on the board
		if (
			!(event.button == 0 || event.touches?.length != 1) ||
			!this.dragging
		)
			return;

		let iceberg = this.dragging;
		iceberg.element.classList.remove("dragging");
		this.dragging = null;

		document.removeEventListener("mouseup", this.stopDrag);
		document.removeEventListener("mousemove", this.drag);

		document.removeEventListener("touchend", this.stopDrag);
		document.removeEventListener("touchmove", this.drag, {
			passive: false,
		});

		if (!this.dragged) return; //Als we enkel geklikt hebben, dan moet de code niet runnen.

		let board = this.board;
		let result = board.drawPattern(this, iceberg);
		if (result) {
			//this.element.remove(); Niet zo mooi
			this.element.style.opacity = 0;
			this.element.style.pointerEvents = "none";
		} else {
			this.reset();
		}

		this.dragged = false;
	}

	drag(event) {
		event.preventDefault();
		// console.log("drag");
		if (!this.dragging) return;

		this.dragged = true;
		this.mouseX = event.clientX || event.touches[0].clientX;
		this.mouseY = event.clientY || event.touches[0].clientY;
		this.offsetX = this.mouseX - this.startX;
		this.offsetY = this.mouseY - this.startY;

		for (let iceberg of this.icebergs) {
			iceberg.draw(this.offsetX, this.offsetY);
		}

		this.board.selectPattern(this, this.dragging);

		if (event.touches?.length == 2) {
			let rotation =
				Math.atan2(
					event.touches[0].pageY - event.touches[1].pageY,
					event.touches[0].pageX - event.touches[1].pageX
				) * 180;

			if (this.oldRotation == null) this.oldRotation = rotation;
			let deltaAngle = rotation - this.oldRotation;
			if (Math.abs(deltaAngle) >= 70) {
				this.oldRotation = rotation;
				this.rotate(Math.sign(deltaAngle));
			}
		}
	}

	rotate(delta) {
		if (!this.dragging) return;

		this.rotation = (this.rotation + delta) % 6;
		// if between 0 and 3 keep it there, between 3 - 6 it should become -3 - -1

		this.rotation = this.rotation >= 3 ? this.rotation - 6 : this.rotation;
		this.rotation = this.rotation <= -3 ? this.rotation + 6 : this.rotation;

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

				// let newSpan = document.createElement("span");
				// newSpan.classList.add("point");
				// newSpan.style.left = newX * 16 + "px";
				// newSpan.style.top = newY * 16 + "px";
				// this.element.appendChild(newSpan);
				newX = Math.round(newX);
				newY = Math.round(newY);

				//Hacky way om newY te fixen voor sommige cases
				let oldY = newY;
				newY = Math.abs(newX % 2) == 1 && newY < 0 ? newY + 1 : newY;
				// oldY != newY && console.log("Fixed Y", oldY, newY);
			}

			point = [newX, newY];

			iceberg.point = point;

			iceberg.cache[this.rotation] = [newX, newY];
		}

		this.draw();
	}

	flip() {
		if (!this.dragging) return;
		this.flipped = !this.flipped;

		for (let iceberg of this.icebergs) {
			let point = iceberg.initialPoint;
			let x = point[0];
			let y = point[1];

			let newX = -x;
			let newY = y;

			point = [newX, newY];

			iceberg.initialPoint = point;
			iceberg.cache = [];
		}

		this.rotate(0);
	}

	reset() {
		this.dragging = false;

		this.offsetX = -this.left;
		this.offsetY = -this.top;
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
	}
}

export default Pattern;
