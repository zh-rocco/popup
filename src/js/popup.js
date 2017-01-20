// 弹窗
function popup() {
    "use strict";

    //判断DOM中是否存在id为"popup-box"的元素，如果没有，create
    if (!document.getElementById('popup-box')) {
        var create_popupBox = document.createElement('div');
        var create_popupMask = document.createElement('div');
        create_popupBox.setAttribute('id', 'popup-box');
        create_popupBox.classList.add('popup-box');
        create_popupMask.classList.add('popup-mask');
        create_popupBox.appendChild(create_popupMask);
        document.getElementsByTagName('body')[0].appendChild(create_popupBox);
    }

    //HTML模板
    var popupHTML = {
        confirm: "<div class=\"confirm-text\"><p><\/p><\/div>" +
        "<div class=\"confirm-button clear-fix\">" +
        "    <button class=\"button no\">取消<\/button>" +
        "    <button class=\"button yes\">确定<\/button>" +
        "<\/div>",

        loading: "<span class=\"loading\"><\/span>" +
        "<p><\/p>",

        success: "<span><\/span>" +
        "<p><\/p>",

        failure: "<span><\/span>" +
        "<p><\/p>"
    };

    var popupBox = document.getElementById('popup-box');
    var popupMask = popupBox.getElementsByClassName('popup-mask')[0];
    var popupItems = []; //popupBox下的所有弹窗集合
    var options = {
        confirm: {
            width: '',
            Height: '',
            maskColor: 'rgba(67, 67, 67, 0.5)',
            text: '解绑后将无法收到该设备的任何消息。您确定要解绑吗?',
            success: function () {
                var popupConfirm = popupBox.getElementsByClassName('popup-confirm')[0];
                popupBox.style.display = 'none';
                popupConfirm.style.display = 'none';
            },
            failure: function () {
                var popupConfirm = popupBox.getElementsByClassName('popup-confirm')[0];
                popupBox.style.display = 'none';
                popupConfirm.style.display = 'none';
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

    var prevent = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };

    var stop = function (e) {
        e.stopPropagation();
    };

    // 阻止用户滑动，防止弹窗内的按钮点透
    popupBox.addEventListener('touchmove', prevent, false);
    popupBox.addEventListener('touchstart', stop, false);
    popupBox.addEventListener('touchend', stop, false);
    popupBox.addEventListener('click', stop, false);

    //展示指定的popupItem，传入参数 confirm:确认? loading:加载动画 success:成功 failure:失败
    function show(arg, opt) {
        opt = opt || {};

        switch (arg) {
            case 'confirm':
                showConfirm(opt);
                break;
            case 'loading':
                showLoading(opt);
                break;
            case 'success':
                showSuccess(opt);
                break;
            case 'failure':
                showFailure(opt);
                break;
            default:
                console.error('请输入合法的"show(arg)",arg可选"confirm" "success" "failure" "loading"');
                return false;
        }
    }

    /* 确认弹窗 */
    function showConfirm(opt) {
        if (!popupBox.getElementsByClassName('popup-confirm')[0]) {
            create('confirm');
        }
        popupMask.style.backgroundColor = opt.maskColor || options.confirm.maskColor;
        close();
        var popupConfirm = popupBox.getElementsByClassName('popup-confirm')[0];
        var text = popupConfirm.getElementsByTagName('p')[0];
        var yes = popupConfirm.getElementsByClassName('yes')[0];
        var no = popupConfirm.getElementsByClassName('no')[0];
        text.textContent = opt.text || options.confirm.text;
        popupConfirm.style.display = 'block';
        popupBox.style.display = 'block';
        addEvent(yes, opt.success, options.confirm.success);
        addEvent(no, opt.failure, options.confirm.failure);
    }

    //confirm弹窗添加回掉函数
    function addEvent(ele, cb, def) {
        if (isFunction(cb)) {
            ele.onclick = function () {
                cb();
                def();
            }
        } else {
            ele.onclick = def;
        }
    }

    /* 加载弹窗 */
    function showLoading(opt) {
        if (!popupBox.getElementsByClassName('popup-loading')[0]) {
            create('loading');
        }
        popupMask.style.backgroundColor = opt.maskColor || options.loading.maskColor;
        close();
        var popupLoading = popupBox.getElementsByClassName('popup-loading')[0];
        var text = popupLoading.getElementsByTagName('p')[0];
        text.textContent = opt.text || options.loading.text;
        popupLoading.style.display = 'block';
        popupBox.style.display = 'block';
    }

    /* 成功弹窗 */
    function showSuccess(opt) {
        if (!popupBox.getElementsByClassName('popup-success')[0]) {
            create('success');
        }
        popupMask.style.backgroundColor = opt.maskColor || options.loading.maskColor;
        close();
        var popupSuccess = popupBox.getElementsByClassName('popup-success')[0];
        var text = popupSuccess.getElementsByTagName('p')[0];
        text.textContent = opt.text || options.success.text;
        popupSuccess.style.display = 'block';
        popupBox.style.display = 'block';
    }

    /* 失败弹窗 */
    function showFailure(opt) {
        if (!popupBox.getElementsByClassName('popup-failure')[0]) {
            create('failure');
        }
        popupMask.style.backgroundColor = opt.maskColor || options.loading.maskColor;
        close();
        var popupFailure = popupBox.getElementsByClassName('popup-failure')[0];
        var text = popupFailure.getElementsByTagName('p')[0];
        text.textContent = opt.text || options.failure.text;
        popupFailure.style.display = 'block';
        popupBox.style.display = 'block';
    }

    /* 关闭所有弹窗 */
    function close() {
        popupItems = popupBox.getElementsByClassName('popup-item');
        //console.log(popupItems);
        popupBox.style.display = 'none';
        for (var i = 0, len = popupItems.length; i < len; i++) {
            popupItems[i].style.display = 'none';
        }
    }

    //生成HTML，type取 'confirm','loading','success','failure'
    function create(type) {
        //var popupBox = document.getElementById('popup-box');
        var popupItem = document.createElement('div');
        popupItem.classList.add('popup-item', 'popup-' + type);
        popupItem.innerHTML = popupHTML[type];
        popupBox.appendChild(popupItem);
    }

    //判断是否为一个函数
    function isFunction(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    }

    //暴露API
    return {
        show: function (arg, opt) {
            show(arg, opt);
        },
        close: function () {
            close();
        }
    }
}
