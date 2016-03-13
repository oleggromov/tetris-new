var BrickSet = require('./brick-set');
var PubSub = require('true-pubsub');
var assign = require('lodash').assign;

function Well () {
    BrickSet.call(this);
    PubSub.call(this);
}

assign(Well.prototype, BrickSet.prototype, PubSub.prototype);

Well.prototype.append = function (figure) {
    this._check();
    console.warn(figure + ' appended');
};

Well.prototype._check = function () {
    if (true) {
        this.emit('line');
    }
};

module.exports = Well;
