<template>
  <div>
    <div style="width:100%;margin:20px auto;height:211px">
      <slider ref="slider" :options="options">
        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.text}}</slideritem>
      </slider>
    </div>
  </div>
</template>
<script>
import slider from '../slider/slider.vue'
import slideritem from '../slider/slider_item.vue'
export default {
  data () {
    return {
      someList: [],
      options: {
        currentPage: 0,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 1000, // 滑动时间阈值判定
        loopedSlides: 3, // 多级滚动时，需要添加前后遍历数
        slidesToScroll: 1, // 需要滚动页面的数量
        loop: true // 无限循环 // 滑动速度
        // timingFunction: 'ease', // 滑动方式
        // loop: false, // 无限循环
        // autoplay: 0 // 自动播放:时间[ms]
      }
    }
  },
  mounted () {
    let that = this
    that.someList = [
      {
          text: 'Swipe',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Drag',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Responsive',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'CSS3',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Fast',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Easy',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Free',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Upgradable',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Infinity',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        },
        {
          text: 'Auto Width',
          style: {
            'background': '#1bbc9b',
            'width': '32%',
            'margin-right': '2%'
          }
        }
    ]
  },
  components: {
    slider,
    slideritem
  }
}
</script>
