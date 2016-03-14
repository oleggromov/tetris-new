var PubSub = require('true-pubsub');
var extend = require('extend');

module.exports = function (doc) {
	function Keyboard () {
		PubSub.call(this);
		this._translate = this._translate.bind(this);
		doc.addEventListener('keydown', this._translate);
	}

	extend(Keyboard.prototype, PubSub.prototype);

	Keyboard.prototype.destroy = function () {
		doc.removeEventListener('keydown', this._translate);
	};

	Keyboard.prototype._KEYS = {
		'32': 'pause', // space pressed
		'37': 'left', // left
		'38': 'rotate', // up
		'39': 'right', // right
		'40': 'down' // down
	};

	Keyboard.prototype._translate = function (e) {
		if (this._KEYS[e.keyCode]) {
			this.emit('press', this._KEYS[e.keyCode]);
		}
	};

	return Keyboard;
};
