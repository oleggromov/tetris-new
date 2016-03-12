var PubSub = require('true-pubsub');
var util = require('util');

module.exports = function (win) {
    function Timer (interval) {
        PubSub.call(this);

        this._interval = interval;
        this._tick = this._tick.bind(this);
        this._last = Date.now();

        this._tick();
    }

    util.inherits(Timer, PubSub);

    Timer.prototype.destroy = function () {
        win.clearInterval(this._timer);
    };

    Timer.prototype._tick = function () {
        var now = Date.now();

        this.emit('tick', now - this._last);
        this._last = now;
        this._timer = win.setTimeout(this._tick, this._interval);
    };

    return Timer;
};
