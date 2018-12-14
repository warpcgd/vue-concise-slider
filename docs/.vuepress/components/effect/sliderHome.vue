<template>
    <div style="width:100%;height:250px">
      <slider ref="slider" :options="options">
        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.text}}</slideritem>
      </slider>
    </div>
</template>
<script>
import slider from '../../slider/slider.vue'
import slideritem from '../../slider/slider_item.vue'
export default {
  data () {
    return {
      someList: [],
      options: {
        currentPage: 0,
        thresholdDistance: 30, // 滑动距离阈值判定
        thresholdTime: 1000, // 滑动时间阈值判定
        infinite: 3, // 多级滚动时，需要添加前后遍历数
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
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Drag',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Responsive',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'CSS3',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Fast',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Easy',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Free',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Upgradable',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Infinity',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
          }
        },
        {
          text: 'Auto Width',
          style: {
            'background': '#4abf8a',
            'width': '32%',
            'margin-right': '2%',
            "user-select":"none"
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
<style scoped>
  .slider-item {
    font-weight: 100;
    color: #FFF;
    text-align: center;
    font-style: italic;
  }
</style>
