var Pie = Pie || {};

Pie.LayoutManager = Pie.Object.extend({
	layouts: {},
	pendingViews: {},

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

		// check if we have any pending views for this layout
		if (this.get('pendingViews.' + target) !== undefined) {
			this.renderView(target, this.get('pendingViews.' + target));
		}
	},

	insertView: function(target, html) {
		// todo check if we have the layout
		if (this.get('layouts.' + target) === undefined) {
			// if not then put it in pending views
			this.set('pendingViews.' + target, html);
		} else {
			this.renderView(target, html);
		}
	},

	renderView: function(target, html) {
		$('#PieContent-' + target).html(html);
	},

	renderLayout: function(layout, target, context) {
		$('body').append(this.layouts[layout](context));
	}
});