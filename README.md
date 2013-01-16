PieJS
=====

MVC Framework for Javascript

Current State: Apple (Alpha)

# Installation

There are two ways you can build PieJS: using Bakery (preferred), using Jake.

## Install via Bakery

Bakery is our home built command line node module. It comes with a built-in http server

If you don't have `npm` yet you'll need to install it. See this guide for help: http://howtonode.org/introduction-to-npm

To install Bakery:

```
	npm install -g bakery
```

This will install it globally and make it available in your bin.  If you know what you're doing and don't want to install it globally that's fine.


Start a new app:

```
	mkdir ~/taste-test
	cd ~/taste-test
	bakery bake apple pie
```

This will set up the folder you are in with an apple pie instance.  If you want to develop from the master branch you can run `bakery bake master pie` but breaking changes happen all the time in master so there are no guarantees about it's current state.

Start a server (run from the root of your applicaiton folder):

```
	bakery server
```

This will, by default, create a server for you to view your app at http://localhost:8080 (use http://localhost:8080/index.dev.html for the unminifyied javascript, recommended for development). Sometimes the minifying takes a little extra time and so you may see a blank screen the first time, but if you wait a couple seconds it should finish.  Also we have a built in file watcher so every time you modify a file in your App folder it will automatically rebuild your javascript files.

Don't want the server or file watcher? You can manually run minify to create the unminified and minified versions of your code

```
	bakery minify
```

## Install via Jake

Jake is a tool I started using when I first started building PieJS. It's a nice tool but I think we've out grown it. I won't really support it in the future but I'll do pull requests on it if others are interested in supporting it

If you don't have `npm` yet you'll need to install it. See this guide for help: http://howtonode.org/introduction-to-npm

To install Jake:

```
	npm install -g jake
```

This will install it globally and make it available in your bin.  If you know what you're doing and don't want to install it globally that's fine.


Start a new app:

Our jakefile doesn't have any support for downloading pie so you will have to either git clone the repo or download the zip from github.

Once you have the files you can run the following to build the javascript files for you

```
	jake rebuild
```

This will create all of the javascript and html files that you will need. It doesn't have any other cool magic like bakery. I was going to remove the jakefile but I figured I already made the effort to create it it so I thought I'd leave it in to give people options.


Hello World
=====

- Create controller

file: App/Controller/Example.js

```javascript
App.Controller.Example = Pie.Controller.extend({

});
```

- Create action

file: App/Controller/Example.js

```javascript
App.Controller.Example = Pie.Controller.extend({
	index: function() {

	}
});
```

- Create view

file: App/View/Example/index.html

```html
<h1>Hello, World</h1>
```

- In root directory run 'bakery server'

- Navigate to app in web browser


Hello World, Part 2
=====

- Reopen controller and add object

file: App/Controller/Example.js

```javascript
App.Controller.Example = Pie.Controller.extend({
	index: function() {
		return {
			name: "Chris London"
		};
	}
});
```


- Reopen view and add object

file: App/View/Example/index.html

```html
<h1>Hello, {{name}}</h1>
```

- In root directory run 'bakery server'. If you're already running bakery server it should automatically compile the files on save so you won't need to do this again.

- Navigate to app in web browser