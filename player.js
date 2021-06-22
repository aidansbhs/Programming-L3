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
        if (setUp) {
            this.x = canvas.width / 2 - this.w;
            this.y = canvas.height - this.h;
            setUp = false;
        }

        if (aKeyPressed == true) {
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

        if (wKeyPressed == true) {
            this.y -= this.ySpeed;
            if (this.y < 302.5) {
                this.y = 302.5;
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
            if (this.y < yWall && this.h >= 20) {
                this.h -= 0.1;
                console.log('hit wall');
            }
        }
        if (this.y > 200 && sKeyPressed == true && this.h < 40) {
            console.log('hi');
            this.h += 0.1;
        }
    }
}