var myPopup = new Popup();

myPopup.show('confirm', {
    maskColor: 'transparent',
    text: 'Sure?',
    success: function () {
        alert('yes');
    },
    failure: function () {
        alert('no');
    }
});

setTimeout(function () {
    myPopup.show('success', {
        maskColor: 'rgba(85,85,85,.3)',
        text: 'success'
    });
    setTimeout(function () {
        myPopup.close();
        setTimeout(function () {
            myPopup.show('confirm', {
                maskColor: 'rgba(85,85,85,.3)',
                text: 'Sure?',
                buttonReverse: true,
                success: function () {
                    alert('yes');
                },
                failure: function () {
                    alert('no');
                }
            })
        }, 500)
    }, 3000)
}, 3000);
