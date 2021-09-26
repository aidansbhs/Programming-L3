class Knight {
    constructor(x, y, w, h, c, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.setup = true;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.setup) {
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
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

class Archer {
    constructor(x, y, w, h, c, xSpeed, ySpeed, maxArrows = 3) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.maxArrows = maxArrows;
        this.arrows = [];
        this.setup = true;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.setup) { //start pos
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
        }

        if (this.x > 1200) {
            this.x -= this.xSpeed;
        }

        if (this.y < yWall) {
            this.y = yWall;
        }
    }
    shooting() {
        if (gameState == 'playing') {
            if (this.x < canvas.width - this.w) {
                if (this.arrows.length < this.maxArrows) { //limits spamming arrows
                    this.arrows.push(new archerProjectile(this.x + this.w / 2, this.y + this.h / 2, 10, 10, "red", -7.5));
                }
            }
        }
    }
}

class Tank {
    constructor(x, y, w, h, c, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.setup = true;

    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if(this.setup){
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
        }

        this.x -= this.xSpeed

        if (this.x <= player.x) {
            this.xSpeed = 0;
        }
    }
}


class Mage {
    constructor(x, y, w, h, c, xSpeed, ySpeed, maxProjectiles = 1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.maxProjectiles = maxProjectiles;
        this.projectiles = [];
        this.setup = true;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if(this.setup){
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
        }
        this.x -= this.xSpeed

        if (this.x <= player.x) {
            this.xSpeed = 0;
        }
    }
    shooting() {
        if (gameState = 'playing') {
            if (this.x < canvas.width - this.w) {
                if (this.projectiles.length < this.maxProjectiles) { //limits spamming
                    this.projectiles.push(new mageProjectile(this.x + this.w / 2, this.y + this.h / 2, 20, 20, "pink", -6.5));
                }
            }
        }
    }
}