---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
RenderPagination
:::

::: slot content
<common-demoCode>
  <effect-sliderRenderPagination></effect-sliderRenderPagination>
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
          currentPage: 0,
          pagination: true,
          renderPagination: (h, index) => {
            return h('div', {
              class: 'swiper-pagination-bullet'
            }, [index])
          },
          loop: true // 无限循环
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
  renderPagination: (h, index) => {
    return h('div', {
      class: 'swiper-pagination-bullet'
    }, [index])
  },
  pagination: true
}
```
:::
