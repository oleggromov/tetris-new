var FigureConfig = require('./config/figure');
var BrickSet = require('./brick-set');
var extend = require('extend');

function Figure (type, color) {
    var bricks = Figure.prototype.TYPES[type];
    var color = Figure.prototype.COLORS[color];

    BrickSet.call(this, bricks, color);
}

extend(Figure.prototype, FigureConfig);
extend(Figure.prototype, BrickSet.prototype);

module.exports = Figure;
