var BrickSet = require('./brick-set');
var PubSub = require('true-pubsub');
var inherits = require('util').inherits;

function Well () {
    BrickSet.call(this);
    PubSub.call(this);
}

inherits(Well, BrickSet);
// inherits(PubSub, BrickSet);

Well.prototype.append = function (figure) {
    console.warn(figure + ' appended');
};

Well.prototype._check = function () {
    if (true) {
        // this.emit('line');
    }
};

module.exports = Well;
