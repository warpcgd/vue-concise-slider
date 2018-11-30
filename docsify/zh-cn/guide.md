## 快速开始

1.安装 `vue-concise-slider`

```html
  npm install vue-concise-slider --save
```

2.配置

```html
<template>
<!-- 制作一个框架包裹slider -->
 <div style="width:70%;margin:20px auto;height:400px">
      <!-- 配置slider组件 -->
      <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
          <slideritem v-for="(item,index) in pages" :key="index" :style="item.style">{{item.html}}</slideritem>
          <!-- 设置loading,可自定义 -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider' // 引入slider组件
export default {
   el: '#app',
   data () {
      return {
        //图片列表[arr]
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
        //滑动配置[obj]
        options: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:1000,//自动滚动[ms]
          loop:true,//循环滚动
          direction:'vertical',//方向设置，垂直滚动
          loopedSlides:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
          timingFunction: 'ease', // 滑动方式
          speed: 300, // 滑动时间
        }
      }
    },
    components: {
        slider
    },
    methods: {
      // 监听事件
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
## 使用slot渲染自定义page

1. 引入slider和slideritem
2. 不传入page数组，直接使用slideritem替代
3. coverflow模式下不可使用

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

## 配置loading
`<div slot="loading"></div>`里面包裹自定义的loading
```html
  <style>
    /*loadin特效*/
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
  <slider ref="slider" :pages="someList" :options="options">
      <!-- 设置loading,可自定义loadin特效 -->
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

## 异步加载
1.someList设置`空数组([])`

2.异步的数据直接按格式赋值someList
```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider :options="options">
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
        // someList留空
        someList: [],
        options: {
          currentPage: 1,//当前页面
          thresholdDistance: 100, // 滑动距离阈值判定
          thresholdTime: 300, // 滑动时间阈值判定
          speed: 300, // 滑动速度
          timingFunction: 'ease', // 滑动方式
          loop: true, // 无限循环
          autoplay: 0 // 自动播放:时间[ms]
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // 拿回来的图片数据可以直接赋值someList
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

## 渐变滚动

1.effect配置`fade`,可设置loop为`true`,开启循环滑动

```html
  <template>
      <div style="width:70%;margin:20px auto;height:400px">
        <slider ref="slider" :options="options">
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
        // someList留空
        someList: [],
        options: {
          effect: 'fade',//滑动方式
          currentPage: 1,//当前页面
          thresholdDistance: 100, // 滑动距离阈值判定
          thresholdTime: 300, // 滑动时间阈值判定
          speed: 300, // 滑动速度
          timingFunction: 'ease', // 滑动方式
          loop: true, // 无限循环
          autoplay: 0 // 自动播放:时间[ms]
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // 拿回来的图片数据可以直接赋值someList
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

## 旋转滚动

1. effect配置`coverflow`,可设置loop为`true`,开启循环滑动
2. 必须使用`template`包裹`slideritem`
3. slideritem需要传入总页数`pageLength`，以及当前序号`index`

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
  import { slider } from 'vue-concise-slider'
  export default {
    el: '#slidercoverflow',
    data () {
      return {
      someList: [],
      options: {
          effect: 'coverflow',
          currentPage: 1,
          tracking: false,
          thresholdDistance: 100, // 滑动距离阈值判定
          thresholdTime: 300, // 滑动时间阈值判定
          deviation: 200, // 偏移值
          widthScalingRatio: 0.8, // 宽度缩放比例
          heightScalingRatio: 0.8, // 高度缩放比例
          loopedSlides: 2, // 多级滚动时，需要添加前后遍历数
          slidesToScroll: 1, // 需要滚动页面的数量
          loop: true // 无限循环
          // autoplay: 1000 // 自动播放:时间[ms]
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // 拿回来的图片数据可以直接赋值someList
        that.someList = [
          {
            html: 'slide1',
            style: {
              'background': '#1bbc9b',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slide2',
            style: {
              'background': '#4bbfc3',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slide3',
            style: {
              'background': '#7baabe',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slide4',
            style: {
              'background': '#1bbc9b',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slide5',
            style: {
              'background': '#4bbfc3',
              'width': '33.33333333%'
            }
          },
          {
            html: 'slide6',
            style: {
              'background': '#7baabe',
              'width': '33.33333333%'
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

## pages使用动态组件

1. pages中传入动态组件属性'component'
2. v3.0.0 以上版本不支持

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
          effect: 'coverflow',
          currentPage: 1,
          tracking: false,
          thresholdDistance: 100, // 滑动距离阈值判定
          thresholdTime: 300, // 滑动时间阈值判定
          deviation: 200, // 偏移值
          widthScalingRatio: 0.8, // 宽度缩放比例
          heightScalingRatio: 0.8, // 高度缩放比例
          loopedSlides: 2, // 多级滚动时，需要添加前后遍历数
          slidesToScroll: 1, // 需要滚动页面的数量
          loop: true // 无限循环
          // autoplay: 1000 // 自动播放:时间[ms]
        }
      }
    },
    mounted () {
      let that = this
      setTimeout(function () {
        // 拿回来的图片数据可以直接赋值someList
        that.someList = [{
          html: '<div class="slide1">slide1</div>',
          style: {
            'background': '#1bbc9b'
          },
          // 对slider的扩展，如果需要对某一页banner添加说明或其他不同的需求，可以通过定义component来进行扩展
          component: {
            props: ['item', 'options', 'pages'],
            data () {
              return {
                img: 'src/img/testimg-1.jpg'
              }
            },
            mounted () {
              console.log(this.item)
            },
            template: '<div><img style="width: 100%" :src="img" /><p style="position: absolute; margin: 0; right: 10px; bottom: 10px; font-size: 16px;">test1</p></div>'
          }
        },
        {
          html: 'slide2',
          style: {
            'background': '#4bbfc3'
          },
          component: {
            props: ['item', 'options', 'pages'],
            data () {
              return {
                img: 'src/img/testimg-2.jpg'
              }
            },
            mounted () {
              console.log(this.item)
            },
            template: '<div><img style="width: 100%" :src="img" /><p style="position: absolute; margin: 0; right: 10px; bottom: 10px; font-size: 16px;">test2</p></div>'
          }
        },
        {
          html: 'slide3',
          style: {
            'background': '#7baabe'
          },
          component: {
            props: ['item', 'options', 'pages'],
            data () {
              return {
                img: 'src/img/testimg-3.jpg'
              }
            },
            mounted () {
              console.log(this.item)
            },
            template: '<div><img style="width: 100%" :src="img" /><p style="position: absolute; margin: 0; right: 10px; bottom: 10px; font-size: 16px;">test3</p></div>'
          }
        }]
      }, 2000)
    },
    components: {
      slider
    }
  }
  </script>
```

## 使用自定义分页

1. pagination 设为 true
2. 设置renderPagination函数

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

## 嵌套轮播

1. effect设置为'nest'
2. slideritem进行嵌套

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
        <div slot="loading">
          <div class="loadingDot">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
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