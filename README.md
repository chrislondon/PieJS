PieJS
=====

MVC Framework for Javascript

Current State: Apple (Alpha)


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

- In root directory run 'jake rebuild'

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

- In root directory run 'jake rebuild'

- Navigate to app in web browser