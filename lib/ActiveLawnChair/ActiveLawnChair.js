require('lib/Object.js');

var Pie = Pie || {};
var LawnChair;

Pie.ActiveLawnChair = Pie.Object.extend({
	
	init: function(adapter_type, table_name) {
		adapter_type = adapter_type || 'dom';
		table_name   = table_name   || 'pie';
		LawnChair 	 = new Lawnchair( { adapter:adapter_type, table:table_name } )
	},

	create: function(key_name, values) {
		LawnChair.save( { key:key_name, value:values }, function(obj) {
			console.log(obj);
		});
	},

	read: function(key) {
		LawnChair.exists(key, function(exists) {
			if ( exists ) {
				return LawnChair.get(key);
			} else {
				return null;
			}
		});
	},

	update: function(key_name, values) {
		LawnChair.exists(key_name, function(exists) {
			if ( exists ) {
				LawnChair.save( { key:key_name, value:values } )
			}
		});
	},

	destroy: function(key) {
		LawnChair.exists(key, function(exists) {
			if ( exists ) {
				LawnChair.remove(key);
				return true;
			} else {
				return false;
			}
		});
	},

	// Destroy everything in the store
	nuke: function() {
		LawnChair.nuke();
	},

	all: function() {
		return LawnChair.all();
	}
});