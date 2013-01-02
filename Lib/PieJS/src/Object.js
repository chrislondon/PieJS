require('Lib/PieJS/src/Pie.js');

var Pie = Pie || {};

Pie.Object = {
	clone: function() {
		// TODO Should we deep flag?
		return $.extend({}, this);
	},

	extend: function(options) {
		// TODO Should we deep flag?
		return $.extend({}, this, options);

	},

	create: function() {
		return this.clone();
	},

	get: function(key) {
		var i = 0, max, test;
		key = key.split('.');

		test = this;

		for (max = key.length; i < max; i++) {
			if (test[key[i]] === undefined) {
				return undefined;
			}

			test = test[key[i]];
		}

		return test;
	},

	set: function(key, val) {
		var i = 0, max, test;
		key = key.split('.');

		test = this;

		for (max = key.length - 1; i < max; i++) {
			if (test[key[i]] === undefined) {
				return;
			}

			test = test[key[i]];
		}

		test[key[i]] = val;
	}
};

$.extend(Pie, Pie.Object);