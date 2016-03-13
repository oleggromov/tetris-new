var Figure = require('./figure');

function Factory () {
    this._upcoming = this._getRandom();
}

Factory.prototype.getNext = function () {
    var next = this._upcoming;
    this._upcoming = this._getRandom();
    return next;
};

Factory.prototype.getUpcoming = function () {
    return this._upcoming;
};

Factory.prototype._getRandom = function () {
    var type = Math.floor(Math.random() * Figure.prototype.TYPES.length);
    var color = Math.floor(Math.random() * Figure.prototype.COLORS.length);

    return new Figure(type, color);
};

module.exports = Factory;
