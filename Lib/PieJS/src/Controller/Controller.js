require('Lib/PieJS/src/Object.js');

var Pie = Pie || {};
var App = App || {};

Pie.Controller = Pie.Object.extend({
	/*runAction: function(action) {
		if (this[action] === undefined) {
			return {};
		}

		return this[action];
	}*/

	create: function() {
		var i, clone = this.clone();

		if (clone.models !== undefined) {
			for (i in clone.models) {
				if (clone.models.hasOwnProperty(i)) {
					if (App.Model[clone.models[i]] !== undefined) {
						clone[clone.models[i]] = App.Model[clone.models[i]].create();
					} else {
						clone[clone.models[i]] = Pie.Model.create({
							url: clone.models[i].toLowerCase()
						});
					}
				}
			}
		}

		return clone;
	}
});