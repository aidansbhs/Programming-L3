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
    hitEnemy(enemy) {
        return this.hitItem(enemy);
    }
    hitArcher(archer) {
        return this.hitItem(archer);
    }
    enemyCollision() {
        var self = this;
        var collided = false;
        enemies.forEach(function (enemy, i) {
            if (self.hitEnemy(enemy)) {
                delete enemies[i];
                collided = true;
            }
        });
        enemies = enemies.filter(item => item !== undefined);

        return collided;
    }
    archerCollision() {
        var self = this;
        var collided = false;
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
        return this.x > canvas.width;
    }
    hitItem(item) {
        return (this.x + this.w > item.x && this.x < item.x + item.w) && (this.y + this.h > item.y && this.y < item.y + item.h);
    }
    hitPlayer(player) {
        return this.hitItem(player);
    }
    playerCollision() {
        var self = this;
        var collided = false;
        if (self.hitEnemy(player)) {
            collided = true;
            if (collided == true && health > 0) {
                health -= 33;
            }
            if (health == 0) {
                gameState = 'gameOver';
            }
        }
        return collided;
    }
}