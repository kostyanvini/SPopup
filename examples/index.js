new SPopup({
    selector: '.popup-open',
    src: '#content',
    animate: {
        time: 300,
        effect: 'opacity'
    }
});

new SPopup({
    selector: '.popup-open2',
    src: '#content2',
    popupWrapper: false,
    closePopup: ['.close-popup', '.close-popup1', '.close-popup2']
});