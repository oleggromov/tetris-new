function BrickSet (bricks, color) {
    this._bricks = bricks || [[]];

    if (color) {
        this._each(function (brick, x, y) {
            this._bricks[y][x] = color;
        });
    }
}

BrickSet.prototype.forEachBrick = function (fn, ctx) {
    this._each(function (brick, x, y) {
        fn.call(ctx, this.left + x, this.top + y, this._bricks[y][x]);
    });
};

BrickSet.prototype._each = function (fn) {
    var height = this._bricks.length;

    this._bricks.forEach(function (row, y) {
        row.forEach(function (brick, x) {
            if (brick) {
                fn.call(this, brick, x, y);
            }
        }, this);
    }, this);
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
