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

    playerMovement() {
        if (setUp == true) {
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

        if (wKeyPressed && jumping == false) {
            jumping = true;
            gravity = jumpForce;
            this.y += gravity / 9;
        }
        if (this.y + this.h >= canvas.height) { //cannot jump more if player xpos is greater than the ground line
            this.ySpeed = 0;
            this.y = canvas.height - this.h; //to stop player sinking through the ground
            jumping = false;
            gravity = 0;
        }

        if (sKeyPressed == true) {
            this.y += this.ySpeed;
            if (this.y + this.h > canvas.height) {
                this.y = canvas.height - this.h;
            }
        }
    }
    gravity() {
        if(gravity > -60 && this.y < canvas.height - this.h){
            this.y += gravity / 1.8;
            gravity += 2;
        }
    }
}