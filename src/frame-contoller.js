var PubSub = require('true-pubsub');
var assign = require('lodash').assign;

module.exports = function (win) {
    function FrameController () {
        PubSub.call(this);

        this._tick = this._tick.bind(this);
        this._last = Date.now();

        this._tick();
    }

    assign(FrameController.prototype, PubSub.prototype);

    FrameController.prototype.destroy = function () {
        win.cancelAnimationFrame(this._requestId);
    };

    FrameController.prototype._tick = function () {
        var now = Date.now();
        this.emit('frame', now - this._last);
        this._last = now;

        this._requestId = win.requestAnimationFrame(this._tick);
    };

    return FrameController;
};
