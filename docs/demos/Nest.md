---
sidebar: false
---
<common-demoItem></common-demoItem> 
::: slot name
Nest
:::

::: slot content
<common-demoCode>
  <effect-sliderNest></effect-sliderNest>
  <div slot="codeText">
  
   ```html
<template>
<!-- Make a div wrapped slider,set height and width -->
 <div style="width:100%;margin:20px auto;height:400px">
      <!-- Using the slider component -->
      <slider ref="slider" :options="options">
          <!-- slideritem wrapped package with the components you need -->
          <slideritem v-for="(item,index) in someList" :key="item.html" :style="item.style">{{item.html}}</slideritem>
          <slideritem>
            <slider ref="slider" :options="options1">
              <slideritem v-for="(item,index) in someList1" :key="item.html" :style="item.style">{{item.html}}</slideritem>
            </slider>
          </slideritem>
          <slideritem v-for="(item,index) in someList" :key="item.html + 3" :style="item.style">{{item.html}}</slideritem>
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
          }
        ],
        someList1:[
          {
            html: 'slider2-1',
            style: {
              'background': '#4abf8a'
            }
          },
          {
            html: 'slider2-2',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: 'slider3-3',
            style: {
              'background': '#7baabe'
            }
          }
        ],
        //Slider configuration [obj]
        options: {
          // direction: 'vertical',
          effect: 'nest',
          pagination: true,
          thresholdDistance: 100,
          thresholdTime: 300,
          grabCursor: true,
          speed: 300,
          loop: true
        },
        options1: {
          effect: 'nest',
          direction: 'vertical',
          pagination: true,
          thresholdDistance: 100,
          thresholdTime: 300,
          grabCursor: true,
          speed: 300,
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
  renderPagination: (h, index) => {
    return h('div', {
      class: 'swiper-pagination-bullet'
    }, [index])
  }
}
```
:::
