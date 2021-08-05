class Enemy {
    constructor(x, y, w, h, c, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (setUp3 == true) {
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            setUp3 = false;
        }

        if (this.x <= player.x) {
            this.x += this.xSpeed;
        }

        if (this.x >= player.x) {
            this.x -= this.xSpeed;
        }

        if (this.y <= player.y) {
            this.y += this.ySpeed;
        }
        if (this.y >= player.y) {
            this.y -= this.ySpeed;
        }
        if (this.y < yWall) {
            this.y = yWall;
        }
    }
}