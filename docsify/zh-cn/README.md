## vue-concise-slider

> 一个简单的Vue滑动组件

## 它是什么

vue-concise-slider是一个简单的Vue滑动组件,配置简单,支持自适应/全屏,按钮,分页,兼容移动端和PC端

查看 [快速开始](#安装) 了解详情

## 特点

* 简单配置
* 轻量 (~36kB)
* 多种滑动样式

## 安装

```html
  npm install vue-concise-slider --save
```

## 快速开始

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


## 有更好的想法？
欢迎来留下你的意见:https://github.com/warpcgd/vue-concise-slider/issues/1

## BUG？oh no!
可以在这里提交,会尽快处理:https://github.com/warpcgd/vue-concise-slider/issues/2



<script v-pre type="text/x-template" id="example">
  <template>
      <slider :pages="pages" :options="options">
      <!-- slot  -->
      </slider>
  </template>

  <script>
    // import slider from 'vue-concise-slider'
    import slider from 'module.js'
    // export default
    module.exports = {
         components: {
              slider
         },
         data () {
            return {
              //image list
              pages:[
                {
                  html: 'slide1',
                  style:{
                   'background': '#1bbc9b'
                  }
                },
                {
                 html: 'slide2',
                 style:{
                    background:'#4bbfc3'
                  }
                },
                {
                  html: 'slide3',
                  style:{
                    background:'#333'
                  },
                }
              ],
              //Sliding configuration
              options: {
                currentPage: 0,
                thresholdDistance: 100,
                thresholdTime: 300,
                loop:true,
                loopedSlides:1,
                slidesToScroll:1,
                direction:'horizontal',
                autoplay:0
              }
            }
         }
    }
  </script>
</script>