var Game = require('./game');
var CanvasRenderer = require('./canvas-renderer');

function core (win, doc) {
    var Fps = require('./fps')(win);
    var Keyboard = require('./keyboard')(doc);

    function Core (domRoot) {
        this._game = new Game(16, 24);
        this._renderer = new CanvasRenderer(domRoot, win, doc);

        this._input = new Keyboard();
        this._input.on('press', this.input.bind(this));

        this._fps = new Fps(80);
        this._fps.on('frame', this.update.bind(this));
    }

    Core.prototype.input = function (type) {
        if (type === 'pause') {
            console.warn(this._game.triggerPause());
        } else {
            this._game.performAction(type);
        }
    };

    Core.prototype.update = function (delta) {
        this._game.update(delta);
        this._renderer.draw(this._game.getObjects());
    };

    return Core;
}

module.exports = core;
