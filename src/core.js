var FigureFactory = require('./figure-factory.js');

function core (win, doc) {
    var Fps = require('./fps')(win);
    var Keyboard = require('./keyboard')(doc);

    function Game () {
        this._keyboard = new Keyboard();
        this._keyboard.on('press', this.processKey.bind(this));

        this._fps = new Fps(80);
        this._fps.on('frame', this.processFrame.bind(this));
    }

    Game.prototype.processKey = function (type) {
        win.console.log(type);
    };

    Game.prototype.processFrame = function (delta) {
        win.console.log(delta);
    };

    return Game;
}

module.exports = core;
