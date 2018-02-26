<style lang="sass">
@import "../utils/common.scss"
</style>
<template>
  <div>
    <div style="width:70%;margin:20px auto;height:400px">
      <slider ref="slider" :pages="someList" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
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
    <div class="sliderButton">
      <button @click="slidePre">上一页/pre</button>
      <button @click="slideNext">下一页/next</button>
      <button @click="appendslider">添加一页/append</button>
      <button @click="turnTo(2)">跳转到第三页/turnTo</button>
      <button @click="autoplayStart">启动自动滚动/autoplayStart</button>
      <button @click="autoplayStop">停止自动滚动/autoplayStop</button>
      <button @click="loadingShow">loading显示/loadingShow</button>
      <button @click="loadingHide">loading关闭/loadingHide</button>
    </div>
  </div>
</template>
<script>
import slider from '../components/slider'
export default {
  el: '#sliderExtend',
  data () {
    return {
      someList: [],
      sliderinit: {
        currentPage: 1,
        tracking: false,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        loop: true // 无限循环
        // autoplay:1000,//自动播放:时间[ms]
      }
    }
  },
  components: {
    slider
  },
  mounted () {
    let that = this
    setTimeout(function () {
      that.someList = [
        {
          html: '<div class="slide1">slide1</div>',
          style: {
            'background': '#1bbc9b'
          },
          component: {
            data() {
              return {
                img: 'data:image/jpeg;base64,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'
              }
            },
            template: `<div><img :src="img" /><p style="position: absolute; margin: 0; right: 10px; bottom: 10px; font-size: 16px;">插入的说明文字</p></div>`
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
  methods: {
    turnTo (num) {
      // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
      this.$refs.slider.$emit('slideTo', num)
    },
    slideNext () {
      this.$refs.slider.$emit('slideNext')
      // slider.$emit('slideNext')
    },
    slidePre () {
      this.$refs.slider.$emit('slidePre')
      // slider.$emit('slidePre')
    },
    autoplayStart () {
      this.$refs.slider.$emit('autoplayStart')
      // slider.$emit('slidePre')
    },
    autoplayStop () {
      this.$refs.slider.$emit('autoplayStop')
      // slider.$emit('slidePre')
    },
    appendslider () {
      this.someList.push({
        html: 'slidernew',
        style: {
          background: '#333',
          color: '#fff'
        }
      })
    },
    loadingShow () {
      this.$refs.slider.$emit('loadingShow')
      // slider.$emit('slidePre')
    },
    loadingHide () {
      this.$refs.slider.$emit('loadingHide')
      // slider.$emit('slidePre')
    },
    // 监听事件发生了变化,需要指向一个子组件实例
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
