require('Lib/PieJS/src/Object.js');
require('Lib/PieJS/src/Controller.js');

var Pie = Pie || {};

Pie.Application = Pie.Object.extend({
	Config: {},
	Model: {},
	Controller: {
		Errors: Pie.Controller.extend({
			404: function() {}
		})
	},
	
	options: {
		appFolder: '/App',
		libFolder: '/Lib/PieJS'
	},

	init: function(options) {
		console.log('Initializing App');
		this.options = $.extend(this.options, options);

		console.log('Initializing LayoutManager');
		this.layoutManager = Pie.LayoutManager.create();
		this.layoutManager.init();

		console.log('Initializing Router');
		this.router = Pie.Router.create(this.get('Config.Routes'));

		this.router.route();
	}
});