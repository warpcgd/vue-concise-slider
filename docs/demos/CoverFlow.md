---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
CoverFlow
:::

::: slot content
<common-demoCode>
  <effect-sliderCoverFlow></effect-sliderCoverFlow>
  <div slot="codeText">
  
   ```html
<template>
<!-- Make a div wrapped slider,set height and width -->
 <div style="width:100%;margin:20px auto;height:400px">
      <!-- Using the slider component -->
      <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
          <!-- slideritem wrapped package with the components you need -->
          <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
// import slider components
import { slider, slideritem } from 'vue-concise-slider'
export default {
   el: '#app',
   data () {
      return {
        //data list [array]
        someList:[
          {
            html: 'slider1',
            style: {
              'background': '#4abf8a',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slider2',
            style: {
              'background': '#4bbfc3',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slider3',
            style: {
              'background': '#7baabe',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slider4',
            style: {
              'background': '#4abf8a',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slider5',
            style: {
              'background': '#4bbfc3',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slider6',
            style: {
              'background': '#7baabe',
              'width': '33.33333333%'
            }
          }
        ],
        //Slider configuration [obj]
        options: {
          effect: 'coverflow',
          currentPage: 0,
          thresholdDistance: 100, 
          thresholdTime: 300, 
          deviation: 200, 
          widthScalingRatio: 0.8, 
          heightScalingRatio: 0.8, 
          slidesToScroll: 1, 
          loop: true
        }
      }
    },
    components: {
      slider,
      slideritem
    }
}
</script>
```

  </div>
</common-demoCode>

 ### Overview
  vue-concise-slider example
  1. By configuring options
``` js
options: {
  effect: 'coverflow',
  deviation: 200,
  loop: true,
  widthScalingRatio: 0.8,
  heightScalingRatio: 0.8
}
```
  2. Implement a layout of three columns by setting the style of the slideritem
```html
style: {
  'width': '33.33333333%'
}
```
:::
