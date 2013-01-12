require('Lib/PieJS/src/Object.js');
require('Lib/PieJS/src/Controller/Controller.js');

var Pie = Pie || {};

/**
* This is the description for my class.
*
* @class Pie.Application
* @constructor
*/
Pie.Application = Pie.Object.extend({
	/**
	 * An object to hold the config settings
	 *
	 * @property Config
	 * @type {Object}
	 * @default {}
	 */
	Config: {},

	/**
	 * An object to hold the Model classes
	 *
	 * @property Model
	 * @type {Object}
	 * @default {}
	 */
	Model: {},

	/**
	 * An object to hold the Controller classes
	 *
	 * @property Controller
	 * @type {Object}
	 * @default {Errors.404}
	 */
	Controller: {
		Errors: Pie.Controller.extend({
			404: function(error) {
				var obj = {};
				obj[error] = true;

				console.log('here', obj);
				return obj;
			}
		})
	},


	/**
	 * An object to hold options
	 *
	 * @property options
	 * @type {Object}
	 * @default {
	 *	appFolder: '/App',
	 *	libFolder: '/Lib/PieJS'
	 * }
	 */
	options: {
		appFolder: '/App',
		libFolder: '/Lib/PieJS'
	},

	/**
	 * Initialize the application
	 *
	 * @method init
	 * @param {Object} A config object
	 */
	init: function(options) {
		console.log('Initializing App');
		this.options = $.extend(this.options, options);

		console.log('Initializing LayoutManager');
		this.layoutManager = Pie.LayoutManager.create();
		this.layoutManager.init();

		console.log('Initializing Router');
		this.router = Pie.Router.create(this.get('Config.Routes'));

		this.router.route();
	}
});