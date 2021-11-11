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
                collided = true;
                knight.health -= 33;
                if(knight.health <= 0){
                    delete knights[i];
                }
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
                archer.health -= 33;
                if(archer.health <= 0){
                    delete archers[i];
                }
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
                tank.health -= 33;
                if(tank.health <= 0){
                    delete tanks[i];
                }
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
                collided = true;
                mage.health -= 33;
                if(mage.health <= 0){
                    delete mages[i];
                }
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
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        canvasContext.fill();
    }

    //create a two circles, an inital point of impact and the actual projectile
    //timer between those two circles, eg 1 second of charging up until fired
    //leave aoe fire mark that will continue to burn for 3-5 seconds

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
                player.health -= 30 * difficultyPercentage;
            }
        }
        return collided;
    }
}