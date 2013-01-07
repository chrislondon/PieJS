require('Lib/PieJS/src/Pie.js');

var Pie = Pie || {};

Pie.Object = {
	_metamorphs: {},
	
	clone: function(options) {
		if (options === undefined) {
			options = {};
		}

		return $.extend({}, this, options);
	},

	extend: function(options) {
		// TODO Should we deep flag?
		return $.extend({}, this, options);

	},

	create: function(options) {
		return this.clone(options);
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
		var i = 0, metamorph, max, test;

		if (typeof key === 'object') {
			for (i in key) {
				if (key.hasOwnProperty(i)) {
					this.set(i, key[i]);
				}
			}
			
			return;
		}

		key = key.split('.');

		test = this;

		for (max = key.length - 1; i < max; i++) {
			if (test[key[i]] === undefined) {
				return;
			}

			test = test[key[i]];
		}

		test[key[i]] = val;

		if (test._metamorphs !== undefined && test._metamorphs[key[i]] !== undefined) {
			metamorph = test._metamorphs[key[i]];
			for (i in metamorph) {
				if (metamorph.hasOwnProperty(i)) {
					// TODO Maybe don't set HTML directly. Event trigger sounds like a good idea.
					metamorph[i].html(val);
				}
			}
		}
	},

	// TODO Maybe take this metamorph stuff out of the object and put it into a view object instead
	addMetamorph: function(key, metamorph) {
		if (this._metamorphs[key] === undefined) {
			this._metamorphs[key] = [];
		}

		this._metamorphs[key].push(metamorph);
	}
};

$.extend(Pie, Pie.Object);