class Knight {
    constructor(x = 0, y = 0, w = 40, h = 40, c = "yellow", xSpeed = 3, ySpeed = 3) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.direction = 1;
        this.setup = true;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.length <= 2) {
            if (this.x <= player.x) {
                this.x += this.xSpeed;
                this.directon = 1;
            }

            if (this.x >= player.x) {
                this.x -= this.xSpeed;
                this.directon = 0;
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
        } else {

            var randomActionSelect = Math.floor(Math.random() * 3);

            if (randomActionSelect == 0) {
                this.randomLocation();
            } else if (randomActionSelect == 1) {
                this.attackPlayer();
            } else if (randomActionSelect == 2) {
                this.decoy();
            }
        }
    }

    randomLocation(x,y,radius) {
        var randomLocation = [];
        randomLocation.push(x+((Math.random() * radius * 2) + radius));
        randomLocation.push(y+((Math.random() * radius * 2) + radius));
    }

    attackPlayer() {
        if (this.x <= player.x) {
            this.x += this.xSpeed;
            this.directon = 1;
        }

        if (this.x >= player.x) {
            this.x -= this.xSpeed;
            this.directon = 0;
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

    decoy() {
        console.log('decoy');
    }




    distance() {
        let y = this.y - player.y;
        let x = this.x - player.x;

        return Math.sqrt(x * x + y * y); //calculates distance between mage and player
    }

    dodge() {
        if (inRange == true && xKeyPressed == true) {
            Math.random(Math.floor() * (100 - 3) + 3); //3% chance to dodge attacks
        }
    }

    attack() {
        var self = this;
        var inRange = false;
        var attacked = false;
        if ((((self.x + self.w) + (self.w * self.direction)) > (player.x)) && (((self.x - self.w) + (self.w * self.direction)) < (player.x + player.w)) && ((self.y) < (player.y + player.h)) && ((self.y + self.h) > (player.y))) {
            inRange = true;
        }
        // console.log(inRange);

        while (inRange == true) {
            if (attacked == false) {
                setTimeout(() => {
                    if (player.health > 0) {
                        player.health -= 10;
                    }
                }, 500);
            }
            attacked = true;
            inRange = false;
        }
        // console.log(attacked);
    }
}

class Archer {
    constructor(x, y, w, h, c, xSpeed, ySpeed, maxArrows = 3) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.maxArrows = maxArrows;
        this.arrows = [];
        this.directon = 1;
        this.setup = true;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.setup) { //start pos
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
        }

        if (this.x > 1200) {
            this.x -= this.xSpeed;
        }

        if (this.y < yWall) {
            this.y = yWall;
        }
    }
    shooting() {
        if (gameState == 'playing') {
            if (this.x < canvas.width - this.w) {
                if (this.arrows.length < this.maxArrows) { //limits spamming arrows
                    this.arrows.push(new archerProjectile(this.x + this.w / 2, this.y + this.h / 2, 10, 10, "red", -7.5));
                }
            }
        }
    }
}

class Tank {
    constructor(x, y, w, h, c, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.directon = 1;
        this.setup = true;

    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.setup) {
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
        }

        this.x -= this.xSpeed

        if (this.x <= player.x) {
            this.xSpeed = 0;
        }
    }
}

class Mage {
    constructor(x, y, w, h, c, xSpeed, ySpeed, maxProjectiles = 1, maxInitialPs = 1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.initialPs = [];
        this.maxInitialPs = maxInitialPs;
        this.maxProjectiles = maxProjectiles;
        this.projectiles = [];
        this.directon = 1;
        this.setup = true;
        this.counter = 0;
        this.cooldown = 3;
        this.inRange = false;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    distance() {
        let y = this.y - player.y;
        let x = this.x - player.x;

        return Math.sqrt(x * x + y * y); //calculates distance between mage and player
    }

    movement() {
        if (this.setup) {
            this.x = canvas.width - this.w;
            this.y = Math.floor(Math.random() * (yWall - 0) + yWall);
            this.setup = false;
        }

        if (this.distance() <= 600) {
            this.inRange = true;
            this.xSpeed = 0;
        } else {
            if (this.x > player.x + player.w) {
                this.x -= this.xSpeed; //both directions
            }
            if (this.x + this.w < player.x) {
                this.x += this.xSpeed;
            }
        }
        if (this.distance() > 600) {
            this.inRange = false;
            if (this.x > player.x + player.w) {
                this.xSpeed = 4;
            }
            if (this.x + this.w < player.x) {
                this.xSpeed = -4;
            }
        }

        if (difficulty == 'hard') {
            if (this.distance() <= 150 && teleported == false) {
                //disapear
                teleported = true;
                //wait 0.5 seconds
                this.x = Math.floor(Math.random() * ((canvas.width - this.w) - (0) + (canvas.width - this.w)));
                //reapear
            }
        }


    }
    shooting() {
        if (gameState = 'playing') {
            if (this.x < canvas.width - this.w) { //inside canvas
                if (this.inRange == true && this.cooldown == 3) {
                    if (this.initialPs.length < this.maxInitialPs) {
                        this.initialPs.push(new mageInitial(player.x, player.y, 50, "white"));
                    }
                    this.cooldown--;
                    if (this.counter < this.maxProjectiles) { //limits spamming
                        this.counter++;
                        setTimeout(() => {
                            this.projectiles.push(new mageProjectile(this.initialPs[this.initialPs.length - 1].x, this.initialPs[this.initialPs.length - 1].y, 50, "red"));
                            this.initialPs = [];
                            this.counter--;
                        }, 800); //shoots to the initial circles coordinates after delay

                        setTimeout(() => {
                            delete this.projectiles;
                            this.projectiles = mageProjectiles.filter(item => item !== undefined);

                        }, 3000);

                        setTimeout(() => {
                            this.cooldown = 3;
                        }, 2500);
                    }
                }
            }
        }
    }
}