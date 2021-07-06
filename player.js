class Player {
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
        if (setUp) { //start pos
            this.x = canvas.width / 2 - this.w;
            this.y = canvas.height - this.h;
            setUp = false;
        }

        if (aKeyPressed == true && this.y + 1.74 * this.x >= 605) { //y=mx+c for diagonal wall
            this.x -= this.xSpeed;
            if (this.x < 0) {
                this.x = 0;
            }
        }
        if (dKeyPressed == true) {
            this.x += this.xSpeed;
            if (this.x + this.w > canvas.width) {
                this.x = canvas.width - this.h;
            }
        }
        if (wKeyPressed == true && this.y + 1.74 * this.x >= 605) { //y=mx+c for diagonal wall
            this.y -= this.ySpeed;
            if (this.y < yWall) {
                this.y = yWall;
            }
        }

        if (sKeyPressed == true) {
            this.y += this.ySpeed;
            if (this.y + this.h > canvas.height) {
                this.y = canvas.height - this.h;
            }
        }
    }

    jump() {
        if (spacePressed == true && jumping == false) { //jumping
            jumping = true;
            gravity = jumpForce; //gravity becomes jump force
            this.y += gravity / 9;
        }

        if (this.y + this.h >= canvas.height) { //cannot jump more if player xpos is greater than the ground line
            this.ySpeed = 0;
            this.y = canvas.height - this.h; //to stop player sinking through the ground
            jumping = false;
            gravity = 0;
        }
    }

    gravity() {
        if (gravity > -60 && this.y < canvas.height - this.h) {
            this.y += gravity / 1.8;
            gravity += 2;
        }
    }

    depth() {
        if (this.y + this.h < canvas.height && wKeyPressed == true) {
            if (this.y > yWall && this.h >= 30) {
                this.h -= 0.1;
            }
        }
        if (sKeyPressed == true && this.h < 40) {
            this.h += 0.1;
        }
    }

    hitItem(item) {
        return (this.x + this.w > item.x && this.x < item.x + item.w) && (this.y + this.h > item.y && this.y < item.y + item.h)
    }

    hitEnemy(enemy) {
        return this.hitItem(enemy);
    }

    collision() {
        var self = this;
        var collided = false;
        enemies.forEach(function (enemy, i) {
            if (self.hitEnemy(enemy)) {
                collided = true;
            }
        });
        return collided;
    }
}