<template>
    <div class='slider-container' :class = 'temporaryData.containerClass'>
      <div class='slider-touch'
      :style="styleobj"
      @touchmove.stop.capture.prevent="swipeMove"
      @touchstart.stop.capture.prevent="swipeStart"
      @touchend.stop.capture.prevent="swipeEnd"
      @mousedown.stop.capture.prevent="swipeStart"
      @mouseup.stop.capture.prevent="swipeEnd"
      @mousemove.stop.capture.prevent="swipeMove"
      @webkit-transition-end="onTransitionEnd"
      @transitionend="onTransitionEnd"
      >
      <!-- 组件在 vm.currentview 变化时改变！ -->
      <component :pages="pages" :sliderinit="sliderinit" :basicdata="basicdata" :temporarydata="temporaryData" v-bind:is="currentView"></component>
      </div>
      <div class="slider-pagination slider-pagination-bullets">
        <template v-for="n in pagenums">
          <span @click='slide(n-1)' class="slider-pagination-bullet" :class="n-1 === basicdata.currentPage? 'slider-pagination-bullet-active':''"></span>
        </template>
      </div>
      <div class="slider-loading" v-show="!pagenums||temporaryData.loading">
        <slot name="loading"></slot>
      </div>
    </div>
</template>
<script>
import detectPrefixes from '../utils/detect-prefixes.js'
import sliderBasic from './slider_basic.vue'
import sliderBasicLoop from './slider_basic_loop.vue'
import sliderFade from './slider_fade.vue'
import sliderCoverflow from './slider_coverflow.vue'
export default {
  props: ['sliderinit', 'pages'],
  data () {
    return {
      basicdata: {
        poswidth: '0',
        posheight: '0',
        start: {},
        end: {},
        currentPage: this.sliderinit.currentPage || 0,
        direction: ''
      },
      temporaryData: {
        prefixes: detectPrefixes(),
        transitionEnding: false,
        setIntervalid: '',
        effect: this.sliderinit.effect || 'slide',
        tracking: false,
        thresholdDistance: this.sliderinit.thresholdDistance || 100,
        thresholdTime: this.sliderinit.thresholdTime || 500,
        animation: false,
        loading: false,
        containerClass: {
          'swiper-container-vertical': false
        },
        pageInit: false,
        widthScalingRatio: this.sliderinit.widthScalingRatio || 0.8,
        heightScalingRatio: this.sliderinit.heightScalingRatio || 0.8,
        deviation: this.sliderinit.deviation || 200,
        currentPage: this.sliderinit.currentPage || 0,
        pageWidth: 0,
        pageHeight: 0
      }
    }
  },
  computed: {
    // 动画执行obj
    styleobj: function () {
      let style = {}
      style['transform'] = 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)'
      style[this.temporaryData.prefixes.transition + 'TimingFunction'] = this.sliderinit.timingFunction || 'ease'
      style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? this.sliderinit.duration || 300 : 0) + 'ms'
      if (this.temporaryData.effect === 'fade' || this.temporaryData.effect === 'coverflow') {
        return {}
      }
      return style
    },
    // pagenum滑动数
    pagenums: function () {
      if (this.pages.length && !this.temporaryData.pageInit) {
        this.temporaryData.pageInit = true
        this.$nextTick(() => {
          this.slide(this.basicdata.currentPage, 'animationnone')
        })
      }
      return this.pages.length
    },
    currentView: function () {
      if (this.temporaryData.effect === 'slide') {
        return this.sliderinit.loop ? 'basicLoop' : 'basic'
      }
      if (this.temporaryData.effect === 'fade') {
        return this.sliderinit.loop ? 'fadeLoop' : 'fade'
      }
      if (this.temporaryData.effect === 'coverflow') {
        return this.sliderinit.loop ? 'coverflow' : 'coverflow'
      }
    },
    // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点
    currentWidth: {
      get: function () {
        if (!this.pages.length || this.temporaryData.effect === 'fade' || this.temporaryData.effect === 'coverflow') {
          return 0
        }
        let $slider
        let lastPage = this.basicdata.currentPage
        let pageWidth = this.temporaryData.pageWidth
        // let srollbar = false
        if (this.sliderinit.loop) {
          if (this.sliderinit.infinite) {
            lastPage = this.basicdata.currentPage + (this.sliderinit.infinite <= this.pagenums ? this.sliderinit.infinite : this.pagenums)
          } else {
            lastPage = this.basicdata.currentPage + 1
          }
        }
        if (this.sliderinit.effect === 'coverflow') {
          lastPage -= 1
        }
        // 获取slideritem子集
        for (let item in this.$el.children) {
          if (/slider-touch/ig.test(this.$el.children[item].className)) {
            $slider = this.$el.children[item]
          }
        }
        // 遍历子集
        let $sliderChildren = $slider.children[0].children
        let offsetLeft = $sliderChildren[lastPage].offsetLeft
        if (this.sliderinit.loop) {
          offsetLeft = $sliderChildren[lastPage].offsetLeft
        }
        return offsetLeft + pageWidth - pageWidth
      }
    },
    currentHeight () {
      if (!this.pages.length || this.temporaryData.effect === 'fade') {
        return 0
      }
      let posheight = 0
      let $slider
      let lastPage = this.basicdata.currentPage - 1
      let pageWidth = this.temporaryData.pageWidth
      // let srollbar = false
      if (this.sliderinit.loop) {
        if (this.sliderinit.infinite) {
          lastPage = this.basicdata.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length) - 1
        } else {
          lastPage = this.basicdata.currentPage + 1
        }
      }
      // 获取slideritem子集
      for (let item in this.$el.children) {
        if (/slider-touch/ig.test(this.$el.children[item].className)) {
          $slider = this.$el.children[item]
        }
      }
       // 遍历子集
      let $sliderChildren = $slider.children[0].children
      for (let item in $sliderChildren) {
        if (item <= lastPage) {
          // 找到实际宽度clientWidth+外边距
          posheight += $sliderChildren[item].offsetHeight
          posheight += parseInt($sliderChildren[item].style.marginTop || 0)
          posheight += parseInt($sliderChildren[item].style.marginBottom || 0)
        }
      }
      return posheight + pageWidth - pageWidth
    }
  },
  mounted () {
    let that = this
    this.temporaryData.pageWidth = this.$el.offsetWidth
    this.temporaryData.pageHeight = this.$el.offsetHeight
    // 初始化事件
    this.$emit('init', this.basicdata)
    // 定制事件
    this.$on('slideTo', (num) => {
      this.slide(num)
    })
    this.$on('slideNext', () => {
      this.next()
    })
    this.$on('slidePre', () => {
      this.pre()
    })
    this.$on('autoplayStart', (autoplay) => {
      this.sliderinit.autoplay = autoplay || 1000
      this.clock().begin(that)
    })
    this.$on('autoplayStop', () => {
      this.sliderinit.autoplay = 0
      this.clock().stop(that)
    })
    this.$on('loadingShow', () => {
      this.temporaryData.loading = true
    })
    this.$on('loadingHide', () => {
      this.temporaryData.loading = false
    })
    if (this.sliderinit.autoplay) {
      // 自动轮播 支持无缝滚动
      this.clock().begin(that)
    }
    // 设定垂直轮播class
    if (this.sliderinit.direction === 'vertical') {
      this.temporaryData.containerClass['swiper-container-vertical'] = true
    }
    // 添加reszie监听
    window.addEventListener('resize', () => {
      that.temporaryData.pageWidth = that.$el.offsetWidth
      that.temporaryData.pageHeight = that.$el.offsetHeight
      that.slide(that.basicdata.currentPage, 'animationnone')
    })
  },
  methods: {
    swipeStart (e) {
      let that = this
      if (this.temporaryData.transitionEnding) {
        return
      }
      this.temporaryData.animation = false
      // 暂停自动滚动
      if (this.sliderinit.autoplay) {
        this.clock().stop(that)
      }
      // 阻止页面滚动
      if (this.sliderinit.preventDocumentMove === true) {
        document.addEventListener('touchmove', that.preventDefault(e))
      }
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false
          return
        } else {
          this.temporaryData.tracking = true
          /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        }
      } else {
        this.temporaryData.tracking = true
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
      }
    },
    swipeMove (e) {
      if (this.temporaryData.tracking) {
        if (e.type === 'touchmove') {
          // e.preventDefault()
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          // e.preventDefault()
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        if (this.sliderinit.direction === 'vertical') {
          this.basicdata.posheight = -(this.currentHeight) + this.basicdata.end.y - this.basicdata.start.y + 'px'
          return
        }
        if (this.temporaryData.effect === 'fade' || this.temporaryData.effect === 'coverflow') {
          return
        }
        this.basicdata.poswidth = -(this.currentWidth) + this.basicdata.end.x - this.basicdata.start.x + 'px'
      }
    },
    swipeEnd (e) {
      this.temporaryData.tracking = false
      let now = new Date().getTime()
      let deltaTime = now - this.basicdata.start.t
      let deltaX = this.basicdata.end.x - this.basicdata.start.x
      let deltaY = this.basicdata.end.y - this.basicdata.start.y
      // 自动滚动重启
      if (this.sliderinit.autoplay) {
        let that = this
        setTimeout(function () {
          that.clock().begin(that)
        }, this.sliderinit.autoplay)
      }
      // 解除阻止
      document.removeEventListener('touchmove', this.preventDefault(e))
      /* work out what the movement was */
      if (deltaTime > this.temporaryData.thresholdTime) {
        this.slide(this.basicdata.currentPage)
        /* gesture too slow */
        return
      } else if (this.sliderinit.direction !== 'vertical') {
        if ((deltaX > this.temporaryData.thresholdDistance) && (Math.abs(deltaY) < this.temporaryData.thresholdDistance)) {
          // swipe right
          this.pre()
          return
        } else if ((-deltaX > this.temporaryData.thresholdDistance) && (Math.abs(deltaY) < this.temporaryData.thresholdDistance)) {
          // swipe left
          this.next()
          return
        // tap
        } else if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
          this.$emit('tap', this.basicdata)
          this.slide(this.basicdata.currentPage)
        //
        } else {
          this.slide(this.basicdata.currentPage)
          return
        }
        // 垂直判定
      } else {
        if ((deltaY > this.temporaryData.thresholdDistance) && (Math.abs(deltaX) < this.temporaryData.thresholdDistance)) {
          // swipe right
          this.pre()
          return
        } else if ((-deltaY > this.temporaryData.thresholdDistance) && (Math.abs(deltaX) < this.temporaryData.thresholdDistance)) {
          // swipe left
          this.next()
          return
        } else if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
          this.$emit('tap', this.basicdata)
          this.slide(this.basicdata.currentPage)
        } else {
          this.slide(this.basicdata.currentPage)
          return
        }
      }
    },
    pre () {
      this.basicdata.direction = 'left'
      if (this.basicdata.currentPage >= 1) {
        this.basicdata.currentPage -= this.sliderinit.slidesToScroll || 1
        this.slide()
      } else if (this.sliderinit.loop && this.basicdata.currentPage === 0) {
        this.basicdata.currentPage -= this.sliderinit.slidesToScroll || 1
        this.temporaryData.transitionEnding = true
        if (this.basicdata.currentPage < 0 && this.temporaryData.effect === 'fade') {
          this.slide(this.pagenums - 1)
          this.temporaryData.transitionEnding = false
        } else {
          this.slide()
        }
      } else {
        this.slide()
      }
      this.$emit('slide', this.basicdata)
    },
    next () {
      this.basicdata.direction = 'right'
      if (this.basicdata.currentPage < this.pagenums - 1) {
        this.basicdata.currentPage += this.sliderinit.slidesToScroll || 1
        this.slide()
      } else if (this.sliderinit.loop && this.basicdata.currentPage === this.pagenums - 1) {
        this.basicdata.currentPage += this.sliderinit.slidesToScroll || 1
        this.temporaryData.transitionEnding = true
        if (this.basicdata.currentPage >= this.pagenums && this.temporaryData.effect === 'fade') {
          this.slide(0)
          this.temporaryData.transitionEnding = false
        } else {
          this.slide()
        }
      } else {
        this.slide()
      }
      this.$emit('slide', this.basicdata)
    },
    slide (pagenum, type) {
      let that = this
      // 执行动画
      that.temporaryData.animation = true
      // 无样式滚动
      if (type === 'animationnone') {
        that.temporaryData.animation = false
      }
      if (pagenum || pagenum === 0) {
        that.basicdata.currentPage = pagenum
      }
      if (this.temporaryData.effect === 'fade') {
        return
      } else {
        // 增加垂直滚动判定
        if (that.sliderinit.direction === 'vertical') {
          that.basicdata.posheight = -that.currentHeight + 'px'
        } else {
          that.basicdata.poswidth = -that.currentWidth + 'px'
        }
      }
      //
      if (that.basicdata.currentPage < 0 || that.basicdata.currentPage >= that.pagenums) {
        return
      }
    },
    clock: function () {
      // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
      return {
        begin: function (that) {
          if (that.temporaryData.setIntervalid) {
            return
          }
          that.temporaryData.setIntervalid = setInterval(function () {
            that.next()
            if (that.basicdata.currentPage === that.pagenums - 1 && !that.sliderinit.loop) {
              clearInterval(that.temporaryData.setIntervalid)
              that.temporaryData.setIntervalid = 0
            }
          }, that.sliderinit.autoplay)
        },
        stop: function (that) {
          clearInterval(that.temporaryData.setIntervalid)
          that.temporaryData.setIntervalid = 0
        }
      }
    },
    // 阻止页面滚动
    preventDefault (e) {
      e.preventDefault()
    },
    // 无限循环中transitionEnd
    onTransitionEnd () {
      var that = this
      setTimeout(function () {
        if (that.sliderinit.loop && that.temporaryData.effect !== 'fade') {
          that.temporaryData.transitionEnding = false
          if (that.basicdata.currentPage < 0) {
            that.slide(that.pagenums + that.basicdata.currentPage, 'animationnone')
          } else if (that.basicdata.currentPage >= that.pagenums) {
            that.slide(0 + that.basicdata.currentPage - that.pagenums, 'animationnone')
          }
        }
      }, 0)
    }
  },
  components: {
    basic: sliderBasic,
    basicLoop: sliderBasicLoop,
    fade: sliderFade,
    fadeLoop: sliderFade,
    coverflow: sliderCoverflow
  }
}
</script>

