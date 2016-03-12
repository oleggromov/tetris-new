var pubsub = require('true-pubsub');

function core (win, doc) {
    var Keyboard = require('./keyboard')(doc);

    function Game () {
        this._keyboard = new Keyboard();
        this._keyboard.on('press', this.processKey.bind(this));
    }

    Game.prototype.processKey = function (type) {
        win.console.log(type);
    };

    return Game;
}

module.exports = core;
