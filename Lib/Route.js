require('lib/DataObject.js');

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