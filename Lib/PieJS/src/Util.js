if (String.prototype.capitalize === undefined) {
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}

if (String.prototype.decapitalize === undefined) {
	String.prototype.decapitalize = function() {
		return this.charAt(0).toLowerCase() + this.slice(1);
	};
}

