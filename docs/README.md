## vue-concise-slider

> A simple sliding component

## What is it

vue-concise-slider,A simple sliding component,has easy configuration,supported self-adaption / fullscreen / page,and is compatible with mobile and PC terminal

See the [Quick start](#Quick start) for more details

## Features

* Simple configuration
* Simple and lightweight (~30kB)
* Multiple sliding effects

## Install

```html
  npm install vue-concise-slider --save
```

## start

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


## Have a better idea？
Welcome to leave your opinion:https://github.com/warpcgd/vue-concise-slider/issues/1

## BUG？oh no!
You can be submitted here, and i will be dealt with as soon as possible:https://github.com/warpcgd/vue-concise-slider/issues/2



<script v-pre type="text/x-template" id="example">
  <template>
      <slider :options="options">
        <slideritem v-for="(item,index) in pages" :key="index" :style="item.style">{{item.html}}</slideritem>
      </slider>
  </template>

  <script>
    // import slider from 'vue-concise-slider'
    import { slider, slideritem } from 'module.js'
    // export default
    module.exports = {
         components: {
              slider,
              slideritem
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
