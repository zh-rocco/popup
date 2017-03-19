# 简易移动端弹窗 #

---
## 一、功能
- [x] confirm弹窗
- [x] loading弹窗
- [x] success弹窗
- [x] failure弹窗



## 二、截图
### confirm 弹窗

![image](https://github.com/no-nothing/popup/blob/master/README/popup-confirm.png)

### loading 弹窗

![image](https://github.com/no-nothing/popup/blob/master/README/popup-loading.png)

### success 弹窗

![image](https://github.com/no-nothing/popup/blob/master/README/popup-success.png)

### failure 弹窗

![image](https://github.com/no-nothing/popup/blob/master/README/popup-failure.png)



## 三、使用
### 1. 引入CSS、JS
```html
<link rel="stylesheet" href="css/popup.min.css">
```
```html
<script src="js/popup.min.js"></script>
```


### 2. API
#### a. `show(type, opt)` 显示相应弹窗，支持自定义部分内容和样式
> `type` 为弹窗的种类，`opt` 为弹窗的配置信息

| type | 说明 |
| ------ | ------ |
| "confirm" | 询问 |
| "loading" | 加载中 |
| "success" | 成功 |
| "failure" | 失败 |

| opt | 说明 |
| ------ | ------ |
| maskColor | 遮罩层颜色（支持传入CSS颜色）|
| text  |弹窗内的文本（切记不要太长）|
| timeout | 弹窗自动消失时长（单位ms，默认所有弹窗都不会自动消失）|
| buttonReverse | 询问弹窗对调"确定"和"取消"按钮 |
| success | "确定"按钮的回调函数 |
| failure | "取消"按钮的回调函数 |

#### b. `close()` 关闭所有popup生成的弹窗



## 四、例子
```js
/* 创建一个 Popup 实例 */
let myPopup = new Popup();

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

/* 关闭之前打开的所有弹窗 */
myPopup.close();

/* 显示 failure 弹窗 */
myPopup.show('failure', {
    text: 'Failure!',
    /*弹窗2s后自动关闭*/
    timeout: '2000'
});
```



## 五、附加
继续完善中
