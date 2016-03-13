var Figure = require('./figure');

function CanvasRenderer (domRoot, doc, width, height, brickSize) {
    this._brickSize = brickSize;
    this._width = width * brickSize;
    this._height = height * brickSize;

    this._doc = doc;
    this._root = doc.querySelector(domRoot);
    this._canvas = this._appendCanvas();
    this._ctx = this._canvas.getContext('2d');

    this.empty();
}

CanvasRenderer.prototype.draw = function (objects) {
    this.empty();
    objects.forEach(this._drawObject, this);
};

CanvasRenderer.prototype._drawObject = function (figure) {
    figure.forEachBrick(function (left, top, color) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(left * this._brickSize, top * this._brickSize, this._brickSize, this._brickSize);
    }, this);
};

CanvasRenderer.prototype.empty = function () {
    this._ctx.fillStyle = '#000';
    this._ctx.fillRect(0, 0, this._width, this._height);
};

CanvasRenderer.prototype._appendCanvas = function () {
    var canvas = this._doc.createElement('canvas');
    canvas.width = this._width;
    canvas.height = this._height;
    this._root.appendChild(canvas);

    return canvas;
};

module.exports = CanvasRenderer;
