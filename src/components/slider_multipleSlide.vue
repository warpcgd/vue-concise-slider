<style lang="sass">
@import "../utils/common.scss"
</style>
<template>
<div>
  <slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
  <!-- slot  -->
  </slider>
  <div class="sliderButton">
  <button @click="slidePre">上一页</button>
  <button @click="slideNext">下一页</button>
  <button @click="appendslider">添加一页</button>
  <button @click="turnTo(2)">跳转到第三页</button>
  </div>
  </div>
</template>
<script>
import slider from './slider'
export default {
  el: '#slidermultipleSlide',
  data () {
    return {
      someList: [
        {
          title: 'slide1',
          style: {
            'background': '#1bbc9b',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide2',
          style: {
            'background': '#4bbfc3',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide3',
          style: {
            'background': '#7baabe',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide4',
          style: {
            'background': '#7caabe',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide5',
          style: {
            'background': '#1bbc9b',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide6',
          style: {
            'background': '#4bbfc3',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide7',
          style: {
            'background': '#7baabe',
            'width': '23.5%',
            'margin-right': '2%'
          }
        },
        {
          title: 'slide8',
          style: {
            'background': '#7caabe',
            'width': '23.5%',
            'margin-right': '2%'
          }
        }
      ],
      sliderinit: {
        currentPage: 0,
        tracking: false,
        thresholdTime: 500, // 滑动判定距离
        thresholdDistance: 100, // 滑动判定时间
        infinite: 4, // 多级滚动时，需要添加前后遍历数
        slidesToScroll: 4, // 需要滚动页面的数量
        loop: true // 无限循环
        // autoplay: 1000 // 自动播放:时间[ms]
      }
    }
  },
  components: {
    slider
  },
  methods: {
    turnTo (num) {
      // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
      this.$children[0].$emit('slideTo', num)
    },
    slideNext () {
      this.$children[0].$emit('slideNext')
    },
    slidePre () {
      this.$children[0].$emit('slidePre')
    },
    appendslider () {
      this.someList.push({
        title: 'slidernew',
        style: {
          background: '#333',
          color: '#fff',
          'width': '23.5%',
          'margin-right': '2%'
        }
      })
    },
     // 监听事件也发生了变化,需要指向一个子组件实例
    slide (pagenum) {
      console.log('currentPage:' + pagenum)
    }
  }
}
</script>
