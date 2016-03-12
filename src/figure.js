function Figure (type) {
    if (!type) {
        type = Math.round(Math.random() * this.TYPES.length - 1);
    }

    this._type = type;
}

Figure.prototype.TYPES = [
    'LINE', 'BOX', 'TRIANGLE', 'HOOK_1', 'HOOK_2'
];

module.exports = Figure;
