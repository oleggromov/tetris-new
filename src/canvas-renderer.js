var Figure = require('./figure');

function CanvasRenderer (domRoot, win, doc) {
    this._width = 320;
    this._height = 480;

    this._root = document.querySelector(domRoot);
    this._canvas = this._appendCanvas();
    this._ctx = this._canvas.getContext('2d');

    this.empty();

    this._brickSize = 20;
}

CanvasRenderer.prototype.draw = function (objects) {
    this.empty();
    objects.forEach(this._drawObject, this);
};

CanvasRenderer.prototype._drawObject = function (figure) {
    var color = figure.getColor();
    figure.forEachBrick(function (left, top) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(left * this._brickSize, top * this._brickSize, this._brickSize, this._brickSize);
    }, this);
};

CanvasRenderer.prototype.empty = function () {
    this._ctx.fillStyle = '#000';
    this._ctx.fillRect(0, 0, this._width, this._height);
};

CanvasRenderer.prototype._appendCanvas = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this._width;
    canvas.height = this._height;
    this._root.appendChild(canvas);

    return canvas;
};

module.exports = CanvasRenderer;
