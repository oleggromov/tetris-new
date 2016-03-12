var PubSub = require('true-pubsub');
var util = require('util');

module.exports = function (win) {
    function Fps (fps) {
        PubSub.call(this);

        this._interval = 1000 / fps;
        this._tick = this._tick.bind(this);
        this._last = Date.now();

        this._tick();
    }

    util.inherits(Fps, PubSub);

    Fps.prototype.destroy = function () {
        win.cancelAnimationFrame(this._requestId);
    };

    Fps.prototype._tick = function () {
        var now = Date.now();
        var delta = now - this._last;

        if (delta >= this._interval) {
            this.emit('frame', delta);
            this._last = now;
        }

        this._requestId = win.requestAnimationFrame(this._tick);
    };

    return Fps;
};
