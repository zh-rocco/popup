var myPopup = new Popup();

myPopup.show('confirm', {
    maskColor: 'transparent',
    text: 'Sure?',
    buttonReverse: true,
    success: function () {
        alert('yes');
    },
    failure: function () {
        alert('no');
    }
});

setTimeout(function () {
    myPopup.show('success', {
        maskColor: 'rgba(85, 85, 85, .3)',
        text: 'success'
    });
    setTimeout(function () {
        myPopup.show('loading', {
            maskColor: 'rgba(85, 85, 85, .3)',
            text: 'loading',
            timeout: 5000
        });
    }, 1000);
}, 3000);
