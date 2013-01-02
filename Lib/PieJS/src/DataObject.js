require('Lib/PieJS/src/Object.js');

var Pie = Pie || {};

Pie.DataObject = Pie.Object.extend({
	get: function(val) {
		val = 'data.' + val;

		return Pie.Object.get.call(this, val);
	}
});