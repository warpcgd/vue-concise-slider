中文 | [English](https://github.com/warpcgd/vue-concise-slider/blob/master/README_EN.md)

## vue-concise-slider.js

[![npm](https://img.shields.io/npm/v/vue-concise-slider.svg)](https://www.npmjs.com/package/vue-concise-slider)
[![npm](https://img.shields.io/npm/dw/vue-concise-slider.svg)](https://www.npmjs.com/package/vue-concise-slider)
[![npm](https://img.shields.io/github/size/warpcgd/vue-concise-slider/dist/module.js.svg)](https://www.npmjs.com/package/vue-concise-slider)

![](vue-slider-github.jpg)
* * *
vue-concise-slider,一个简单的滑动组件,配置简单,支持自适应/全屏+按钮+分页,同时兼容移动端和PC端

## 版本
v2.1.2  支持vue2.0+

### 目前已实现
- [x] 全屏自适应
- [x] 移动端兼容
- [x] 垂直滚动
- [x] 定时自动切换
- [x] 不定宽度滚动
- [x] 无缝循环滚动
- [x] 多级滚动

### 未来将实现
- [ ] 渐变滚动
- [ ] 视差效果

### 例子

[slider效果](https://warpcgd.github.io/vue-concise-slider/index.html)</br>
[完整文档](https://github.com/warpcgd/vue-concise-slider/tree/gh-pages)

### 安装

```html
  npm install vue-concise-slider --save
```

### 如何使用

```html
<template>
  <slider :pages="pages" :sliderinit="sliderinit">
    <!-- slot  -->
  </slider>
</template>

<script>
import slider from 'vue-concise-slider'// 引入slider组件
export default {
   el: '#app',
   data () {
      return {
        //图片列表[arr]
        pages:[
          {
            title: '',
            style:{
             background:'url(src/img/testimg-1.jpg)'
            }
          },
          {
           title: '',
           style:{
            background:'url(src/img/testimg-2.jpg)'
            }
          },
          {
            title: 'slide3',
            style:{
              background:'#4bbfc3',
            },
          }
        ],
        //滑动配置[obj]
        sliderinit: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:1000,//自动滚动[ms]
          loop:true,//循环滚动
          direction:'vertical',//方向设置，垂直滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
        }
      }
    },
    components: {
        slider
    }
}
</script>
```
### pages/初始化参数
<table width="100%">
<thead>
  <tr>
    <th width="20%">Option</th>
    <th width="15%">Type</th>
    <th width="15%">Default</th>
    <th width="50%">Description</th>
  </tr>
</thead>
<tbody>
  <tr align="center">
    <td><code>title</code></td>
    <td>string</td>
    <td>-</td>
    <td>当前设置为每页的标题，未来将直接输出html</td>
  </tr>
  <tr align="center">
    <td><code>style</code></td>
    <td>obj</td>
    <td>-</td>
    <td>直接作用在每个item上的style样式，可以输出背景图，背景色，每项宽度可自定义，自动切换为不定宽滚动</td>
  </tr>
 </tbody>
</table>

### sliderinit/初始化参数

<table width="100%">
<thead>
  <tr>
    <th width="20%">Option</th>
    <th width="15%">Type</th>
    <th width="15%">Default</th>
    <th width="50%">Description</th>
  </tr>
</thead>
<tbody>
  <tr align="center">
    <td><code>direction</code></td>
    <td>string</td>
    <td>'horizontal'</td>
    <td>方向设置，默认为水平滚动('horizontal'),可设置为垂直滚动('vertical')</td>
  </tr>
  <tr align="center">
    <td><code>currentPage</code></td>
    <td>number</td>
    <td>-</td>
    <td>当前为第几页</td>
  </tr>
  <tr align="center">
    <td><code>thresholdDistance</code></td>
    <td>number</td>
    <td>-</td>
    <td>滑动距离阈值</td>
  </tr>
  <tr align="center">
    <td><code>thresholdTime</code></td>
    <td>number</td>
    <td>-</td>
    <td>滑动时间阈值</td>
  </tr>
  <tr align="center">
    <td><code>autoplay</code></td>
    <td>number[ms]</td>
    <td>-</td>
    <td>自动播放:时间[ms]</td>
  </tr>
  <tr align="center">
    <td><code>loop</code></td>
    <td>boolean</td>
    <td>false</td>
    <td>循环滚动</td>
  </tr>
  <tr align="center">
    <td><code>infinite</code></td>
    <td>number</td>
    <td>1</td>
    <td>loop无缝滚动时,可以设置前后遍历数</td>
  </tr>
  <tr align="center">
    <td><code>slidesToScroll</code></td>
    <td>number</td>
    <td>1</td>
    <td>每次滑动切换的页数</td>
  </tr>
 </tbody>
</table>

### API/父级传递的事件

<table width="100%" align="center">
<thead>
  <tr>
    <th align="center" width="12.5%">Method</th>
    <th align="center" width="12.5%">Parameters</th>
    <th align="center" width="35%">Description</th>
    <th align="center" width="40%">Example</th>
  </tr>
</thead>
<tbody>
  <tr align="center">
    <td><code>slideTo</code></td>
    <td>number</td>
    <td>滑动到(number)页</td>
    <td><code>childComponents.$emit('slideTo', num)</code></td>
  </tr>
 <tr align="center">
    <td><code>slideNext</code></td>
    <td>-</td>
    <td>滑动到下一页</td>
    <td><code>childComponents.$emit('slideNext')</code></td>
  </tr>
  <tr align="center">
    <td><code>slideTo</code></td>
    <td>-</td>
    <td>滑动到上一页</td>
    <td><code>childComponents.$emit('slidePre')</code></td>
  </tr>
 </tbody>
</table>

### API/父级监听的事件

<table width="100%" align="center">
<thead>
  <tr>
    <th align="center" width="12.5%">Method</th>
    <th align="center" width="12.5%">Parameters</th>
    <th align="center" width="35%">Description</th>
    <th align="center" width="40%">Example</th>
  </tr>
</thead>
<tbody>
  <tr align="center">
    <td><code>slide</code></td>
    <td>number</td>
    <td>当前滑动到第(number)页</td>
    <td><code>childComponents.$on('slide', function(pagenum){console.log(pagenum)})</code></td>
  </tr>
 </tbody>
</table>

### 有更好的想法？
欢迎来留下你的意见:https://github.com/warpcgd/vue-concise-slider/issues/1

### BUG？oh no!
可以在这里提交,会尽快处理:https://github.com/warpcgd/vue-concise-slider/issues/2
