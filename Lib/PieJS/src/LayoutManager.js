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