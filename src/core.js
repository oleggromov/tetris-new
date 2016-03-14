var Game = require('./game');
var CanvasRenderer = require('./canvas-renderer');

var WIDTH = 16;
var HEIGHT = 24;
var BRICK_SIZE = 20;

function core (win, doc) {
    var FrameController = require('./frame-contoller')(win);
    var Keyboard = require('./keyboard')(doc);

    function Core (domRoot) {
        this._game = new Game(WIDTH, HEIGHT);
        this._renderer = new CanvasRenderer(domRoot, doc, WIDTH, HEIGHT, BRICK_SIZE);

        this._input = new Keyboard();
        this._input.on('press', this.input.bind(this));

        this._frameController = new FrameController();
        this._frameController.on('frame', this.update.bind(this));
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
