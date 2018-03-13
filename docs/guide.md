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
      <slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
          <!-- Set loading -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import slider from 'vue-concise-slider'// import slider components
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
        sliderinit: {
          currentPage: 0,
          thresholdDistance: 500,
          thresholdTime: 100,
          autoplay:1000,
          loop:true,
          direction:'vertical',
          infinite:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          duration: 300
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
      -webkit-animation: loading-7 .7s ease-in 0s infinite;
      animation: loading-7 .7s ease-in 0s infinite;
    }
    .loadingDot i:nth-child(2) {
      -webkit-animation: loading-7 .7s ease-in 0.15s infinite;
    }
    .loadingDot i:nth-child(3) {
      -webkit-animation: loading-7 .7s ease-in 0.3s infinite;
    }
    .loadingDot i:nth-child(4) {
      -webkit-animation: loading-7 .7s ease-in 0.45s infinite;
    }
  </style>
  <slider :pages="someList" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
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

## Asynchronous loading

1.`someList` set `empty array([])`

2.The asynchronous data is assigned directly to the format `someList`
```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :pages="someList" :sliderinit="sliderinit" >
        </slider>
      </div>
  </template>
  <script>
  import slider from '../components/slider'
  export default {
    el: '#sliderbasic',
    data () {
      return {
        // someList
        someList: [],
        sliderinit: {
          currentPage: 1,
          thresholdDistance: 100,
          thresholdTime: 300,
          duration: 300,
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
        <slider ref="slider" :pages="someList" :sliderinit="sliderinit" >
        </slider>
      </div>
  </template>
  <script>
  import slider from '../components/slider'
  export default {
    el: '#sliderbasic',
    data () {
      return {
        // someList
        someList: [],
        sliderinit: {
          effect: 'fade',
          currentPage: 1,
          thresholdDistance: 100,
          thresholdTime: 300,
          duration: 300,
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
2. someList data needs to set at least the width (% or PX)

```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :pages="someList" :sliderinit="sliderinit" >
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
      sliderinit: {
          effect: 'coverflow',
          currentPage: 1,
          tracking: false,
          thresholdDistance: 100,
          thresholdTime: 300,
          deviation: 200,
          widthScalingRatio: 0.8,
          heightScalingRatio: 0.8,
          infinite: 2,
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

```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :pages="someList" :sliderinit="sliderinit">
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
      sliderinit: {
          currentPage: 1,
          thresholdDistance: 100,
          thresholdTime: 300,
          duration: 300,
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
            props: ['item', 'sliderinit', 'pages'],
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

