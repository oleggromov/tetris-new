var FigureConfig = require('./config/figure');
var BrickSet = require('./brick-set');
var assign = require('lodash').assign;

function Figure (type, color) {
    var bricks = Figure.prototype.TYPES[type];
    var color = Figure.prototype.COLORS[color];

    BrickSet.call(this, bricks, color);
}

assign(Figure.prototype, FigureConfig);
assign(Figure.prototype, BrickSet.prototype);

module.exports = Figure;
