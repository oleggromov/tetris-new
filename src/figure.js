function Figure (type, color) {
    this._type = type;
    this._color = color;
    this._config = this.CONFIG[this.TYPES[type]];
}

Figure.prototype.TYPES = [
    'LINE', 'BOX', 'TRIANGLE', 'HOOK_LEFT', 'HOOK_RIGHT'
];

Figure.prototype.CONFIG = {
    LINE: [
        [1],
        [1],
        [1],
        [1]
    ],

    BOX: [
        [1, 1],
        [1, 1]
    ],

    TRIANGLE: [
        [1, 0],
        [1, 1],
        [1, 0]
    ],

    HOOK_LEFT: [
        [0, 1],
        [1, 1],
        [1, 0]
    ],

    HOOK_RIGHT: [
        [1, 0],
        [1, 1],
        [0, 1]
    ]
};

Figure.prototype.COLORS = [
    '#f00', '#0f0', '#00f'
];

module.exports = Figure;
