require('Lib/PieJS/src/Object.js');

var Pie = Pie || {};
var App = App || {};

Pie.Model = Pie.Object.extend({
	find: function(data) {
		return this._ajax(data, 'GET');
	},

	_ajax: function(data, type) {
		var obj, self, options, configUrl = App.get('Config.Models.url');

		obj = Pie.ModelObject.create();

		if (type === undefined) {
			type = 'GET';
		}
		
		if (configUrl === undefined) {
			configUrl = '';
		}

		self = this;

		options = {
			data: data,
			error: function(error) {
				obj.set({
					didError: true,
					error: {
						code: error.status,
						text: error.statusText
					}
				});
			},

			complete: function(resp) {
				obj.set({
					didLoad: true
				});
			},
			
			success: function(resp) {
				obj.set({
					didSuccess: true,
					data: self.parse(resp)
				});
			}
		};

		// TODO this .php doesn't belong here. It should be in the individual app
		$.ajax(configUrl + this.url + '.php', options);

		return obj;
	},

	parse: function(resp) {
		return resp;
	}

	
});