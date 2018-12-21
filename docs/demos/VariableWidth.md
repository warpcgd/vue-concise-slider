---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
VariableWidth
:::

::: slot content
<common-demoCode>
  <effect-sliderVariableWidth></effect-sliderVariableWidth>
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
              'background': '#1bbc9b',
              'width': '80%',
              'margin-right': '20px'
            }
          },
          {
            html: 'slide2',
            style: {
              'background': '#4bbfc3',
              'width': '60%',
              'margin-right': '20px'
            }
          },
          {
            html: 'slide3',
            style: {
              'background': '#7baabe',
              'width': '40%',
              'margin-right': '20px'
            }
          }
        ],
        //Slider configuration [obj]
        options: {
          currentPage: 0
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
  1. Implement a layout of three columns by setting the style of the slideritem
```html
style: {
  'background': '#1bbc9b',
  'width': '80%',
  'margin-right': '20px'
}
```
:::
