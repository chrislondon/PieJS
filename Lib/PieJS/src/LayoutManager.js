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

		$.get('/views/layouts/' + layout + '.html').success(function(resp) {
			// We have the view
			self.compileLayout(resp, layout, target);
		}).error(function() {
			// We don't have the view something went horribly wrong
			console.log("Couldn't find view");

			if (layout !== 'missing-view') {
				// load the missing view warning unless we failed loading the
				// missing view warning
				self.loadLayout('missing-view', target);
			}
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