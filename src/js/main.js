/* 创建一个 Popup 实例 */
let myPopup = new Popup();

/* 显示 loading 弹窗 */
myPopup.show('loading', {
    text: '加载中...'
});

/* 显示 success 弹窗 */
myPopup.show('success', {
    text: 'Success!'
});

/* 显示 failure 弹窗 */
myPopup.show('failure', {
    text: 'Failure!',
    /*弹窗2s后自动关闭*/
    timeout: '2000'
});

/* 关闭打开的所有弹窗 */
myPopup.close();

/* 显示 confirm 弹窗 */
myPopup.show('confirm', {
    text: 'Sure?',
    maskColor: 'rgba(67, 67, 67, 0.4)',
    buttonReverse: true,
    success: () => {
        myPopup.show('loading');
        setTimeout(() => myPopup.show('success'), 2000);
    },
    failure: () => {
        //myPopup.show('failure');
    }
});
