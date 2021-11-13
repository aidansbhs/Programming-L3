class playerProjectile {
    constructor(x, y, w, h, c, xSpeed, direction) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.direction = direction;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
    movement() {
        this.x += this.xSpeed * this.direction;
    }
    outOfbounds() {
        return this.x > canvas.width || this.x < 0;
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
    hitTank(tank) {
        return this.hitItem(tank);
    }
    hitMage(mage) {
        return this.hitItem(mage);
    }
    knightCollision() {
        let self = this;
        let collided = false;
        knights.forEach(function (knight, i) {
            if (self.hitKnight(knight)) {
                collided = true;
                knight.c = 'red'; 
                knight.health -= 33;
                if (knight.health <= 0) {
                    delete knights[i];
                }

                setTimeout(() => {
                    knight.c = 'yellow'
                }, 500);
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
                collided = true;
                archer.c = 'red';
                archer.health -= 33;
                if (archer.health <= 0) {
                    delete archers[i];
                }
                setTimeout(() => {
                    archer.c = 'orange'
                }, 500);
            }
        });
        archers = archers.filter(item => item !== undefined);
        return collided;
    }

    tankCollision() {
        let self = this;
        let collided = false;
        tanks.forEach(function (tank, i) {
            if (self.hitTank(tank)) {
                collided = true;
                tank.c = 'red';
                tank.health -= 33;
                if (tank.health <= 0) {
                    delete tanks[i];
                }
                setTimeout(() => {
                    tank.c = 'red'
                }, 500);
            }
        });
        tanks = tanks.filter(item => item !== undefined);
        return collided;
    }
    mageCollision() {
        let self = this;
        let collided = false;
        mages.forEach(function (mage, i) {
            if (self.hitMage(mage)) {
                collided = true;
                mage.c = 'red';
                mage.health -= 33;
                if (mage.health <= 0) {
                    delete mages[i]; //deletes the adjcent mage
                }
                setTimeout(() => {
                    mage.c = 'purple'
                }, 500);
            }
        });
        mages = mages.filter(item => item !== undefined);
        return collided;
    }
}

class archerProjectile {
    constructor(x, y, w, h, c, xSpeed, direction) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.direction = direction;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
    movement() {
        this.x += this.xSpeed;
    }
    outOfbounds() {
        return this.x < 0 || this.x > canvas.width;
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
            if (collided == true && player.health > 0) {
                player.health -= 20 * difficultyPercentage;
            }
        }
        return collided;
    }
}


class mageInitial {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        canvasContext.fill();
    }

}

class mageProjectile {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.hit = false;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        canvasContext.fill();
    }

    //create a two circles, an inital point of impact and the actual projectile

    hitItem(item) {
        return (this.x + this.r > item.x && this.x < item.x + item.w) && (this.y + this.r > item.y && this.y < item.y + item.h);
    }
    hitPlayer(player) {
        return this.hitItem(player);
    }
    playerCollision() {
        let self = this;
        let collided = false;
        if (self.hitPlayer(player)) {
            collided = true;
            if (collided == true && this.hit == false) {
                player.health -= 25 * difficultyPercentage;
                this.hit = true;
            }
            // if (player.health <= 0) {
            //     console.log('workig')
            //     gameState = 'gameOver';
            // }
        }
        return collided;
    }
}