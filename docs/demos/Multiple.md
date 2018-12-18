---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
Multiple
:::

::: slot content
<common-demoCode>
  <effect-sliderMultiple></effect-sliderMultiple>
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
        that.someList = [
          {
            html: 'slider1',
            style: {
              'background': '#4abf8a',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider2',
            style: {
              'background': '#4bbfc3',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider3',
            style: {
              'background': '#7baabe',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider4',
            style: {
              'background': '#7caabe',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider5',
            style: {
              'background': '#4abf8a',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider6',
            style: {
              'background': '#4bbfc3',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider7',
            style: {
              'background': '#7baabe',
              'width': '23.5%',
              'margin-right': '2%'
            }
          },
          {
            html: 'slider8',
            style: {
              'background': '#7caabe',
              'width': '23.5%',
              'margin-right': '2%'
            }
          }
        ]
        //Slider configuration [obj]
        options: {
          currentPage: 0,
          tracking: false,
          thresholdDistance: 100,
          thresholdTime: 300,
          infinite: 4,
          slidesToScroll: 4,
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
  currentPage: 0,
  infinite: 4,
  slidesToScroll: 4,
  loop: true
}
```
  2. Implement a layout of three columns by setting the style of the slideritem
```html
style: {
  'background': '#7caabe',
  'width': '23.5%',
  'margin-right': '2%'
}
```
:::
