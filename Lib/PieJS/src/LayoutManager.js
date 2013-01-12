var Pie = Pie || {};

Pie.LayoutManager = Pie.Object.extend({
	layouts: {},

	init: function() {
		this.loadLayout('default');
	},

	loadLayout: function(layout, target, context) {
		var self = this;

		if (this.layouts[layout] !== undefined) {
			this.renderLayout(layout, target, context);
			return;
		}

		$.get('/views/layouts/' + layout + '.html').success(function(resp) {
			// We have the view
			self.compileLayout(resp, layout, target, context);
		}).error(function() {
			// We don't have the view something went horribly wrong
			console.log("Couldn't find view");

			if (layout !== 'missing-layout') {
				// load the missing view warning unless we failed loading the
				// missing view warning
				self.loadLayout('missing-layout', target, context);
			}
		});
	},

	compileLayout: function(html, layout, target, context) {
		this.set('layouts.' + layout, Handlebars.compile(html));
		this.renderLayout(layout, target, context);
	},

	renderLayout: function(layout, target, context) {
		$('body').append(this.layouts[layout](context));
	}
});