Handlebars.registerHelper('content', function(id) {
	if (id === undefined) {
		id = 'default';
	}

	return new Handlebars.SafeString('<div id="PieContent-' + id + '"></div>');
});

Handlebars.registerHelper('bind', function(key) {
	// create the morph object
	var morph = new Metamorph(this[key]);

	this.addMetamorph(key, morph);

	return new Handlebars.SafeString(morph.outerHTML());
});