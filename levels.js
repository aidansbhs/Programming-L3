var levels = [
    [ //level 1
        ['imgs/Background/background1.png', cutScenes()], //background
        [''], //obstacles
        [''], //items
        [[[400, 600], "k"], [[400, 400], "k"], [[1200, 600], "k"], [[1200, 400], "k"]] //enemies
    ],
    [ //level 2
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        ['health'],
        [[[1200, 450], "t"], [[1400, 600], "a"], [[1400, 300], "a"]]
    ],
    [ //level 3
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        [''],
        [[[1100, 300], "k"], [[1300, 400], "m"], [[1300, 200], "m"]]
    ],
    [ //level 4
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        [''],
        [[[1700, 725], "a"], [[1700, 625], "a"], [[1700, 525], "a"], [[1700, 425], "a"], [[1700, 325], "a"]]
    ]
];

var levelCounter = 0;
var currentLevel;

function knightPush(x, y) {
    knights.push(new Knight(x,y));
} //end of knightPush

function archerPush(x, y) {
    archers.push(new Archer(x, y));
} //end of archerPush

function tankPush(x, y) {
    tanks.push(new Tank(x, y));
} //end of tankPush

function magePush(x, y) {
    mages.push(new Mage(x, y));
} //end of magePush


function cutScenes() {}