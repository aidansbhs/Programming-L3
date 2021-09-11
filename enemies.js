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
        if (eSetUp == true) {
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            eSetUp = false;
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
        if (aSetUp) { //start pos
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            aSetUp = false;
        }
        // enemies.forEach(function (enemy, i) { //for each enemy
                // if (this.x < enemy.x) {
                    if(this.x > 1200){
                    this.x -= this.xSpeed;
                    // console.log('working');
                }
            // });
        }
        shooting() {
            if (gameState == 'playing') {
                if (archerArrowCount < maxArcherArrows) { //limits spamming arrows
                    createArrow(-1, this.x, this.y, this.w, "archer");
                    console.log(archerArrowCount);
                }
            }
        }
    }