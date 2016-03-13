var BrickSet = require('./brick-set');
var assign = require('lodash').assign;

function Figure (type, color) {
    var bricks = Figure.prototype.TYPES[type];
    var color = Figure.prototype.COLORS[color];

    BrickSet.call(this, bricks, color);
}

assign(Figure.prototype, BrickSet.prototype);

Figure.prototype.TYPES = [
    [
        [1],
        [1],
        [1],
        [1]
    ],

    [
        [1, 1],
        [1, 1]
    ],

    [
        [1, 0],
        [1, 1],
        [1, 0]
    ],

    [
        [0, 1],
        [1, 1],
        [1, 0]
    ],

    [
        [1, 0],
        [1, 1],
        [0, 1]
    ]
];

Figure.prototype.COLORS = [
    '#f00', '#0f0', '#00f'
];

module.exports = Figure;
