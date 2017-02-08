# 简易移动端弹窗 #
----------
## 一、功能
- [x] confirm弹窗
- [x] loading弹窗
- [x] success弹窗
- [x] failure弹窗

## 二、使用
### 1. 引入CSS、JS
```html
<link rel="stylesheet" href="css/popup.min.css">
```
```html
<script src="js/popup.min.js"></script>
```
### 2. API
####a. `show(type, opt)` 显示相应弹窗，支持自定义部分内容和样式

| type | explain |
| ------ | ------ |
| "confirm" | 询问 |
| "loading" | 加载中 |
| "success" | 成功 |
| "failure" | 失败 |

| opt | explain |
| ------ | ------ |
| maskColor | 遮罩层颜色（支持传入CSS颜色）|
| text  |弹窗内的文本（切记不要太长）|
| timeout | 弹窗自动消失时长（单位ms，默认所有弹窗都不会自动消失）|
| buttonReverse | 对调"确定"按钮和"取消"按钮 |
| success | 确定按钮的回调函数 |
| failure | 取消按钮的回调函数 |

####b. `close()` 关闭popup生成的弹窗

## 三、例子

```js
//创建一个popup实例
var myPopup = new Popup();

//显示confirm弹窗
myPopup.show('confirm', {
    //遮罩层颜色
    maskColor: 'rgba(67, 67, 67, 0.4)',
    //弹窗内的文本
    text: 'Sure?',
    //确定按钮的回调函数
    success: function () {
        alert('click yes');
    },
    //取消按钮的回调函数
    failure: function () {
        alert('click no');
    }
});

//显示success弹窗（此时会自动关闭前面打开的confirm弹窗）
myPopup.show('success', {
    //弹窗2s后自动关闭
    timeout: '2000'
});

```

## 四、附加

继续完善中
