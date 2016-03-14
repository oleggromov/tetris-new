function BrickSet (bricks, color) {
    this._bricks = bricks || [[]];

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
        fn.call(ctx, this.left + x, this.top + y, this._bricks[y][x]);
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

BrickSet.prototype._PUBLIC = ['left', 'top'];

BrickSet.prototype.set = function (prop, value) {

    if (this._PUBLIC.indexOf(prop) > -1) {
        this[prop] = value;
        return this;
    }
};

BrickSet.prototype.get = function (prop) {
    if (this._PUBLIC.indexOf(prop) > -1) {
        return this[prop];
    }
};

module.exports = BrickSet;
