class Knight {
    constructor(x = 0, y = 0, w = 40, h = 40, c = "yellow", xSpeed = 2.5, ySpeed = 1.5) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.direction = 1;
        this.setup = true;
        this.cooldown = 1;
        this.counter = 0;
        this.id = "knight";
        this.health = 100;
        this.inRange = false;
        this.rChoiceCoolDown = 2;
        this.rChoiceCoolDownCounter = 0;
        this.randomActionSelect = null;
        this.randomlocation = null;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.y < yWall) { //can't go above the y wall
            this.y = yWall;
        }

        if (this.y + this.h > canvas.height) { //can't go below canvas height
            this.y = canvas.height - this.h;
        }
        this.randomAction();
    }
    randomAction() {
        if (this.rChoiceCoolDownCounter >= this.rChoiceCoolDown) {
            this.randomActionSelect = randomMove(); //move charge attack

            if (this.randomActionSelect == "move") {
                this.randomlocation = this.getRandomLocation();
            } else if (this.randomActionSelect == "attack") {
                this.rChoiceCoolDown = 3;

            } else if (this.randomActionSelect == 'decoy') {
                this.rChoiceCoolDown = 0.5;
            }
            this.rChoiceCoolDownCounter = 0;
        } else {
            this.rChoiceCoolDownCounter += 1 / frameRate;
            if (this.randomActionSelect == "move") { //move
                this.moveToRandomLocation(this.randomlocation);
            } else if (this.randomActionSelect == "attack") { //attack
                this.moveToRandomLocation([player.x, player.y]);
                if (trigH(Math.abs((player.x + player.w / 2) - (this.x + this.w / 2)), Math.abs((player.y + player.h / 2) - (this.y + this.h / 2))) <= 40) {
                    this.rChoiceCoolDown = 0;
                }
            } else if (this.randomActionSelect == "decoy") { //decoy
                this.decoy();
            }
        }
    }

    moveToRandomLocation(pos) {
        if (this.x > pos[0]) {
            this.x -= this.xSpeed * difficultyPercentage;
        } else if (this.x < pos[0]) {
            this.x += this.xSpeed * difficultyPercentage;
        }
        if (this.y > pos[1]) {
            this.y -= this.ySpeed;
        } else if (this.y < pos[1]) {
            this.y += this.ySpeed;
        }
    }

    getRandomLocation() {
        let randomLocation = [];
        randomLocation.push(((Math.random() * (canvas.width - (canvas.width / 2.644628099173554))) + canvas.width / 2.644628099173554)); //x
        randomLocation.push(((Math.random() * (canvas.height - yWall)) + yWall)); //y
        if (randomLocation[0] > canvas.width - this.w) {
            randomLocation[0] = canvas.width - this.w;
        }
        if (randomLocation[1] > canvas.height - this.h) {
            randomLocation[1] = canvas.height - this.h;
        }
        let timex = Math.abs(JSON.parse(JSON.stringify(randomLocation[0])) - this.x) / (this.xSpeed * difficultyPercentage * frameRate);
        let timey = Math.abs(JSON.parse(JSON.stringify(randomLocation[1])) - this.y) / (this.ySpeed * frameRate);
        if (timex > timey) {
            this.rChoiceCoolDown = timex;
        } else {
            this.rChoiceCoolDown = timey;
        }
        return randomLocation;
    }

    decoy() {
        var decoyRun = false;
        var pathing = Math.floor(Math.random() * 2);


        if (decoyRun == false) { //has not performed the decoy run yet
            if (this.y == player.y) { //if knight y is equal to player's y
                if (pathing == 0) { //if randomised pathing equals to option 0
                    if (this.y >= player.y && this.y > 280) {
                        this.y += this.ySpeed; //go up
                    }
                } else if (pathing == 1) { //if randomised pathing equals to option 1
                    if (this.y <= player.y && this.y > 20) {
                        this.y -= this.ySpeed; //go down
                    }
                }
            }
            if (this.y > player.y) { //if knight y already greater than player y
                if (this.y >= player.y && this.y > 280) {
                    this.y += this.ySpeed; //keeping going up
                }
            } else if (this.y < player.y) { //if knight y is less than player y
                if (this.y <= player.y && this.y > 20) {
                    this.y -= this.ySpeed; //keep going down
                }
            }
            if (this.y <= yWall || this.y >= canvas.height - this.h) { //until these condtions
                decoyRun = true;
            }
        }

        if (this.xDistance() > 0 && decoyRun == true) {
            if (this.x <= player.x) {
                this.x += this.xSpeed * difficultyPercentage;
                this.direction = 1;
            }
            if (this.x >= player.x) {
                this.x -= this.xSpeed * difficultyPercentage;
                this.direction = -1;
            }
        }
    }

    xDistance() {
        let x = this.x - player.x;
        return Math.sqrt(x * x); //calculates x distance in betwen knight and player
    }

    yDistance() {
        let y = this.y - player.y;
        return Math.sqrt(y * y); //calculates y distance in between knight and player
    }

    attack() {
        var self = JSON.parse(JSON.stringify(this));
        if ((((self.x + self.w) + (self.w * self.direction)) > (player.x)) && (((self.x - self.w) + (self.w * self.direction)) < (player.x + player.w)) && ((self.y) < (player.y + player.h)) && ((self.y + self.h) > (player.y))) {
            //detects if player is inside knight's attack range
            this.inRange = true; //sets inRange to true
        } else {
            this.inRange = false;
        }
        if (this.counter < this.cooldown) {
            this.counter += 1 / frameRate;
        } else if (this.inRange == true && player.health > 0) {
            this.counter = 0;
            player.health -= 15;
        }
        if (player.health <= 0) {
            gameState = 'gameOver';
        }
    }
}

