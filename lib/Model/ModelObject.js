require('lib/Object.js');

var Pie = Pie || {};

Pie.ModelObject = Pie.Object.extend({
	didLoad: false,
	didError: false,
	didSuccess: false,

	error: undefined,
	data: undefined
});