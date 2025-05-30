---
url : pages/press/toast/toast
---

## Toast 轻提示


在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

## 引入

注意，`press-toast` 节点需要埋在页面下，否则小程序中找不到。H5 环境可以不预埋，找不到节点时，会动态创建。

```html
<press-toast id="press-toast" />
```

```ts
import PressToast from 'press-ui/press-toast/press-toast';

export default {
  components: {
    PressToast,
  }
}
```

## 代码演示

### 文字提示

```javascript
import { showToast } from 'press-ui/press-toast';

showToast('我是提示文案，建议不超过十五字~');
```

### 加载提示

使用 `showLoadingToast` 方法展示加载提示，通过 `forbidClick` 属性可以禁用背景点击，通过 `loadingType` 属性可以自定义加载图标类型。

```javascript
import { showLoadingToast } from 'press-ui/press-toast';

showLoadingToast({
  message: '加载中...',
  forbidClick: true,
});

// 自定义加载图标
showLoadingToast({
  message: '加载中...',
  forbidClick: true,
  loadingType: 'spinner',
});
```

### 成功/失败提示

```javascript
import { showSuccessToast, showFailToast } from 'press-ui/press-toast';

showSuccessToast('成功文案');
showFailToast('失败文案');
```

### 动态更新提示

```javascript
import { showLoadingToast, closeToast } from 'press-ui/press-toast';

const toast = showLoadingToast({
  duration: 0, // 持续展示 toast
  forbidClick: true,
  message: '倒计时 3 秒',
  selector: '#custom-selector',
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.setData({
      message: `倒计时 ${second} 秒`,
    });
  } else {
    clearInterval(timer);
    closeToast();
  }
}, 1000);
```

```html
<press-toast id="custom-selector" />
```

### OnClose 回调函数

```javascript
showToast({
  type: 'success',
  message: '提交成功',
  onClose: () => {
    console.log('执行OnClose函数');
  },
});
```

## API

### 方法

| 方法名                                                 | 参数                   | 返回值     | 介绍                            |
| ------------------------------------------------------ | ---------------------- | ---------- | ------------------------------- |
| showToast，同 Toast                                    | `options   \| message` | toast 实例 | 展示提示                        |
| showLoadingToast，同 Toast.loading                     | `options   \| message` | toast 实例 | 展示加载提示                    |
| showSuccessToast，同 Toast.success                     | `options   \| message` | toast 实例 | 展示成功提示                    |
| showFailToast，同 Toast.fail                           | `options   \| message` | toast 实例 | 展示失败提示                    |
| closeToast，同 Toast.clear                             | `clearAll`             | `void`     | 关闭提示                        |
| setToastDefaultOptions，同 Toast.setDefaultOptions     | `options`              | `void`     | 修改默认配置，对所有 Toast 生效 |
| resetToastDefaultOptions，同 Toast.resetDefaultOptions | -                      | `void`     | 重置默认配置，对所有 Toast 生效 |

### Options

| 参数         | 说明                                                   | 类型       | 默认值        |
| ------------ | ------------------------------------------------------ | ---------- | ------------- |
| type         | 提示类型，可选值为 `loading` `success` `fail` `html`   | _string_   | `text`        |
| position     | 位置，可选值为 `top` `middle` `bottom`                 | _string_   | `middle`      |
| message      | 内容                                                   | _string_   | `''`          |
| mask         | 是否显示遮罩层                                         | _boolean_  | `false`       |
| forbidClick  | 是否禁止背景点击                                       | _boolean_  | `false`       |
| loadingType  | 加载图标类型, 可选值为 `spinner`, `circular-tdesign`   | _string_   | `circular`    |
| loadingSize  | 加载图标大小，默认单位为 `px`                          | _string_   | -             |
| loadingColor | 加载图标颜色                                           | _string_   | `#fff`        |
| zIndex       | z-index 层级                                           | _number_   | `1000`        |
| duration     | 展示时长(ms)，值为 0 时，toast 不会消失                | _number_   | `2000`        |
| selector     | 自定义选择器                                           | _string_   | `press-toast` |
| context      | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | _object_   | 当前页面      |
| onClose      | 关闭时的回调函数                                       | _function_ | -             |

### Slot

| 名称 | 说明       |
| ---- | ---------- |
| -    | 自定义内容 |


## 在线调试

<debug-online />