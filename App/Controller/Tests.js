App.Controller.Tests = Pie.Controller.extend({
	models: [
		'Success'
	],

	index: function(entitytype, entityid) {
		var test = this.Success.find({
			entitytype: entitytype,
			entityid: entityid
		});

		window.test = test;

		return test;
	}
});