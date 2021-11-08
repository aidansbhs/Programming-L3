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
        this.direction = 0;
        this.setup = true;
        this.health = 100;
    }

    drawRect() {
        canvasContext.fillStyle = this.c;
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
        canvasContext.fillStyle = 'grey';
        canvasContext.fillRect(this.x + this.w / 2, this.y, this.w * this.direction / 2, this.h);
    }

    movement() {
        if (levels = [0]) {
            if (this.setup == true) {
                this.x = canvas.width / 2;
                this.y = canvas.height / 1.5;
                this.setup = false;
            }
            if (levels = [1]) {
                if (this.setup == true) {

                }
            }
        }


        if (aKeyPressed == true) {
            this.direction = -1;
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
            this.direction = 1;
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

    hitItem(array, name) {
        let counter = [];
        let self = this;
        array.forEach(function (item, i) {
            if ((self.x + self.w > item.x && self.x < item.x + item.w) && (self.y + self.h > item.y && self.y < item.y + item.h)) {
                counter.push(i);
            }
        });
        return [name, counter]
    }
  
    hitItem(item) {
        return (this.x + this.w > item.x && this.x < item.x + item.w) && (this.y + this.h > item.y && this.y < item.y + item.h);
    }

    collision() {
        let enemy0 = this.hitItem(knights, "knights");
        let enemy1 = this.hitItem(archers, "archers");
        let enemy2 = this.hitItem(tanks, "tanks");
        let enemy3 = this.hitItem(mages, "mages");

        var collided = false;

        for (let i = 0; i < 4; i++) {
            for (let ii = 0; ii < eval("enemy" + i)[1].length; ii++) {
                collided = true;
            }
        }
        if(collided == true){
            
        }
        // console.log(collided);
        return collided;
    }

    attackRange(array,name) {
        let counter = [];
        let self = this;
        array.forEach(function(item, i){
            if ((((self.x + self.w * 2) + (self.w / 2 * self.direction)) > (item.x)) && (((self.x - self.w) + (self.w * self.direction)) < (item.x + item.w)) && ((self.y) < (item.y + item.h)) && ((self.y + self.h) > (item.y))) {
                counter.push(i);
            }
        });
        return [name, counter];
    }

    attacking() {
        if(xKeyPressed == true){
            var enemy0 = this.attackRange(knights, "knights"); //returns knights inside of the attackRange hitbox ["knights,[(hit people)]"]
            var enemy1 = this.attackRange(archers, "archers");
            var enemy2 = this.attackRange(tanks, "tanks");
            var enemy3 = this.attackRange(mages, "mages");
            for (let i = 0; i < 4; i++) {
                let run = false;
                for (let ii = 0; ii < eval("enemy" + i)[1].length; ii++) { //runs through all the hit enemys inside attackRange
                    eval(eval("enemy" + i)[0])[eval("enemy" + i)[1][ii]] = "undefined"; //turns hit enemy to undifined - eval converts enemy variable name "knights" into the actually variable called knights 
                    run = true;
                }
                if(run){
                    window[eval("enemy" + i)[0]] = eval(eval("enemy" + i)[0]).filter(item => item !== "undefined"); //filters undifinded enemy from array and window will find the private variable no matter what
                }
            }
        }
    }

    shooting() {
        if (this.arrows.length < this.maxArrows) { //limits spamming arrows
            this.arrows.push(new playerProjectile(this.x + this.w / 2, this.y + this.h / 2, 10, 10, 'white', 7.5, JSON.parse(JSON.stringify(this.direction))));
        }
    }

    gameOver() {
        canvasContext.font = '100px serif';
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Game Over', canvas.width / 2.7, canvas.height / 1.5);
    }
}