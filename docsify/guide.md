## Quick start

1.install `vue-concise-slider`

```html
  npm install vue-concise-slider --save
```

2.configure

```html
<template>
<!-- Make a frame wrapped slider -->
 <div style="width:70%;margin:20px auto;height:400px">
      <!-- Configuring slider components -->
      <slider ref="slider" :pages="pages" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
          <slideritem v-for="(item,index) in pages" :key="index" :style="item.style">{{item.html}}</slideritem>
          <!-- Set loading -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider' // import slider components
export default {
   el: '#app',
   data () {
      return {
        //Image list
        pages:[
          {
          html: '<div class="slider1">slider1</div>',
          style: {
            'background': '#1bbc9b'
            }
          },
          {
            html: '<div class="slider2">slider2</div>',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: '<div class="slider3">slider3</div>',
            style: {
              'background': '#7baabe'
            }
          }
        ],
        //Sliding configuration [obj]
        options: {
          currentPage: 0,
          thresholdDistance: 500,
          thresholdTime: 100,
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
        slider
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

## Configuring loading
`<div slot="loading"></div>` Custom loading wrapped inside
```html
  <style>
    /*loadin*/
    @-webkit-keyframes loading-7{
      0%{margin-bottom:0}
      50%{margin-bottom:20px;}
      100%{margin-bottom:0px;}
    }
    .loadingDot .loading-7 i {
      display: inline-block;
      margin-left: 5px;
      background: #333;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    .loadingDot i:nth-child(1) {
      -webkit-animation: loading-7 .7s ease-in 0s loopedSlides;
      animation: loading-7 .7s ease-in 0s loopedSlides;
    }
    .loadingDot i:nth-child(2) {
      -webkit-animation: loading-7 .7s ease-in 0.15s loopedSlides;
    }
    .loadingDot i:nth-child(3) {
      -webkit-animation: loading-7 .7s ease-in 0.3s loopedSlides;
    }
    .loadingDot i:nth-child(4) {
      -webkit-animation: loading-7 .7s ease-in 0.45s loopedSlides;
    }
  </style>
  <slider :pages="someList" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- setting loading -->
      <div slot="loading">
        <div class="loadingDot">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
  </slider>
```
## Use slot to render a custom page

1. Import slider and slideritem
2. Do not pass in the page array, use slideritem instead
3. Cannot be used in coverflow mode

```html
  <template>
  <div>
    <div style="width:70%;margin:20px auto;height:400px">
      <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
      </slider>
    </div>
  </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'
