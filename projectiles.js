class playerProjectile {
    constructor(x, y, w, h, c, xSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
    movement() {
        this.x += this.xSpeed;
    }
    outOfbounds() {
        return this.x > canvas.width;
    }
    hitItem(item) {
        return (this.x + this.w > item.x && this.x < item.x + item.w) && (this.y + this.h > item.y && this.y < item.y + item.h);
    }
    hitKnight(knight) {
        return this.hitItem(knight);
    }
    hitArcher(archer) {
        return this.hitItem(archer);
    }
    knightCollision() {
        let self = this;
        let collided = false;
        knights.forEach(function (knight, i) {
            if (self.hitKnight(knight)) {
                delete knights[i];
                collided = true;
            }
        });
        knights = knights.filter(item => item !== undefined);

        return collided;
    }
    archerCollision() {
        let self = this;
        let collided = false;
        archers.forEach(function (archer, i) {
            if (self.hitArcher(archer)) {
                delete archers[i];
                collided = true;
            }
        });
        archers = archers.filter(item => item !== undefined);
        return collided;
    }
}

class archerProjectile {
    constructor(x, y, w, h, c, xSpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
    movement() {
        this.x += this.xSpeed;
    }
    outOfbounds() {
        return this.x < 0;
    }
    hitItem(item) {
        return (this.x + this.w > item.x && this.x < item.x + item.w) && (this.y + this.h > item.y && this.y < item.y + item.h);
    }
    hitPlayer(player) {
        return this.hitItem(player);
    }
    playerCollision() {
        let self = this;
        let collided = false;
        if (self.hitPlayer(player)) {
            collided = true;
            if (collided == true && health > 0) {
                health -= 33;
                // console.log(health);
            }
            if (health <= 0) {
                // gameState = 'gameOver';
            }
        }
        return collided;
    }
}