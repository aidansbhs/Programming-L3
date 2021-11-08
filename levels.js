var levels = [
    [ //level 1
        ['imgs/Background/background1.png', cutScenes()], //background
        [''], //obstacles
        [''], //items
        [knightPush(400, 600), knightPush(400, 400), knightPush(1200, 600), knightPush(1200, 400)] //enemies

    ],
    [ //level 2
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        ['health'],
        [tankPush(1200, 400), archerPush(1400, 600), archerPush(1400, 200)]
    ],
    // [ //level 3
    //     ['imgs/Background/background1.png', cutScenes()],
    //     [''],
    //     [''],
    //     [knightPush(1100, 300), magePush(1300, 400), magePush(1300, 200)]
    // ]
];

function knightPush(x, y) {
    knights.push(new Knight(x, y));
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

console.log(levels);

var currentLevel;

function cutScenes() {
    if (levels == 0) {
        console.log('hello');
    }
}
