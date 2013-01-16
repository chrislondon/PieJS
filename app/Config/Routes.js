/**
 * Route config file.
 *
 * Use this file to create routes that don't match the default Pie route naming
 * convention.
 *
 * example:
 * App.Config.Routes = [
 *     {url: '/', controller: 'Foo', action:'bar'}, // Set up the default route to App.Controller.Foo.bar
 *     {url: '/hello-world', controller: 'Foo'}, // Set up the /default/hello-world route to App.Controller.Foo.index
 * ];
 *
 */
App.Config.Routes = [
	{url: '/', controller: 'Pages'},
	{url: '/pages', controller: 'Pages'}
];