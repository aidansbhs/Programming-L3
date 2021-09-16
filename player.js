class Player {
    constructor(x, y, w, h, c, xSpeed, ySpeed, maxArrows = 4) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.maxArrows = maxArrows;
        this.arrows = [];
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (aKeyPressed == true) {
            if (this.y + 1.74 * this.x <= 605) { //y=mx+c for diagonal wall
                let rise = 1.74 / 2.74;
                let run = 1 / 2.74;
                this.x -= this.xSpeed * run; //makes it able to 'slide' up the wall instead of stopping by calculating the rise and run and substituting into speed
                this.y += this.xSpeed * rise;
            } else {
                this.x -= this.xSpeed;
            }
            if (this.x < 0) { // can't go lower than ground
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
            if (this.y + 1.74 * this.x <= 605) { //y=mx+c for diagonal wall
                let rise = 1.74 / 2.74;
                let run = 1 / 2.74;
                this.y -= this.ySpeed * rise; //makes it able to 'slide' up the wall instead of stopping by calculating the rise and run and substituting into speed
                this.x += this.ySpeed * run;
            } else {
                this.y -= this.ySpeed;
            }
            if (this.y < yWall) { //can't go above the y wall
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

    depth() {
        if (this.y + this.h < canvas.height && wKeyPressed == true) { //shrinks the player if they are moving up y axis
            if (this.y > yWall && this.h >= 30) {
                this.h -= 0.1;
            }
            if (aKeyPressed == true && this.w >= 30) {
                this.w -= 0.1; //only decreases size if player is also going up (need to improve)
            }
        }
        if (sKeyPressed == true && this.h < 40) { //grows if moving towards front of screen
            this.h += 0.1;
        }
        if (dKeyPressed == true && this.w < 40) {
            this.w += 0.1; //only increases size if player is also going down (need to improve)
        }
    }

    hitItem(item) {
        return (this.x + this.w > item.x && this.x < item.x + item.w) && (this.y + this.h > item.y && this.y < item.y + item.h)
    }

    hitKnight(knight) {
        return this.hitItem(knight);
    }

    collision() {
        var self = this;
        var collided = false;
        knights.forEach(function (knight) { //for each knight
            if (self.hitKnight(knight)) { //if touching
                collided = true;
                if (collided == true && health > 0) {
                    health -= 1; //decrease the health if touching
                    // console.log(health);
                }
                if (health == 0) {
                    // gameState = 'gameOver';
                }
            }
        });
        return collided;
    }

    attacking() {
        var inRange = false;
        knights.forEach(function (knight, i) {
            if (xKeyPressed == true) {
                if (this.hitKnight(knight)) { //**add range for attack
                    delete knights[i];
                    console.log('working');
                    inRange = true;
                }
            }
        });
        knights = knights.filter(item => item !== undefined);
        return inRange;
    }

    shooting() {
        if (this.arrows.length < this.maxArrows) { //limits spamming arrows
            this.arrows.push(new playerProjectile(this.x + this.w / 2, this.y + this.h / 2, 10, 10, 'white', 7.5));
        }
    }

    gameOver() {
        canvasContext.font = '100px serif';
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Game Over', canvas.width / 2.7, canvas.height / 1.5);
    }
}