var App = Pie.Application.extend();var App = App || {};

App.Config = App.Config || {};

App.Config.Routes = [{
	url: '/',
	controller: 'Users'
}];var App = App || {};

App.Controller = App.Controller || {};

App.Controller.Users = Pie.Controller.extend({
	index: function() {
		console.log("HERE WE GO");
	}
});