const patterns = document.querySelector(".patterns");
import Iceberg from "./Iceberg.js";
class Pattern {
	constructor(points) {
		this.element = document.createElement("div");
		this.element.classList.add("pattern");
		this.padding = 2; // rem
		this.width = 0;
		this.height = 0;
		this.icebergs = [];

		for (let point of points) {
			let iceberg = new Iceberg(this, point);
			this.icebergs.push(iceberg);
		}

		this.dragging = false;
		this.startX = 0;
		this.startY = 0;
		this.totalOffsetX = 0;
		this.totalOffsetY = 0;
		this.rotation = 0;
		this.flipped = false;

		this.draw();
		document.addEventListener("mouseup", this.stopDrag.bind(this));
		document.addEventListener("mousemove", this.drag.bind(this));

		document.addEventListener("keydown", (event) => {
			let key = event.key;

			if (key == "ArrowUp" || key == "ArrowDown") {
				this.flip();
				return;
			}
			let delta = key == "ArrowRight" ? 1 : key == "ArrowLeft" ? -1 : 0;

			if (delta == 0) return;
			this.rotate(delta);
		});

		patterns.appendChild(this.element);
	}

	draw() {
		this.icebergs.forEach((iceberg) => {
			iceberg.element.removeEventListener("mousedown", this.mousedown);
		});
		let mostLeft = 0;
		let mostRight = 0;
		let mostTop = 0;
		let mostBottom = 0;
		this.icebergs.forEach((iceberg) => {
			let point = iceberg.point;
			iceberg.draw();

			mostLeft = Math.min(mostLeft, iceberg.left);
			mostRight = Math.max(mostRight, iceberg.left + Iceberg.tileWidth);
			mostTop = Math.min(mostTop, iceberg.top);
			mostBottom = Math.max(mostBottom, iceberg.top + Iceberg.tileHeight);

			this.mousedown = iceberg.element.addEventListener(
				"mousedown",
				this.startDrag.bind(this, iceberg)
			);

			this.element.appendChild(iceberg.element);
		});

		this.width = mostRight - mostLeft;
		this.height = mostBottom - mostTop;
		this.element.style.width = this.width + this.padding * 16 + "px";
		this.element.style.height = this.height + this.padding * 16 + "px";

		if (!this.dragging) return;
		let iceberg = this.dragging;
		let { left, top } = iceberg.element.getBoundingClientRect();
		let { startX, startY } = this;

		let offsetX = startX - left;
		let offsetY = startY - top;

		for (let iceberg of this.icebergs) {
			let left = parseInt(iceberg.element.style.left);
			let top = parseInt(iceberg.element.style.top);
			iceberg.element.style.left =
				left + offsetX - Iceberg.tileWidth / 2 + "px";
			iceberg.element.style.top =
				top + offsetY - Iceberg.tileHeight / 2 + "px";
		}
	}
	startDrag(iceberg, event) {
		if (event.button != 0) return; //Only left click
		this.dragging = iceberg;
		this.startX = event.clientX;
		this.startY = event.clientY;
	}

	stopDrag(event) {
		//Dropped on the board
		if (!this.dragging || event.button != 0) return; //Only left click
		let iceberg = this.dragging;
		this.dragging = false;

		let board = this.board;
		let result = board.drawPattern(this, iceberg);
		if (result) {
			this.element.remove();
		} else {
			this.reset();
		}
	}

	drag(event) {
		if (!this.dragging) return;

		let offsetX = event.movementX;
		let offsetY = event.movementY;

		this.startX = event.clientX;
		this.startY = event.clientY;
		for (let iceberg of this.icebergs) {
			let left = parseInt(iceberg.element.style.left);
			let top = parseInt(iceberg.element.style.top);
			iceberg.element.style.left = left + offsetX + "px";
			iceberg.element.style.top = top + offsetY + "px";
		}
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

		this.draw();
	}
	setBoard(board) {
		this.board = board;
	}
}

export default Pattern;
