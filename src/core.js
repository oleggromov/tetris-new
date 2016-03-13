var FigureFactory = require('./figure-factory');
var CanvasRenderer = require('./canvas-renderer');

function core (win, doc) {
    var Fps = require('./fps')(win);
    var Keyboard = require('./keyboard')(doc);

    function Game (domRoot) {
        this._figures = new FigureFactory();
        this._renderer = new CanvasRenderer(domRoot, win, doc);

        this._input = new Keyboard();
        this._fps = new Fps(80);

        this._test = [this._figures.getCurrent(), this._figures.getNext()];
        this._test[0].setLeft(0).setTop(0);
        this._test[1].setLeft(5).setTop(5);

        this._input.on('press', this.input.bind(this));
        this._fps.on('frame', this.update.bind(this));
    }

    Game.prototype.input = function (type) {
        if (type === 'left') {
            this._test[0].setLeft(this._test[0].getLeft() - 1);
        }

        if (type === 'right') {
            this._test[0].setLeft(this._test[0].getLeft() + 1);
        }

        if (type === 'down') {
            this._test[0].setTop(this._test[0].getTop() + 1);
        }

        // if (type === 'down') {
        //     this._test[0].setTop(this._test[0].getTop() + 1);
        // }
    };

    Game.prototype.update = function (deltaTime) {
        this._renderer.draw(this._test);
    };

    return Game;
}

module.exports = core;
