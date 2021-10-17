    var levels = [
        [
            ['imgs/Background/background1.png', cutScenes],
            ['', cutScenes, ]
        ]
        // [[img, /*map*/ [img,x,y,w,h], /*cut scene*/ [[img,x,y,w,h] /*obstacles*/ ], [img,x,y,w,h,"type"] /*items*/ ], [knights[x,y,w,h,xSpeed, count], archers[x,y,w,h,xSpeed, count], tanks[x,y,w,h,xSpeed, count], mages[x,y,w,h,xSpeed, count]] /*enemies*/ ], //level 1
    ];

    for (let i = 0; i < levels.length; i++) {
        levels[i];
    }

    var currentLevel = 0;


    function cutScenes() {
        if(levels == [0]){
            console.log('hello');
        }
    }