<style>
.sliderButton{
  text-align: center;
}
.sliderButton button{
  display: inline-block;
  background: #fff;
  border-radius: 3px;
  /*width: 100px;*/
  height: 30px;
  border: 1px solid #333;
  line-height: 30px;
  margin-left: 10px;
  padding: 0 15px;
  margin-top: 10px;
}
</style>
<template>
  <div>
    <div style="width:70%;margin:20px auto;height:400px">
      <slider ref="sliderParent" :options="options" @slide='sliderParent'>
        <slideritem v-for="(item,index) in someList" :key="index" @tap="sliderParentClick" :style="item.style">{{item.html}}</slideritem>
      </slider>
    </div>
    <div style="width:70%;margin:20px auto;height:400px">
      <slider ref="slider" :options="options1" @slide='slide'>
        <slideritem>
          <slider :options="options2">
            <slideritem v-for="(item,index) in someList1" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
        <slideritem>
          <slider :options="options2">
            <slideritem v-for="(item,index) in someList2" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
        <slideritem>
          <slider :options="options2">
            <slideritem v-for="(item,index) in someList1" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
        <slideritem>
          <slider :options="options2">
            <slideritem v-for="(item,index) in someList1" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
         <slideritem>
          <slider :options="options2">
            <slideritem v-for="(item,index) in someList2" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
        <slideritem>
          <slider :options="options2">
            <slideritem v-for="(item,index) in someList1" :key="index" :style="item.style">{{item.html}}</slideritem>
          </slider>
        </slideritem>
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
import slider from '../components/slider'
import slideritem from '../components/slider_item'
export default {
  el: '#slidernest',
  data () {
    return {
      someList: [],
      someList1: [],
      someList2: [],
      slideData: {},
      parentSlideData: {},
      options: {
        currentPage: 0,
        tracking: false,
        centeredSlides: true,
        pagination: false,
        slidesPerView: 3,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        loopedSlides: 3, // 多级滚动时，需要添加前后遍历数
        slidesToScroll: 3, // 需要滚动页面的数量
        loop: false // 无限循环
        // autoplay: 1000 // 自动播放:时间[ms]
      },
      options1: {
        // direction: 'vertical',
        effect: 'nest',
        pagination: false,
        // nested: false, // 嵌套
        thresholdDistance: 50, // 滑动距离阈值判定
        thresholdTime: 1000, // 滑动时间阈值判定
        grabCursor: true, // 抓标样式
        speed: 300, // 滑动速度
        // timingFunction: 'ease', // 滑动方式
        loop: false // 无限循环
        // autoplay: 0 // 自动播放:时间[ms]
      },
      options2: {
        // direction: 'vertical',
        pagination: true,
        thresholdDistance: 50, // 滑动距离阈值判定
        thresholdTime: 1000, // 滑动时间阈值判定
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
            'background': '#1bbc9b',
            'width': '33%',
            'margin-right': '0.33333%'
          }
        },
        {
          html: 'slide2',
          style: {
            'background': '#4bbfc3',
            'width': '33%',
            'margin-right': '0.33333%'
          }
        },
        {
          html: 'slide3',
          style: {
            'background': '#7baabe',
            'width': '33%',
            'margin-right': '0.33333%'
          }
        },
        {
          html: 'slide4',
          style: {
            'background': '#333',
            'width': '33%',
            'margin-right': '0.33333%'
          }
        },
        {
          html: 'slide5',
          style: {
            'background': '#333',
            'width': '33%',
            'margin-right': '0.33333%'
          }
        },
        {
          html: 'slide6',
          style: {
            'background': '#333',
            'width': '33%',
            'margin-right': '0.33333%'
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
      that.someList2 = [
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
        },
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
  components: {
    slider,
    slideritem
  },
  methods: {
    sliderParentClick (data) {
      // console.log(data)
      // debugger
      if (this.parentSlideData.currentPage !== data.index) {
        this.$refs.sliderParent.$emit('slideTo', data.index)
        this.$refs.slider.$emit('slideTo', data.index)
      }
    },
    // 监听事件发生了变化,需要指向一个子组件实例
    slide (data) {
      this.slideData = data
      if (this.slideData.currentPage !== this.parentSlideData.currentPage) {
        this.$refs.sliderParent.$emit('slideTo', data.currentPage)
      } else {
        return
      }
    },
    sliderParent (data) {
      this.parentSlideData = data
    }
  }
}
</script>
