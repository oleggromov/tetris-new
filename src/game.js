var GameConfig = require('./config/game');
var FigureFactory = require('./figure-factory');
var Well = require('./well');
var assign = require('lodash').assign;

function Game (width, height) {
    this._level = 0;
    this._points = 0;
    this._width = width;
    this._height = height;
    this._well = new Well(width, height);
    this._paused = false;
    this._delta = 0;

    this._figures = new FigureFactory();
    this._changeFigure();

    this._direction = { left: 0, top: 1 };

    this._well.on('line', function () {
        console.warn('bingo!');
    });
};

assign(Game.prototype, GameConfig);

Game.prototype.update = function (delta) {
    if (this._paused) {
        return;
    }

    this._delta += delta;
    if (this._delta >= this._getSpeedDelta()) {
        if (this._checkCollisions()) {
            this._changeFigure();
        } else {
            this._active.set('top', this._active.get('top') + this._direction.top);
            this._active.set('left', this._active.get('left') + this._direction.left);
        }
        this._direction = { left: 0, top: 1 };
        this._delta = 0;
    }
};

Game.prototype.triggerPause = function () {
    return this._paused = !this._paused;
};

Game.prototype.performAction = function (type) {
    if (type === 'left') {
        this._direction.left = -1;
    }

    if (type === 'right') {
        this._direction.left = 1;
    }

    if (type === 'down') {
        this._direction.top = 2;
    }
};

Game.prototype.getObjects = function () {
    return [this._active, this._well];
};

Game.prototype._checkCollisions = function () {
    var collision = false;

    this._active.forEachBrick(function (left, top) {
        if (collision) {
            return;
        }

        var nextLeft = this._direction.left + left;
        var nextTop = this._direction.top + top;

        if (this._collidesWithWals(nextLeft, nextTop)) {
            return collision = true;
        } else if (this._collidesWithInactive(nextLeft, nextTop)) {
            return collision = true;
        }
    }, this);

    return collision;
};

Game.prototype._collidesWithWals = function (nextLeft, nextTop) {
    if (nextLeft < 0 || nextLeft >= this._width) {
        return true;
    }

    if (nextTop < 0 || nextTop >= this._height) {
        return true;
    }

    return false;
};

Game.prototype._collidesWithInactive = function (nextLeft, nextTop) {
    var collision = false;

    this._well.forEachBrick(function (left, top) {
        if (collision) {
            return;
        }

        if (nextLeft === left && nextTop === top) {
            return collision = true;
        }
    }, this);

    return collision;
};

Game.prototype._changeFigure = function () {
    if (this._active) {
        this._well.append(this._active);
    }

    this._active = this._figures.getNext();
    this._active.set('top', 0);
    this._active.set('left', Math.floor(this._width / 2) - 1);
};

Game.prototype._getSpeedDelta = function () {
    return 200;
    // return 1000 / this.LEVELS[this._level].speed;
};

module.exports = Game;
