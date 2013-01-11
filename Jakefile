var fs = require('fs');

var minify = function(source, destination) {
	console.log('Building ' + destination + '...');
	var data = fs.readFileSync(source),
		jsmin = require('jsmin').jsmin;

	fs.writeFileSync(destination, jsmin(data.toString()));
	console.log('done');
};

var concat = function(folder, destination, require) {
	if (require === undefined) {
		require = true;
	}

	var list, i, loaded = {}, data = '';

	console.log('Building ' + destination + '...');

	list = new jake.FileList();
	list.include(folder);
	list = list.toArray();


	var loadFile = function(filename) {
		var i, fileData, requires, pattern = /require\(('|")(.*)('|")\);/gi;

		if (loaded[filename] !== undefined) {
			return;
		}

		fileData = '' + fs.readFileSync(filename);

		if (require) {
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
		}

		console.log('Loading file ' + filename);
		loaded[filename] = true;
		data += fileData + "\n\n";
	}

	for (i in list) {
		if (list.hasOwnProperty(i)) {
			loadFile(list[i]);
		}
	}

	fs.writeFileSync(destination, data);
	console.log('done');
};

var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

desc('Make sure we have the correct build folder');
directory('./webroot/js', [], function() {
	console.log('Creating build directory');
});

desc('Make sure we have the correct view folder');
directory('./webroot/views', [], function() {
	console.log('Creating view directory');
});

task('build-views', ['./webroot/views'], function() {
	var list, i, filename, filedir, targetDir, loaded = {};

	list = new jake.FileList();
	list.include('App/View/**/*.html');
	list.include('Lib/PieJS/src/View/**/*.html');
	list = list.toArray();

	for (i in list) {
		if (list.hasOwnProperty(i)) {
			filename = (list[i].substr(0, 3) === 'App' ? list[i].substr(9) : list[i].substr(19)).toLowerCase();

			if (loaded[filename] !== undefined) {
				continue;
			}

			loaded[filename] = true;
			
			filedir = filename.split('/');
			filename = filedir.pop();
			filedir.join('/');

			targetDir = './webroot/views/' + filedir;
			
			jake.mkdirP(targetDir);
			
			fs.writeFileSync(targetDir + '/' + filename, fs.readFileSync(list[i]));

			// copy file over
			console.log(filename);
		}
	}
});

desc('Create unminified pie.js');
file('./webroot/js/pie.js', ['./webroot/js'], function() {
	concat('Lib/PieJS/src/*.js', './webroot/js/pie.js');
});

desc ('This is the minify task');
file('./webroot/js/pie.min.js', ['./webroot/js/pie.js'], function() {
	minify('./webroot/js/pie.js', './webroot/js/pie.min.js');
});

desc ('Make sure we have handlebars');
file('./webroot/js/handlebars.js', ['./webroot/js'], function() {
	concat('Lib/Handlebars/*.js', './webroot/js/handlebars.js', false);
});

desc ('Minify handlebars');
file('./webroot/js/handlebars.min.js', ['./webroot/js/handlebars.js'], function() {
	minify('./webroot/js/handlebars.js', './webroot/js/handlebars.min.js');
});

desc ('Make sure we have metamorph');
file('./webroot/js/metamorph.js', ['./webroot/js'], function() {
	concat('Lib/Metamorph/*.js', './webroot/js/metamorph.js', false);
});

desc ('Minify metamorph');
file('./webroot/js/metamorph.min.js', ['./webroot/js/metamorph.js'], function() {
	minify('./webroot/js/metamorph.js', './webroot/js/metamorph.min.js');
});

desc('Create unminified app.js');
file('./webroot/js/app.js', ['./webroot/js'], function() {
	concat(['App/*.js', 'App/**/*.js'], './webroot/js/app.js');
});

desc ('This is the minify task');
file('./webroot/js/app.min.js', ['./webroot/js/app.js'], function() {
	minify('./webroot/js/app.js', './webroot/js/app.min.js');
});

desc ('Remove all build files');
task('clean', [], function() {
	console.log('Removing previous build...');

	var i, filesList = [
		'./webroot/js/pie.js',
		'./webroot/js/pie.min.js',
		'./webroot/js/app.js',
		'./webroot/js/app.min.js',
		'./webroot/js/handlebars.js',
		'./webroot/js/handlebars.min.js',
		'./webroot/js/metamorph.js',
		'./webroot/js/metamorph.min.js'
	];

	for (i in filesList) {
		if (filesList.hasOwnProperty(i)) {
			try {
				fs.unlinkSync(filesList[i]);
			} catch(e) {
				console.log(filesList[i] + ' missing');
			}
		}
	}

	deleteFolderRecursive('./webroot/views');
	
	console.log('done');
});

desc('Main build task');
task('build', ['./webroot/js/pie.min.js', './webroot/js/app.min.js', 'build-views', './webroot/js/handlebars.min.js', './webroot/js/metamorph.min.js'], function() {
	console.log('Build complete');
});
task('rebuild', ['clean', 'build'], function() {
	console.log('Rebuild complete');
});