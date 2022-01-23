# spopup
***

### To get started, install the script.

```text
npm install i spopup
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