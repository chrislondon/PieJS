var Pie = {};



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



var Pie = Pie || {};

Pie.Application = Pie.Object.extend({
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



var Pie = Pie || {};

Pie.Controller = Pie.Object.extend({

});



var Pie = Pie || {};

Pie.DataObject = Pie.Object.extend({
	get: function(val) {
		val = 'data.' + val;

		return Pie.Object.get.call(this, val);
	}
});

var Pie = Pie || {};

Pie.LayoutManager = Pie.Object.extend({
	layouts: {},

	init: function() {
		this.loadLayout('default');
	},

	loadLayout: function(layout, target) {
		var self = this;

		if (this.layouts[layout] !== undefined) {
			this.renderLayout(layout, target);
			return;
		}

		$.get('/App/View/Layouts/' + layout + '.html').success(function(resp) {
			// We have the view
			self.compileLayout(resp, layout, target);
		}).error(function() {
			// We don't have the view so load the PieJS version
			$.get('/Lib/PieJS/src/View/Layouts/' + layout + '.html').success(function(resp) {
				// We have the view
				self.compileLayout(resp, layout, target);
			}).error(function() {
				// We don't have the view something went horribly wrong
				console.log("Couldn't find view");
			});
		});
	},

	compileLayout: function(html, layout, target) {
		this.set('layouts.' + layout, Handlebars.compile(html));
		this.renderLayout(layout, target);
	},

	renderLayout: function(layout, target) {
		$('body').append(this.layouts[layout]());
	}
});



var Pie = Pie || {};

Pie.Route = Pie.DataObject.extend({
	data: {},

	defaultParts: {
		prefix: undefined,
		controller: undefined,
		action: 'index',
		args: []
	},

	create: function(parts) {
		var self =  this.clone();

		if (typeof parts === 'string') {
			parts = this.parseUrl(parts);
		}

		$.extend(self.data, self.defaultParts, parts);

		return self;
	},

	parseUrl: function(url) {
		var i = 0, max, parts = {};

		// Remove leading and trailing slashes
		url = url.replace(/^\/|\/$/g, '').split('/');

		if (url[0] === '') {
			// Unparseable... no controller
			return {};
		}

		for (max = url.length; i < max; i++) {
			if (i === 0) {
				parts.controller = url[0].capitalize();
			} else if (i === 1) {
				parts.action = url[1];
			} else {
				if (parts.args === undefined) {
					parts.args = [];
				}

				parts.args.push(url[i]);
			}
		}

		return parts;
	}
});



var Pie = Pie || {};

Pie.Router = Pie.Object.extend({
	lastRoute: null,
	definedRoutes: [],
	defaultParts: {action: 'index'},

	create: function(config) {
		var i, self = this.clone();

		if (config !== undefined) {
			for (i in config) {
				if (config.hasOwnProperty(i)) {
					self.definedRoutes.push(Pie.Route.create(config[i]));
				}
			}
		}


		if (window.onhashchange !== undefined && !($.browser.msie)) {
			window.onhashchange = function () {
				self.hashChange();
			};
		} else {
			// IE workaround. Poll the hash every 1/10th second
			// TODO is this too much/often?
			window.setInterval(function () {
				self.hashChange();
			}, 100);
		}

		return self;
	},

	getUrl: function() {
		return window.location.hash.substr(1);
	},

	route: function(url) {
		var i, route = false, appRoutes;

		if (url === undefined) {
			url = this.getUrl();
		}

		if (!url) {
			url = '/';
		}
			
		// Check our config routes
		for (i in this.definedRoutes) {
			if (this.definedRoutes.hasOwnProperty(i) && this.definedRoutes[i].get('url') === url) {
				route = this.definedRoutes[i];
				break;
			}
		}

		if (!route) {
			// If no config routes try and parse url
			route = Pie.Route.create(url);
		}

		console.log("ROUTING TO ", route);

		/*if (App.Controller[route.controller][route.action] !== undefined) {
			// WE FOUND A ROUTE
		} else {
			// No route. 404

		}*/

		this.lastRoute = url;
	},

	parseUrl: function(url) {
		var i = 0, max, parts = {};

		// Remove leading and trailing slashes
		url = url.replace(/^\/|\/$/g, '').split('/');

		if (url[0] === '') {
			// Unparseable... no controller
			return false;
		}

		for (max = url.length; i < max; i++) {
			if (i === 0) {
				parts.controller = url[0].capitalize();
			} else if (i === 1) {
				parts.action = url[1];
			} else {
				if (parts.args === undefined) {
					parts.args = [];
				}

				parts.args.push(url[i]);
			}
		}

		return $.extend({}, this.defaultParts, parts);
	},

	hashChange: function() {
		var newRoute = this.getUrl();

		if (this.lastRoute !== newRoute) {
			this.route(newRoute);
		}
	}
});

if (String.prototype.capitalize === undefined) {
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}



