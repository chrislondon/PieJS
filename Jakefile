var fs = require('fs');

desc('Make sure we have the correct build folder');
directory('./build', [], function() {
	console.log('Creating build directory');
});

desc('Create unminified pie.js');
file('build/pie.js', ['./build'], function() {
	var list, i, loaded = {}, data = '';

	console.log('Building pie.js...');

	list = new jake.FileList();
	list.include('Lib/PieJS/src/*.js');
	list = list.toArray();


	var loadFile = function(filename) {
		var i, fileData, requires, pattern = /require\(('|")(.*)('|")\);/gi;

		if (loaded[filename] !== undefined) {
			return;
		}

		fileData = '' + fs.readFileSync(filename);

		// find requires
		requires = fileData.match(pattern);

		if (requires !== null) {
			for (i in requires) {
				if (requires.hasOwnProperty(i)) {
					loadFile(requires[i].substr(9, requires[i].length - 12));
				}
			}
		}

		fileData = fileData.replace(pattern, '');

		console.log('Loading file ' + filename);
		loaded[filename] = true;
		data += fileData + "\n\n";
	}

	for (i in list) {
		if (list.hasOwnProperty(i)) {
			loadFile(list[i]);
		}
	}

	fs.writeFileSync('build/pie.js', data);
	console.log('done');
});

desc ('This is the minify task');
file('build/pie.min.js', ['build/pie.js'], function() {
	console.log('Building pie.min.js...');
	var data = fs.readFileSync('build/pie.js'),
		jsmin = require('jsmin').jsmin;

	fs.writeFileSync('build/pie.min.js', jsmin(data.toString()));
	console.log('done');
});

desc('Create unminified app.js');
file('build/app.js', ['./build'], function() {
	console.log('Building app.js...');
	var data = '';

	data += fs.readFileSync('App/App.js');
	data += fs.readFileSync('App/Config/Routes.js');
	data += fs.readFileSync('App/Controller/Users.js');

	fs.writeFileSync('build/app.js', data);
	console.log('done');
});

desc ('This is the minify task');
file('build/app.min.js', ['build/app.js'], function() {
	console.log('Building app.min.js...');
	var data = fs.readFileSync('build/app.js'),
		jsmin = require('jsmin').jsmin;

	fs.writeFileSync('build/app.min.js', jsmin(data.toString()));
	console.log('done');
});

desc ('Remove all build files');
task('clean', [], function() {
	console.log('Removing previous build...');

	fs.unlinkSync('build/pie.js');
	fs.unlinkSync('build/pie.min.js');
	fs.unlinkSync('build/app.js');
	fs.unlinkSync('build/app.min.js');

	console.log('done');
});

desc('Main build task');
task('build', ['build/pie.min.js', 'build/app.min.js'], function() {
	console.log('Build complete');
});
task('rebuild', ['clean', 'build/pie.min.js', 'build/app.min.js'], function() {
	console.log('Rebuild complete');
});