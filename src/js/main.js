var options = {
    confirm: {
        width: '',
        Height: '',
        maskColor: 'rgba(67, 67, 67, 0.5)',
        text: '解绑后将无法收到该设备的任何消息。您确定要解绑吗?',
        success: function () {
        },
        failure: function () {
        }
    },
    loading: {
        width: '',
        Height: '',
        maskColor: 'transparent',
        text: '解绑中...'
    },
    success: {
        width: '',
        Height: '',
        maskColor: 'transparent',
        text: '该设备已解除绑定'
    },
    failure: {
        width: '',
        Height: '',
        maskColor: 'transparent',
        text: '该设备解绑失败 请重试'
    }
}; //弹窗样式配置

var myPopup = popup();

myPopup.show('confirm');
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

