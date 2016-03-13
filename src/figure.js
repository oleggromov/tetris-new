function Figure (type, color) {
    this._type = type;
    this._color = color;
    this._config = this.CONFIG[this.TYPES[type]];
}

Figure.prototype.forEachBrick = function (fn, ctx) {
    ctx = ctx || undefined;
    for (var y = 0; y < this._config.length; y++) {
        for (var x = 0; x < this._config[y].length; x++) {
            if (this._config[y][x] === 1) {
                fn.call(ctx, this._left + x, this._top + y);
            }
        }
    }
};

Figure.prototype.setLeft = function (left) {
    this._left = left;
    return this;
};

Figure.prototype.setTop = function (top) {
    this._top = top;
    return this;
};

Figure.prototype.getLeft = function () {
    return this._left;
};

Figure.prototype.getTop = function () {
    return this._top;
};

Figure.prototype.getConfig = function () {
    return this._config;
};

Figure.prototype.getColor = function () {
    return this.COLORS[this._color];
};

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
