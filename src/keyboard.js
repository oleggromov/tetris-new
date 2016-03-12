var PubSub = require('true-pubsub');
var util = require('util');

module.exports = function (doc) {
	function Keyboard () {
		PubSub.call(this);
		doc.addEventListener('keyup', this.translate.bind(this));
	}

	util.inherits(Keyboard, PubSub);

	Keyboard.prototype._KEYS = {
		'32': 'pause', // space pressed
		'37': 'left', // left
		'38': 'rotate', // up
		'39': 'right', // right
		'40': 'down' // down
	};

	Keyboard.prototype.translate = function (e) {
		if (this._KEYS[e.keyCode]) {
			this.emit('press', this._KEYS[e.keyCode]);
		}
	};

	return Keyboard;
};
