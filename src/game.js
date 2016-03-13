var FigureFactory = require('./figure-factory');
var Well = require('./well');

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

Game.prototype.update = function (delta) {
    if (this._paused) {
        return;
    }

    this._delta += delta;
    if (this._delta >= this._getSpeedDelta()) {
        if (this._checkCollisions()) {
            this._changeFigure();
        } else {
            this._active.setTop(this._active.getTop() + this._direction.top);
            this._active.setLeft(this._active.getLeft() + this._direction.left);
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
    this._active.setTop(0);
    this._active.setLeft(Math.floor(this._width / 2) - 1);
};

Game.prototype._getSpeedDelta = function () {
    return 200;
    // return 1000 / this.LEVELS[this._level].speed;
};

Game.prototype.LEVELS = [
    {
        speed: 1,
        next: 50,
        scoreUp: 10,
        multiLine: 1
    },
    {
        speed: 1.111,
        next: 200,
        scoreUp: 20,
        multiLine: 1.2
    },
    {
        speed: 1.25,
        next: 1000,
        scoreUp: 30,
        multiLine: 1.5
    },
    {
        speed: 1.429,
        next: 5000,
        scoreUp: 40,
        multiLine: 2
    },
    {
        speed: 1.667,
        next: 15000,
        scoreUp: 50,
        multiLine: 3
    },
    {
        speed: 2,
        next: 35000,
        scoreUp: 80,
        multiLine: 4
    },
    {
        speed: 2.5,
        next: 70000,
        scoreUp: 100,
        multiLine: 5
    }
];

module.exports = Game;
