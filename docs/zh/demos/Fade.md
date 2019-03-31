---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
Fade
:::

::: slot content
<common-demoCode>
  <effect-sliderFade></effect-sliderFade>
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
            'background': '#4abf8a'
          }
          },
          {
            html: 'slider2',
            style: {
              background: '#4bbfc3'
            }
          },
          {
            html: 'slider3',
            style: {
              background: '#333'
            }
          }
        ],
        options: {
          effect: 'fade',
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
  effect: 'fade',
  loop: true
}
```
:::
