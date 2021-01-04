---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
Center
:::

::: slot content
<common-demoCode>
  <effect-sliderCenter></effect-sliderCenter>
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
              'width': '600px'
            }
          },
          {
            html: 'slider2',
            style: {
              'background': '#4bbfc3',
              'width': '600px'
            }
          },
          {
            html: 'slider3',
            style: {
              'background': '#7baabe',
              'width': '600px'
            }
          },
          {
            html: 'slide4',
            style: {
              'background': '#4abf8a',
              'width': '600px'
            }
          },
          {
            html: 'slide5',
            style: {
              'background': '#4bbfc3',
              'width': '600px'
            }
          },
          {
            html: 'slide6',
            style: {
              'background': '#7baabe',
              'width': '600px'
            }
          }
        ],
        //Slider configuration [obj]
        options: {
          currentPage: 0,
          speed: 300,
          itemAnimation: true,
          centeredSlides: true,
          thresholdDistance: 100,
          thresholdTime: 300,
          loopedSlides: 2,
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
  vue-concise-slider 实现的基础例子
  1. By configuring options
``` js
options: {
  itemAnimation: true,
  centeredSlides: true,
  loopedSlides: 2,
  slidesToScroll: 1,
  loop: true
}
```
  2. Set css
``` html
.slider-item {
  transform:scale(0.8);
  transition-timing-function: ease;
  transition-duration: 300ms;
}
.slider-item.slider-active {
  transform:scale(1.0);
  z-index: 999;
}
.slider-item.slider-active-copy {
  transform:scale(1.0);
  z-index: 999;
}
```

:::
