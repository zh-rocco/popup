var myPopup = popup();

myPopup.show('confirm', {
    text: 'OK?',
    maskColor: '',
    success: function () {
        console.log('OK');
    },
    failure: function () {
        console.log('NO');
    }
});
/*setTimeout(function () {
 myPopup.show('success', {
 maskColor: '',
 text: 'success',
 success: function () {
 alert('From cb');
 },
 failure: function () {
 }
 });
 setTimeout(function () {
 myPopup.close();
 setTimeout(function () {
 myPopup.show('confirm', {
 maskColor: 'yellow',
 text: 'Sure?',
 success: function () {
 alert('click yes');
 },
 failure: function () {
 alert('click no');
 }
 })
 }, 3000)
 }, 1000)
 }, 2000);*/
