require('lib/Object.js');

var Pie = Pie || {};
var LawnChair;

Pie.ActiveLawnChair = Pie.Object.extend({

	init: function(adapter_type, table_name) {
		adapter_type = 'dom';
		table_name   = 'pie';
		LawnChair 	 = new Lawnchair( { adapter:adapter_type, table:table_name }, function() {} );
	},

	save: function(key_name, values) {
		LawnChair.save( { key:key_name, value:values });
		console.log('Storing key: ' + key_name);
	},

	read: function(key) {
		var return_value = {};
		LawnChair.exists(key, function(exists) {
			if ( exists ) {
				console.log('Reading key: ' + key);
				LawnChair.get(key, function(obj) { 
					return_value = obj.value;
				});
			} else {
				return_value = null;
			}
		});
		return return_value;
	},

	update: function(key_name, values) {
		var success = false; 
		LawnChair.exists(key_name, function(exists) {
			if ( exists ) {
				LawnChair.save( { key:key_name, value:values } );
				console.log('Updating key: ' + key_name);
				success = true;
			}
		});
		return success;
	},

	destroy: function(key) {
		var success = false;
		LawnChair.exists(key, function(exists) {
			if ( exists ) {
				LawnChair.remove(key);
				console.log('Destroying key: ' + key);
				success = true;
			}
		});
		return success;
	},

	// Destroy everything in the store
	nuke: function() {
		LawnChair.nuke();
		console.log('Destroying all');
	},

	all: function() {
		var all = [];
		console.log('Showing all');
		LawnChair.each(function(obj) {
			all.push(obj);
		});
		return all;
	}
});