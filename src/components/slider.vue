<style>
.slider-container {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
 .slider-container {
  height: 400px;
  margin: 20px auto;
  width: 70%;
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
.slider-wrapper {
  box-sizing: content-box;
  display: flex;
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  /*display: inline-block;*/
  /*white-space: nowrap;*/
  /*font-size: 0;*/
  /*line-height: 0;*/
}
/*垂直*/
.swiper-container-vertical > .slider-wrapper{
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
  background: #fff none repeat scroll 0 0;
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
/*.animation-ease {
  -webkit-transition: -webkit-transform 350ms cubic-bezier(.165, .84, .44, 1);
  transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
}*/
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
.swiper-container-vertical > .slider-pagination-bullets {
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
 @media screen and (max-width:414px) {
  .slider-container {
  height: 200px;
  margin: 20px auto;
  width: 90%;
  }
}
</style>

<template>
  <div class='slider-container' :class = 'basicdata.containerClass'>
    <div class="slider-wrapper"
    :style="styleobj"
    @touchmove="swipeMove"
    @touchstart="swipeStart"
    @touchend="swipeEnd"
    @mousedown="swipeStart"
    @mouseup="swipeEnd"
    @mousemove="swipeMove"
    @webkit-transition-end="onTransitionEnd"
    @transitionend="onTransitionEnd"
    >
    <!-- 正常滚动 -->
    <template v-if="!sliderinit.loop">
      <template v-for="item in pages">
        <div class="slider-item" :style="item.style">
        {{item.title}}
         </div>
      </template>
    </template>
    <!-- 无缝滚动 -->
    <template v-if="sliderinit.loop">
      <template v-if="sliderinit.infinite" v-for="(item, index) in pages" >
          <div v-if="index+sliderinit.infinite-pages.length>=0" class="slider-item" :style=" item.style">{{item.title}}</div>
      </template>
       <template v-if="!sliderinit.infinite">
        <div class="slider-item" :style="pages[pages.length-1].style">{{pages[pages.length-1].title}}</div>
       </template>
       <!-- 无缝滚动copy最后项 -->
       <template v-for="item in pages">
        <div class="slider-item" :style="item.style">{{item.title}}</div>
       </template>
       <!-- 无缝滚动copy第一项 -->
       <template v-if="sliderinit.infinite" v-for="(item, index) in pages" >
        <div v-if="index-sliderinit.infinite<0" class="slider-item" :style=" item.style">{{item.title}}</div>
       </template>
       <template v-if="!sliderinit.infinite">
        <div class="slider-item" :style="pages[0].style">{{pages[0].title}}</div>
       </template>
     </template>
    </div>
    <div class="slider-pagination slider-pagination-bullets">
      <template v-for="n in pagenums">
        <span @click='slide(n-1)' class="slider-pagination-bullet" :class="n-1 === sliderinit.currentPage? 'slider-pagination-bullet-active':''"></span>
      </template>
    </div>
  </div>
</template>

<script>
import detectPrefixes from '../utils/detect-prefixes.js'
export default {
  props: ['sliderinit', 'pages'],
  data () {
    return {
      basicdata: {
        poswidth: '0',
        posheight: '0',
        start: {},
        end: {},
        tracking: false,
        animation: false,
        containerClass: {
          'swiper-container-vertical': false
        },
        setIntervalid: '',
        prefixes: detectPrefixes(),
        transitionEnding: false
      }
    }
  },
  computed: {
    // 动画执行obj
    styleobj: function () {
      let style = {}
      style['transform'] = 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)'
      style[this.basicdata.prefixes.transition + 'TimingFunction'] = 'ease'
      style[this.basicdata.prefixes.transition + 'Duration'] = (this.basicdata.animation ? this.sliderinit.slideSpeed || 300 : 0) + 'ms'
      return style
    },
    // pagenum滑动数
    pagenums: function () {
      return this.pages.length
    },
    // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点
    currentWidth: {
      get: function () {
        let $slider
        let lastPage = this.sliderinit.currentPage
        // let srollbar = false
        if (this.sliderinit.loop) {
          if (this.sliderinit.infinite) {
            lastPage = this.sliderinit.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length)
          } else {
            lastPage = this.sliderinit.currentPage + 1
          }
        }
        // 获取slideritem子集
        for (let item in this.$el.children) {
          if (/slider-wrapper/ig.test(this.$el.children[item].className)) {
            $slider = this.$el.children[item]
          }
        }
        // 遍历子集
        let $sliderChildren = $slider.children
        let offsetLeft = $sliderChildren[lastPage].offsetLeft
        if (this.sliderinit.loop) {
          offsetLeft = $sliderChildren[lastPage].offsetLeft
        }
        return offsetLeft
      },
      set: function (value) {
        return value
      }
    },
    currentHeight: function () {
      let posheight = 0
      let $slider
      let lastPage = this.sliderinit.currentPage - 1
      // let srollbar = false
      if (this.sliderinit.loop) {
        if (this.sliderinit.infinite) {
          lastPage = this.sliderinit.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length) - 1
        } else {
          lastPage = this.sliderinit.currentPage + 1
        }
      }
      // 获取slideritem子集
      for (let item in this.$el.children) {
        if (/slider-wrapper/ig.test(this.$el.children[item].className)) {
          $slider = this.$el.children[item]
        }
      }
       // 遍历子集
      let $sliderChildren = $slider.children
      for (let item in $sliderChildren) {
        if (item <= lastPage) {
          // 找到实际宽度clientWidth+外边距
          posheight += $sliderChildren[item].offsetHeight
          posheight += parseInt($sliderChildren[item].style.marginTop || 0)
          posheight += parseInt($sliderChildren[item].style.marginBottom || 0)
        }
      }
      return posheight
    }
  },
  mounted () {
    let that = this
    // 起始跳到指定页 无样式
    that.slide(this.sliderinit.currentPage, 'animationnone')
    // 定制事件
    that.$on('slideTo', (num) => {
      this.slide(num)
    })
    that.$on('slideNext', () => {
      this.next()
    })
    that.$on('slidePre', () => {
      this.pre()
    })

    // 自动轮播 支持无缝滚动
    that.clock().begin(that)
    // 设定垂直轮播class
    if (this.sliderinit.direction === 'vertical') {
      this.basicdata.containerClass['swiper-container-vertical'] = true
    }
  },
  methods: {
    swipeStart (e) {
      let that = this
      if (this.basicdata.transitionEnding) {
        return
      }
      this.basicdata.animation = false
      // 暂停自动滚动
      if (this.sliderinit.autoplay) {
        let that = this
        this.clock().stop(that)
      }
      // 阻止页面滚动
      document.addEventListener('touchmove', that.preventDefault(e))
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.basicdata.tracking = false
          return
        } else {
          this.basicdata.tracking = true
          /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.targetTouches[0].clientX
          this.basicdata.start.y = e.targetTouches[0].clientY
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        }
      } else {
        this.basicdata.tracking = true
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
      }
    },
    swipeMove (e) {
      if (this.basicdata.tracking) {
        if (e.type === 'touchmove') {
          e.preventDefault()
          this.basicdata.end.x = e.targetTouches[0].clientX
          this.basicdata.end.y = e.targetTouches[0].clientY
        } else {
          e.preventDefault()
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        if (this.sliderinit.direction === 'vertical') {
          this.basicdata.posheight = -(this.currentHeight) + this.basicdata.end.y - this.basicdata.start.y + 'px'
          return
        }
        this.basicdata.poswidth = -(this.currentWidth) + this.basicdata.end.x - this.basicdata.start.x + 'px'
      }
    },
    swipeEnd (e) {
      this.basicdata.tracking = false
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
      if (deltaTime > this.sliderinit.thresholdTime) {
        this.slide(this.sliderinit.currentPage)
        /* gesture too slow */
        return
      } else if (this.sliderinit.direction !== 'vertical') {
        if ((deltaX > this.sliderinit.thresholdDistance) && (Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
          // swipe right
          this.pre()
          return
        } else if ((-deltaX > this.sliderinit.thresholdDistance) && (Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
          // swipe left
          this.next()
          return
        } else {
          this.slide(this.sliderinit.currentPage)
          return
        }
        // 垂直判定
      } else {
        if ((deltaY > this.sliderinit.thresholdDistance) && (Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
          // swipe right
          this.pre()
          return
        } else if ((-deltaY > this.sliderinit.thresholdDistance) && (Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
          // swipe left
          this.next()
          return
        } else {
          this.slide(this.sliderinit.currentPage)
          return
        }
      }
    },
    pre () {
      if (this.sliderinit.currentPage >= 1) {
        this.sliderinit.currentPage -= this.sliderinit.slidesToScroll || 1
        this.slide()
      } else if (this.sliderinit.loop && this.sliderinit.currentPage === 0) {
        this.sliderinit.currentPage -= this.sliderinit.slidesToScroll || 1
        this.basicdata.transitionEnding = true
        this.slide()
      } else {
        this.slide()
      }
    },
    next () {
      if (this.sliderinit.currentPage < this.pagenums - 1) {
        this.sliderinit.currentPage += this.sliderinit.slidesToScroll || 1
        this.slide()
      } else if (this.sliderinit.loop && this.sliderinit.currentPage === this.pagenums - 1) {
        this.sliderinit.currentPage += this.sliderinit.slidesToScroll || 1
        this.basicdata.transitionEnding = true
        this.slide()
      } else {
        this.slide()
      }
    },
    slide (pagenum, type) {
      let that = this
      // 执行动画
      that.basicdata.animation = true
      // 无样式滚动
      if (type === 'animationnone') {
        that.basicdata.animation = false
      }
      if (pagenum || pagenum === 0) {
        that.sliderinit.currentPage = pagenum
      }
      // 增加垂直滚动判定
      if (that.sliderinit.direction === 'vertical') {
        that.basicdata.posheight = -that.currentHeight + 'px'
      } else {
        that.basicdata.poswidth = -that.currentWidth + 'px'
      }
      // 广播事件
      if (that.sliderinit.currentPage < 0 || that.sliderinit.currentPage >= that.pagenums) {
        return
      }
      that.$emit('slide', that.sliderinit.currentPage)
    },
    clock: function () {
      // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
      return {
        begin: function (that) {
          if (that.sliderinit.autoplay) {
            if (that.basicdata.setIntervalid) {
              return
            }
            that.basicdata.setIntervalid = setInterval(function () {
              that.next()
              if (that.sliderinit.currentPage === that.pagenums - 1 && !that.sliderinit.loop) {
                clearInterval(that.basicdata.setIntervalid)
                that.basicdata.setIntervalid = 0
              }
            }, that.sliderinit.autoplay)
          }
        },
        stop: function (that) {
          clearInterval(that.basicdata.setIntervalid)
          that.basicdata.setIntervalid = 0
        }
      }
    },
    // 阻止页面滚动
    preventDefault (e) {
      e.preventDefault()
    },
    // 无限循环中transitionEnd
    onTransitionEnd () {
      if (this.sliderinit.loop) {
        this.basicdata.transitionEnding = false
        if (this.sliderinit.currentPage < 0) {
          this.slide(this.pagenums + this.sliderinit.currentPage, 'animationnone')
        } else if (this.sliderinit.currentPage >= this.pagenums) {
          this.slide(0 + this.sliderinit.currentPage - this.pagenums, 'animationnone')
        }
      }
    }
  }
}
</script>
