var Figure = require('./figure');

function Factory () {
    this._next = new Figure;
}

Factory.prototype.getCurrent = function () {
    var current = this._next;
    this._next = new Figure;
    return current;
};

Factory.prototype.getNext = function () {
    return this._next;
};

module.exports = Factory;