class Archer {
    constructor(x = 0, y = 0, w = 40, h = 40, c = "orange", xSpeed = 3, ySpeed = 2, maxArrows = 3) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.maxArrows = maxArrows;
        this.arrows = [];
        this.direction = -1;
        this.cooldown = 1;
        this.setup = true;
        this.id = "archer";
        this.health = 60 * difficultyPercentage;
        this.counter = 0;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.checkPast(tanks)) {
            if (this.x > 1300) {
                this.x -= this.xSpeed * difficultyPercentage;
            }
        }
        if (player.x >= this.x) {
            this.direction = -1;
        }
         if (player.x <= this.x) {
            this.direction = 1;
        }

        if (this.y < yWall) {
            this.y = yWall;
        }
    }

    checkPast(array) {
        //archers will not move unless all the tanks are passed a certain point on canvas
        let cc = true;
        array.forEach(tanks => { //for each knight
            if (tanks.x >= canvas.width / 5 * 3.75) { //if past certain point on canvas
                cc = false;
            }
        });
        return cc;
    }


    shooting() {
        if (gameState == 'playing') {
            if (this.x < canvas.width - this.w) {
                if (this.counter < this.cooldown) {
                    if (this.arrows.length < this.maxArrows) { //limits spamming arrows
                        this.arrows.push(new archerProjectile(this.x + this.w / 2, this.y + this.h / 2, 10, 10, "red", -7.5, JSON.parse(JSON.stringify(this.direction))));
                        this.counter = 0;
                    }
                }
            }
        }
    }
}

class Tank {
    constructor(x = 0, y = 0, w = 70, h = 70, c = "darkgrey", xSpeed = 1, ySpeed = 0.5) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.direction = 1;
        this.setup = true;
        this.id = "tank";
        this.health = 150 * difficultyPercentage;
        this.inRange = false;
        this.counter = 0;
        this.cooldown = 1;
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.y < yWall) { //can't go above the y wall
            this.y = yWall;
        }
        if (this.y + this.h > canvas.height) { //can't go below canvas height
            this.y = canvas.height - this.h;
        }
        this.attackPlayer();
    }

    attackPlayer() {
        if (this.x <= player.x) {
            this.x += this.xSpeed * difficultyPercentage;
            this.directon = 1;
        }

        if (this.x >= player.x) {
            this.x -= this.xSpeed * difficultyPercentage;
            this.directon = 0;
        }

        if (this.y <= player.y) {
            this.y += this.ySpeed;
        }
        if (this.y >= player.y) {
            this.y -= this.ySpeed;
        }
    }

    attack() {
        var self = JSON.parse(JSON.stringify(this));
        if ((((self.x + self.w / 1.5) + (self.w * self.direction)) > (player.x)) && (((self.x - self.w * 1.5) + (self.w * self.direction)) < (player.x + player.w)) && ((self.y) < (player.y + player.h)) && ((self.y + self.h) > (player.y))) {
            //detects if player is inside knight's attack range
            this.inRange = true; //sets inRange to true
        } else {
            this.inRange = false;
        }
        if (this.counter < this.cooldown) {
            this.counter += 1 / frameRate;
        } else if (this.inRange == true && player.health > 0) {
            this.counter = 0;
            player.health -= 10;
        }
        if (player.health <= 0) {
            gameState = 'gameOver';
        }
    }
}

class Mage {
    constructor(x = 0, y = 0, w = 40, h = 40, c = "purple", xSpeed = 2, ySpeed = 2, maxProjectiles = 1, maxInitialPs = 1) {
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
        this.direction = 1;
        this.setup = true;
        this.counter = 0;
        this.cooldown = 3;
        this.inRange = false;
        this.id = "mage";
        this.health = 100;
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
        if (this.distance() <= canvas.width / 2.6667) {
            this.inRange = true;
            this.xSpeed = 0;
        } else {
            if (this.x > player.x + player.w) {
                this.x -= this.xSpeed * difficultyPercentage; //both directions
                this.direction = 1;
            }
            if (this.x + this.w < player.x) {
                this.x += this.xSpeed * difficultyPercentage;
                this.direction = -1;
            }
        }
        if (this.distance() > canvas.width / 2.6667) {
            this.inRange = false;
            if (this.x > player.x + player.w) {
                this.xSpeed = 4 * difficultyPercentage;
            }
            if (this.x + this.w < player.x) {
                this.xSpeed = -4 * difficultyPercentage;
            }
        }

        if (difficulty == 'hard') {
            if (this.distance() <= canvas.width / 10.667 && teleported == false) {
                //disapear
                this.x = Math.floor(Math.random() * ((canvas.width - this.w) - (0) + (canvas.width - this.w)));
                teleported = true;
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