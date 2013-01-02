require('Lib/PieJS/src/Object.js');

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