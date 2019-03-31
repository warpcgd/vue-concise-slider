---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
Basic
:::

::: slot content
<common-demoCode>
  <effect-sliderBasic></effect-sliderBasic>
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
        ],
        //Slider configuration [obj]
        options: {
          pagination: true,
          thresholdDistance: 100, // Sliding distance threshold
          thresholdTime: 300, // Sliding time threshold decision
          grabCursor: true, // Scratch style
          speed: 300 // Sliding speed
          // timingFunction: 'ease', // Sliding mode
          // loop: false, // Infinite loop
          // autoplay: 0 // Auto play[ms]
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
  1. Configure the slider effect through options
  2. Wrap content that needs to be swiped through slideritem
  3. Set loading slot configuration loading information
:::
