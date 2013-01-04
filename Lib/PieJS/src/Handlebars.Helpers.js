Handlebars.registerHelper('content', function(id) {
	if (id === undefined) {
		id = 'default';
	}

	return new Handlebars.SafeString('<div id="PieContent-' + id + '"></div>');
});