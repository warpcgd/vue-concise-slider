<template>
  <div style="width:100%;height:250px">
    <slider ref="slider" :options="options">
      <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
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
</template>
<script>
import slider from '../../slider/slider.vue'
import slideritem from '../../slider/slider_item.vue'
export default {
  data () {
    return {
      someList: [],
      options: {
        currentPage: 0
        // tracking: false,
        // thresholdDistance: 100, // 滑动距离阈值判定
        // thresholdTime: 300 // 滑动时间阈值判定
        // 不定宽度的无限循环感觉很丑:(
        // loop:true, // 无限循环
        // autoplay:1000 // 自动播放:时间[ms]
      }
    }
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.someList = [
        {
          html: '1',
          style: {
            'background': '#4abf8a',
            'width': '80%',
            'margin-right': '20px'
          }
        },
        {
          html: '2',
          style: {
            'background': '#4bbfc3',
            'width': '60%',
            'margin-right': '20px'
          }
        },
        {
          html: '3',
          style: {
            'background': '#7baabe',
            'width': '40%',
            'margin-right': '20px'
          }
        }
      ]
    }, 1000)
  },
  components: {
    slider,
    slideritem
  }
}
</script>
<style scoped>
  @keyframes loading-7{ 
  0%{margin-bottom:0}
  50%{margin-bottom:20px;}
  100%{margin-bottom:0px;}
  }
  @-webkit-keyframes loading-7{
  0%{margin-bottom:0}
  50%{margin-bottom:20px;}
  100%{margin-bottom:0px;}
  }
  .loadingDot i {
    display: inline-block;
    margin-left: 5px;
    background: rgb(27, 188, 155);
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .loadingDot i:nth-child(1) {
    -webkit-animation: loading-7 .7s ease-in 0s infinite;
    animation: loading-7 .7s ease-in 0s infinite;
  }
  .loadingDot i:nth-child(2) {
    -webkit-animation: loading-7 .7s ease-in 0.15s infinite;
    animation: loading-7 .7s ease-in 0.15s infinite;
  }
  .loadingDot i:nth-child(3) {
    -webkit-animation: loading-7 .7s ease-in 0.3s infinite;
    animation: loading-7 .7s ease-in 0.3s infinite;
  }
  .loadingDot i:nth-child(4) {
    -webkit-animation: loading-7 .7s ease-in 0.45s infinite;
    animation: loading-7 .7s ease-in 0.45s infinite;
  }
</style>