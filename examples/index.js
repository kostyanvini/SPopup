new SPopup({
    selector: '.popup-open-1',
    src: '#content-1',
});

new SPopup({
    selector: '.popup-open-2',
    src: '#content-2',
    animate: {
        time: 500,
        effect: 'opacity'
    }
});

new SPopup({
    selector: '.popup-open-3',
    src: '#content-3',
    animate: {
        time: 500,
        effect: 'left'
    }
});

new SPopup({
    selector: '.popup-open-4',
    src: '#content-4',
    animate: {
        time: 500,
        effect: 'right'
    }
});

new SPopup({
    selector: '.popup-open-5',
    src: '#content-5',
    animate: {
        time: 500,
        effect: 'top'
    }
});

new SPopup({
    selector: '.popup-open-6',
    src: '#content-6',
    animate: {
        time: 500,
        effect: 'bottom'
    }
});

new SPopup({
    selector: '.popup-open-7',
    src: '#content-7',
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

// popup 1
new SPopup({
    selector: '.popup-open-8',
    src: '#content-8',
});
// popup 2
new SPopup({
    selector: '.popup-open-9',
    src: '#content-9',
});
// popup 3
new SPopup({
    selector: '.popup-open-10',
    src: '#content-10',
});