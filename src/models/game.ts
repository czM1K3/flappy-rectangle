import { Wall } from "./wall";

export class Game {
	canvas: CanvasRenderingContext2D;
	scoreP: HTMLParagraphElement;
	playerY: number;
	playerX = 50;
	width: number;
	height: number;
	playerSize = 50;
	jumpSize = 50;
	tickMove = 1;
	holeSize = 150;
	walls: Wall[];
	lost = false;
	score = 0;
	autoJump: boolean;

	constructor(canvas: CanvasRenderingContext2D, scoreP: HTMLParagraphElement, width: number, height: number, autoJump = true) {
		this.canvas = canvas;
		this.scoreP = scoreP;
		this.width = width;
		this.height = height;
		this.playerY = height / 2;
		this.walls = [];
		this.autoJump = autoJump;
	}

	gameLoop() {
		if (this.lost) return;
		if (this.playerY < (this.height - this.playerSize)) 
			this.playerY += 1;
		this.walls = this.walls.map((wall) => new Wall(wall.x - this.tickMove, wall.y));
		const unused = this.walls.find((wall) => wall.x <= 0);
		if (unused) {
			this.score++;
			this.walls = this.walls.filter((wall) => unused !== wall);
		}
		this.autoJumpLoop();
		this.render();
		this.checkCollider();
	}

	jump() {
		if (this.playerY > this.playerSize / 2)
			this.playerY -= this.jumpSize;
	}

	spawnWall() {
		this.walls.push(
			new Wall(
				this.width,
				Math.floor(
					Math.random() * (this.height - this.holeSize)
				)
			)
		);
	}

	keyInput(key: string) {
		switch (key) {
			default: {
				this.jump();
				break;
			}
		}
	}

	checkCollider() {
		const wall = this.walls.find((wall) => wall.x > this.playerX && wall.x < (this.playerX + this.playerSize));
		if (!wall) return;
		if (wall.y < this.playerY && (wall.y + this.holeSize) > (this.playerY + this.playerSize)) return;
		alert("You lost");
		location.reload();
		this.lost = true;
	}

	autoJumpLoop() {
		if (!this.autoJump || this.walls.length === 0)
			return;
			const playerBottom = this.playerY + this.playerSize;
		const wall = this.walls[0];
		const wallBottom = wall.y + this.holeSize - 1;
		if (playerBottom > wallBottom)
			this.jump();
	}

	render() {
		this.canvas.clearRect(0, 0, this.width, this.height);

		this.canvas.fillStyle = "black";
		this.canvas.fillRect(this.playerX, this.playerY, this.playerSize, this.playerSize);
		
		this.canvas.fillStyle = "red";
		this.walls.map((wall) => {
			this.canvas.fillRect(wall.x, 0, 5, wall.y);
			this.canvas.fillRect(wall.x, wall.y + this.holeSize, 5, this.height - (wall.y + this.holeSize));
		});

		this.scoreP.innerText = `Score: ${this.score}`;
	}
};
