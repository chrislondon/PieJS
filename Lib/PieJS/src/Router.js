require('Lib/PieJS/src/Object.js');

var Pie = Pie || {};
var App = App || {};

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
		var i, route = false, controller;

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

		if (route.get('controller') === undefined) {
			console.log("Missing Controller");
			this.route('/errors/404');
			return;
		}

		controller = App.get('Controller.' + route.get('controller').decapitalize());

		if (controller === undefined) {
			// We haven't created this controller yet. Let's try and create it
			if (App.get('Controller.' + route.get('controller')) === undefined) {
				// We don't have this controller at all
				console.log("Missing Controller");
				this.route('/errors/404');
				return;
			}

			controller = App.Controller[route.get('controller').decapitalize()] = App.get('Controller.' + route.get('controller')).create();
		}
		
		if (controller.get(route.get('action')) !== undefined) {
			// WE FOUND A ROUTE

			var context = controller[route.get('action')].apply(controller, route.get('args'));

			$.get('/views/' + route.get('controller').toLowerCase() + '/' + route.get('action').toLowerCase() + '.html').success(function(html) {
				// We have the view
				$('#PieContent-default').html(Handlebars.compile(html)(context));
			});

		} else {
			// No route. 404
			console.log("Missing Action");
			//this.route('/errors/404');
			return;
		}

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