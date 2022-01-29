# spopup

***

### To get started, install the script.

```text
npm install spopup
```

or

```text
download the spopup.js and style.css from the folder dist/
```

***

Basic example

```js
new SPopup({
	// When clicked, a modal window will open
	selector: 'button.popup-open',
	// Content modal window
	src: '#content'
});
```

Animation example

```js
new SPopup({
	selector: 'button.popup-open',
	src: '#content',
	// Settings for animation
	animate: {
		// Animation execution
		time: 300,
		// Currently available "opacity" "top" "left" "bottom" "right"
		effect: 'opacity'
	}
});
```
All examples can be viewed in the folder examples/

***
Events

```js
new SPopup({
	selector: 'button.popup-open',
	src: '#content',
	on: {
		afterSpopupOpen() {
			console.log('after open');
		},
		afterSpopupClose() {
			console.log('after close');
		},
		init() {
			console.log('init');
		},
	}
});
```

Global methods

```js
/*
If an instance is passed, then this particular modal window will close when the method is called.
If nothing is passed, then all modal windows will close.
 */
SPopup.close(instance);

/*
The method accepts all SPopup parameters.
If nothing is passed, the default modal window will open.
 */
SPopup.show(opts);
```

Methods of the SPopup instance

```js

const instance = new SPopup({
	selector: 'button.popup-open',
	src: '#content'
});

// hangs an event handler
instance.on('afterSpopupOpen', function () {
	// this will always be an instance of the class
});

// Opens a modal window
instance.show();

// Closes the modal window
instance.close();
```