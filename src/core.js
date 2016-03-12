var FigureFactory = require('./figure-factory.js');

function core (win, doc) {
    var Timer = require('./timer')(win);
    var Keyboard = require('./keyboard')(doc);

    function Game () {
        this._keyboard = new Keyboard();
        this._keyboard.on('press', this.processKey.bind(this));

        this._timer = new Timer(1000);
        this._timer.on('tick', this.showTick.bind(this));
    }

    Game.prototype.processKey = function (type) {
        win.console.log(type);
    };

    Game.prototype.showTick = function (delta) {
        win.console.log(delta);
    };

    return Game;
}

module.exports = core;
