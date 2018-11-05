中文 | [English](https://github.com/warpcgd/vue-concise-slider/blob/master/README_EN.md)

## vue-concise-slider

[![npm](https://img.shields.io/npm/v/vue-concise-slider.svg)](https://www.npmjs.com/package/vue-concise-slider)
[![npm](https://img.shields.io/npm/dw/vue-concise-slider.svg)](https://www.npmjs.com/package/vue-concise-slider)
[![npm](https://img.shields.io/github/size/warpcgd/vue-concise-slider/dist/module.js.svg)](https://www.npmjs.com/package/vue-concise-slider)

![](vue-slider-github.jpg)
* * *
vue-concise-slider,一个简单的滑动组件,配置简单,支持自适应/全屏+按钮+分页,同时兼容移动端和PC端

## 版本
[v3.3.0](https://github.com/warpcgd/vue-concise-slider/issues/29) 支持vue2.0+

## 特点
* 简单配置
* 轻量 (~31kB gzipped)
* 多种滑动样式

### 目前已实现
- [x] 全屏自适应
- [x] 移动端兼容
- [x] 垂直滚动
- [x] 定时自动切换
- [x] 不定宽度滚动
- [x] 无缝循环滚动
- [x] 多级滚动
- [x] 渐变滚动
- [x] 旋转滚动
- [x] page中加入自定义组件
- [x] 使用slot替代page
- [x] 自定义分页
- [x] 居中滑动
- [x] 新的coverflow
- [x] 层级嵌套slider
### 未来将实现
- [ ] 虚拟slider

### 链接

- [文档](https://warpcgd.github.io/vue-concise-slider/)
- [demo](https://warpcgd.github.io/vue-concise-slider/demo/)

### 安装

```html
  npm install vue-concise-slider --save
```

### 如何使用

```html
<template>
<!-- 制作一个框架包裹slider -->
 <div style="width:70%;margin:20px auto;height:400px">
      <!-- 配置slider组件 -->
      <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
          <!-- 直接使用slideritem slot -->
           <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
          <!-- 设置loading,可自定义 -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'// import slider components
export default {
   el: '#app',
   data () {
      return {
        //Image list
        someList:[],
        //Sliding configuration [obj]
        options: {
          currentPage: 0,
          thresholdDistance:500,
          thresholdTime:100,
          autoplay:1000,
          loop:true,
          direction:'vertical',
          loopedSlides:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          speed: 300
        }
      }
    },
    components: {
      slider,
      slideritem
    },
    mounted () {
      let that = this
      setTimeout(function () {
        that.someList = [
          {
            html: 'slide1',
            style: {
              'background': '#1bbc9b'
            }
          },
          {
            html: 'slide2',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: 'slide3',
            style: {
              'background': '#7baabe'
            }
          }
        ]
      }, 2000)
    },
    methods: {
      // Listener event
      slide (data) {
        console.log(data)
      },
      onTap (data) {
        console.log(data)
      },
      onInit (data) {
        console.log(data)
      }
    }
}
</script>
```

## 浏览器支持

现代浏览器及ie10+


## 贡献

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request



### 有更好的想法？
欢迎来留下你的意见:https://github.com/warpcgd/vue-concise-slider/issues/1

### BUG？oh no!
可以在这里提交,会尽快处理:https://github.com/warpcgd/vue-concise-slider/issues/2

### 联系作者
Webchat: warpcgd