export default {
  el: '#sliderbasic',
  data () {
    return {
      someList: [],
      options: {
        pagination: true,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        speed: 300 // 滑动速度
      }
    }
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
  components: {
    slider,
    slideritem
  },
}
</script>
```

## Asynchronous loading

1.`someList` set `empty array([])`

2.The asynchronous data is assigned directly to the format `someList`
```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :options="options" >
            <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
        </slider>
      </div>
  </template>
  <script>
  import { slider, slideritem } from 'vue-concise-slider'
  export default {
    el: '#sliderbasic',
    data () {
      return {
        // someList
        someList: [],
        options: {
          currentPage: 1,
          thresholdDistance: 100,
          thresholdTime: 300,
          speed: 300,
          timingFunction: 'ease',
          loop: true,
          autoplay: 0
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // Picture data can be assigned directly to someList
        that.someList = [
          {
            html: '<div class="slide1">slide1</div>',
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
    components: {
      slider
    }
  }
  </script>
```
## Fade Effect

1.effect set `fade`,and loop set `true`,Openning cycle slip

```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :options="options" >
          <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
        </slider>
      </div>
  </template>
  <script>
  import { slider, slideritem } from 'vue-concise-slider'
  export default {
    el: '#sliderbasic',
    data () {
      return {
        // someList
        someList: [],
        options: {
          effect: 'fade',
          currentPage: 1,
          thresholdDistance: 100,
          thresholdTime: 300,
          speed: 300,
          timingFunction: 'ease',
          loop: true,
          autoplay: 0
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // Picture data can be assigned directly to someList
        that.someList = [
          {
            html: '<div class="slide1">slide1</div>',
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
    components: {
      slider
    }
  }
  </script>
```

## CoverFlow Effect

1. effect set `coverflow`,and loop set `true`,Openning cycle slip
2. You must use a template to wrap the slideritem
3. The total number of pages passed in `pageLength`, and the current serial number `index`

```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :options="options">
            <template slot-scope="coverflow">
              <slideritem v-for="(item,index) in someList" :pageLength="someList.length" :index="index" :key="index" :style="item.style">{{item.html}}</slideritem>
            </template>
        </slider>
      </div>
  </template>
  <script>
  import slider from '../components/slider'
  export default {
    el: '#sliderbasic',
    data () {
      return {
      someList: [],
      options: {
          effect: 'coverflow',
          currentPage: 1,
          tracking: false,
          thresholdDistance: 100,
          thresholdTime: 300,
          deviation: 200,
          widthScalingRatio: 0.8,
          heightScalingRatio: 0.8,
          loopedSlides: 2,
          slidesToScroll: 1,
          loop: true
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // Picture data can be assigned directly to someList
        that.someList = [
          {
            html: '<div class="slide1">slide1</div>',
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
    components: {
      slider
    }
  }
  </script>
```

## Pages uses dynamic components

1. The incoming dynamic component attribute 'component' in pages
2. V3.0.0 or later is not supported

```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :pages="someList" :options="options">
        </slider>
      </div>
  </template>
  <script>
  import slider from '../components/slider'
  export default {
    el: '#sliderbasic',
    data () {
      return {
      someList: [],
      options: {
          currentPage: 1,
          thresholdDistance: 100,
          thresholdTime: 300,
          speed: 300,
          timingFunction: 'ease',
          loop: true,
          autoplay: 0
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        that.someList = [
        {
          // If component is true, this HTML item is invalid
          html: '<div class="slide1">slide1</div>',
          style: {
            'background': '#1bbc9b'
          },
          component: {
            props: ['item', 'options', 'pages'],
            data() {
              return {
                //img src
                img: 'xxxxx.jpg'
              }
            },
            template: `<div><img :src="img" /><p>test</p>...</div>`
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
    components: {
      slider
    }
  }
  </script>
```
## Use custom paging

1. Pagination is set to true
2. Set the renderPagination function

```html
  <template>
  <div>
    <div style="width:70%;margin:20px auto;height:400px">
      <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
      </slider>
    </div>
  </div>
</template>
<script>
import { slider, slideritem } from '../../dist/module.js'
export default {
  el: '#sliderbasic',
  data () {
    return {
      someList: [],
      options: {
        pagination: true,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        speed: 300, // 滑动速度
        renderPagination: (h, index) => {
          return h('div', {
            class: 'swiper-pagination-bullet'
          }, [index])
        }
      }
    }
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
  components: {
    slider,
    slideritem
  },
}
</script>
```

## Nested slider

1. Effect is set to 'nest'
2. Slideritem nesting

```html
  <template>
  <div>
    <div style="width:70%;margin:20px auto;height:400px">
      <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
        <slideritem>
          <slider ref="slider" :options="options1">
            <slideritem v-for="(item,index) in someList1" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
        <slideritem v-for="(item,index) in someList" :key="index + 3" :style="item.style">{{item.html}}</slideritem>
      </slider>
    </div>
  </div>
</template>
<script>
import { slider, slideritem } from '../../dist/module.js'
export default {
  el: '#slidernest',
  data () {
    return {
      someList: [],
      someList1: [],
      options: {
        // direction: 'vertical',
        effect: 'nest',
        pagination: true,
        // nested: false, // 嵌套
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        grabCursor: true, // 抓标样式
        speed: 300, // 滑动速度
        // timingFunction: 'ease', // 滑动方式
        loop: true // 无限循环
        // autoplay: 0 // 自动播放:时间[ms]
      },
      options1: {
        direction: 'vertical',
        pagination: true,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        grabCursor: true, // 抓标样式
        speed: 300, // 滑动速度
        // timingFunction: 'ease', // 滑动方式
        loop: true // 无限循环
        // autoplay: 0 // 自动播放:时间[ms]
      }
    }
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
        }
      ]
      that.someList1 = [
        {
          html: 'slide1-1',
          style: {
            'background': '#1bbc9b'
          }
        },
        {
          html: 'slide2-2',
          style: {
            'background': '#4bbfc3'
          }
        },
        {
          html: 'slide3-3',
          style: {
            'background': '#7baabe'
          }
        }
      ]
    }, 2000)
  },
}
</script>
```