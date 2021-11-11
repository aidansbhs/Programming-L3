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
        this.id = "knight";
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.y + 1.74 * this.x <= 605) { //y=mx+c for diagonal wall
            let rise = 1.74 / 2.74;
            let run = 1 / 2.74;
            this.y -= this.ySpeed * rise; //makes it able to 'slide' up the wall instead of stopping by calculating the rise and run and substituting into speed
            this.x += this.ySpeed * run;
        }

        if (this.y < yWall) { //can't go above the y wall
            this.y = yWall;
        }

        if (this.y + this.h > canvas.height) { //can't go below canvas height
            this.y = canvas.height - this.h;
        }

        if (kRandomActionSelect == 0) {
            this.randomLocation();
        } else if (kRandomActionSelect == 1) {
            this.attackPlayer();
        } else if (kRandomActionSelect == 2) {
            this.decoy();
        }
    }

    randomLocation() {
        var randomLocation = [];
        var runOnce = true;
        if(runOnce == true){
            randomLocation.push(((Math.random() * (canvas.width - 0)) + 0));
            randomLocation.push(((Math.random() * (yWall - 0)) + yWall));
            runOnce = false;
        }

        if(this.x >= randomLocation[0]){
            this.x -= this.xSpeed * difficultyPercentage;
        } else if(this.x <= randomLocation[0]){
            this.x += this.xSpeed * difficultyPercentage;
        }

        if(this.y >= randomLocation[1]){
            this.y -= this.ySpeed;
        } else if(this.x <= randomLocation[1]){
            this.y += this.ySpeed;
        }        
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

    decoy() {
        var decoyRun = false;
        var temp = false;
        var pathing = Math.floor(Math.random() * 2);

        if (temp == false) {

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
            if (this.xDistance() <= 0 && decoyRun == true) {
                temp = true;
            }

        }
        if (temp == true) {
            kRandomActionSelect = 1;
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
            //detects if player is inside knight's attack range
            inRange = true; //sets inRange to true
        }
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
        this.direction = 1;
        this.cooldown = 1;
        this.setup = true;
        this.id = "archer";
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.x > 1300) {
            this.x -= this.xSpeed * difficultyPercentage;
        }

        if (this.y < yWall) {
            this.y = yWall;
        }
    }
    shooting() {
        if (gameState == 'playing') {
            if (this.x < canvas.width - this.w) {
                if(this.cooldown == 1){
                    if (this.arrows.length < this.maxArrows) { //limits spamming arrows
                        this.arrows.push(new archerProjectile(this.x + this.w / 2, this.y + this.h / 2, 10, 10, "red", -7.5));
                        this.cooldown--;
                    }
                }
                setTimeout(() => {
                    if(this.cooldown == 0){
                        this.cooldown = 1;
                    }
                }, 1000);
                console.log(this.cooldown);
            }
        }
    }
}

class Tank {
    constructor(x = 0, y = 0, w = 70, h = 70, c = "red", xSpeed = 1, ySpeed = 0.5) {
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
    }
    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

    movement() {
        if (this.y + 1.74 * this.x <= 605) { //y=mx+c for diagonal wall
            let rise = 1.74 / 2.74;
            let run = 1 / 2.74;
            this.y -= this.ySpeed * rise; //makes it able to 'slide' up the wall instead of stopping by calculating the rise and run and substituting into speed
            this.x += this.ySpeed * run;
        }

        if (this.y < yWall) { //can't go above the y wall
            this.y = yWall;
        }

        if (this.y + this.h > canvas.height) { //can't go below canvas height
            this.y = canvas.height - this.h;
        }

        if (tRandomActionSelect == 0) {
            this.randomLocation();
        } else if (tRandomActionSelect == 1) {
            this.attackPlayer();
        } 
    }
    randomLocation(){
        var randomLocation = [];
        let runOnce = true;
        if(runOnce == true){
            randomLocation.push(((Math.random() * (canvas.width - 0)) + 0));
            randomLocation.push(((Math.random() * (yWall - 0)) + yWall));
            runOnce = false;
        }

        if(this.x >= randomLocation[0]){
            this.x -= this.xSpeed * difficultyPercentage;
        } else if(this.x <= randomLocation[0]){
            this.x += this.xSpeed * difficultyPercentage;
        }

        if(this.y >= randomLocation[1]){
            this.y -= this.ySpeed;
        } else if(this.x <= randomLocation[1]){
            this.y += this.ySpeed;
        }
    }
    attackPlayer(){
        this.x -= this.xSpeed * difficultyPercentage;

        if (this.x <= player.x) {
            this.xSpeed= 0;
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
        this.direction = 1;
        this.setup = true;
        this.counter = 0;
        this.cooldown = 3;
        this.inRange = false;
        this.id = "mage";
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
        if (this.distance() <= 600) {
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
        if (this.distance() > 600) {
            this.inRange = false;
            if (this.x > player.x + player.w) {
                this.xSpeed = 4 * difficultyPercentage;
            }
            if (this.x + this.w < player.x) {
                this.xSpeed = -4 * difficultyPercentage;
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