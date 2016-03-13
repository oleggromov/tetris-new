var Figure = require('./figure');

function Factory () {
    this._next = this._getRandom();
}

Factory.prototype.getCurrent = function () {
    var current = this._next;
    this._next = this._getRandom();
    return current;
};

Factory.prototype.getNext = function () {
    return this._next;
};

Factory.prototype._getRandom = function () {
    var type = Math.floor(Math.random() * Figure.prototype.TYPES.length);
    var color = Math.floor(Math.random() * Figure.prototype.COLORS.length);

    return new Figure(type, color);
};

module.exports = Factory;