<style>
.slider-container {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
 .slider-container {
  height: 100%;
  width: 100%;
  position: relative;
  white-space: nowrap;
}
.slider-center-center{
  margin: auto;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slider-touch {
  height: 100%;
}
.slider-wrapper {
  box-sizing: content-box;
  display: flex;
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  align-items: center;
}
/*垂直*/
.swiper-container-vertical  .slider-wrapper{
  /*flex-direction: column;*/
  /* 09版 */
  -webkit-box-orient: vertical;
  /* 12版 */
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
}

.slider-item {
  flex-shrink: 0;
  height: 100%;
  position: relative;
  width: 100%;
}
.slider-item {
  align-items: center;
  /*background: #fff none repeat scroll 0 0;*/
  display: flex;
  font-size: 40px;
  justify-content: center;
  text-align: center;
  color: #fff;
  /*display: inline-block;*/
}
.slider-item {
  background-position: center center!important;
  background-size: cover!important;
}

.slider-pagination {
  position: absolute;
  text-align: center;
  transform: translate3d(0px, 0px, 0px);
  /*transition: all 350ms ease 0s;*/
  z-index: 10;
}
.slider-pagination-bullets{
  bottom: 10px;
  left: 0;
  width: 100%;
}
.slider-pagination-bullet{
  background: #000 none repeat scroll 0 0;
  border-radius: 100%;
  display: inline-block;
  height: 8px;
  opacity: 0.2;
  width: 8px;
  cursor: pointer;
  margin: 0 5px;
}
/*垂直*/
.swiper-container-vertical  .slider-pagination-bullets {
  bottom: auto;
  left: auto;
  width: auto;
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0px);
}
.swiper-container-vertical .slider-pagination-bullet{
  display: block;
  margin: 5px 0;
}
.slider-pagination-bullet-active {
  background: #fff none repeat scroll 0 0;
  opacity: 1;
}
.slider-loading{
  position:absolute;
  top:50%;
  transform: translateY(-50%);
  z-index: 999
}
.slider-button-next, .slider-button-prev {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 27px 44px;
  cursor: pointer;
  height: 44px;
  margin-top: -22px;
  position: absolute;
  top: 50%;
  width: 27px;
  z-index: 10;
}
.slider-button-prev{
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E");
  left: 10px;
  right: auto;
}

.slider-button-next{
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E");
  left: auto;
  right: 10px;
}
/*移动端优化*/
 /*@media screen and (max-width:414px) {
  .slider-container {
  height: 200px;
  margin: 20px auto;
  width: 90%;
  }*/
/*}*/
</style>