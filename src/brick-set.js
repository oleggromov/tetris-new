function BrickSet (bricks, color) {
    this._bricks = bricks;

    if (color) {
        this._each(function (brick, y, x) {
            if (brick === 1) {
                this._bricks[y][x] = color;
            }
        });
    }
}

BrickSet.prototype.forEachBrick = function (fn, ctx) {
    ctx = ctx || undefined;

    this._each(function (brick, y, x) {
        fn.call(ctx, this._left + x, this._top + y, this._bricks[y][x]);
    });
};

BrickSet.prototype._each = function (fn) {
    var height = this._bricks.length;

    for (var y = 0; y < height; y++) {
        var width = this._bricks[y].length;
        for (var x = 0; x < width; x++) {
            if (this._bricks[y][x]) {
                fn.call(this, this._bricks[y][x], y, x);
            }
        }
    }
};

BrickSet.prototype.setLeft = function (left) {
    this._left = left;
    return this;
};

BrickSet.prototype.setTop = function (top) {
    this._top = top;
    return this;
};

BrickSet.prototype.getLeft = function () {
    return this._left;
};

BrickSet.prototype.getTop = function () {
    return this._top;
};

module.exports = BrickSet;
