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
    hitMage(mage){
        return this.hitItem(mage);
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

    tankCollision() {
        let self = this;
        let collided = false;
        tanks.forEach(function (tank, i) {
            if (self.hitTank(tank)) {
                delete tanks[i];
                collided = true;
            }
        });
        tanks = tanks.filter(item => item !== undefined);
        return collided;
    }
    mageCollision(){
        let self = this;
        let collided = false;
        mages.forEach(function (mage, i) {
            if (self.hitMage(mage)) {
                delete mages[i];
                collided = true;
            }
        });
        mages = mages.filter(item => item !== undefined);
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

class mageProjectile {
    constructor(x = 0, y = 0, r = 50, c = "pink", timer = 3) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.timer = timer;
    }
    drawRect() {
        canvasContext.fillStyle = this.rgb;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        canvasContext.fill();
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
            }
            if (health <= 0) {
                // gameState = 'gameOver';
            }
        }
        return collided;
    }
}