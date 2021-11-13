var levels = [
    [ //level 1
        ['imgs/Background/background1.png', cutScenes()], //background
        [''], //obstacles
        [''], //items
        [[[cW * 20, cH * 30], "k"], [[cW * 20, cH * 20], "k"], [[cW * 60, cH * 30], "k"], [[cW * 60, cH * 20], "k"]], //enemies
        [2.5]
    ],
    [ //level 2
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        ['health'],
        [[[cW * 60, cW * 22.5], "t"], [[cW * 70, cH * 20], "a"], [[cW * 70, cH * 30], "a"]],
        [4]
    ],
    [ //level 3
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        [''],
        [[[cW * 55, cH * 25], "k"], [[cW * 65, cH * 30], "m"], [[cW * 65, cH * 20], "m"]],
        [4]
    ],
    [ //level 4
        ['imgs/Background/background1.png', cutScenes()],
        [''],
        [''],
        [[[cW * 85, cH * 36.25], "a"], [[cW * 85, cH * 31.25], "a"], [[cW * 85, cH * 26.25], "a"], [[cW * 85, cH * 21.25], "a"], [[cW * 85, cH * 16.25], "a"]],
        [4]
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


function cutScenes() {

}