<template>
    <div class='slider-container' :class = 's_data.containerClass' @mouseleave="swipeOut">
      <div class='slider-touch'
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
      <div class="slider-wrapper" :class="classObject" v-if="pages.length === 0">
        <slot></slot>
      </div>
      <!-- 组件在 vm.currentview 变化时改变！ -->
      <!-- <component v-if="pages.length !== 0" :pages="pages" :options="options" :data="data" :s_data="s_data" v-bind:is="currentView"></component> -->
      </div>
      <div v-if="s_data.pagination" class="slider-pagination slider-pagination-bullets">
        <template v-for="n in (pagenums||s_data.sliderLength)">
          <span v-if="!options.renderPagination" @click='slide(n-1)' :key="n" class="slider-pagination-bullet" :class="n-1 === data.currentPage? 'slider-pagination-bullet-active':''"></span>
          <renderpagination v-if="options.renderPagination"  @click.native='slide(n-1)' :key="n" :class="n-1 === data.currentPage? 'slider-pagination-bullet-active-render':''" :index="n" :options="options" ></renderpagination>
        </template>
      </div>
      <div class="slider-loading" v-show="(!pagenums && s_data.sliderLength === 0)||s_data.loading">
        <slot name="loading"></slot>
      </div>
    </div>
</template>
<script>
import detectPrefixes from '../utils/detect-prefixes.js'
export default {
  props: {
    options: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return {}
      }
    },
    pages: {
      type: Array,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return []
      }
    }
  },
  name: 'slider',
  data () {
    return {
      data: {
        poswidth: 0,
        posheight: 0,
        start: {},
        end: {},
        currentPage: this.options.currentPage || 0,
        direction: ''
      },
      s_data: {
        prefixes: detectPrefixes(),
        transitionEnding: false,
        itemTransitionEnding: false,
        setIntervalid: '',
        renderTime: '',
        sliderLength: 0,
        effect: this.options.effect || 'slide',
        direction: this.options.direction || 'horizontal',
        tracking: false,
        thresholdDistance: this.options.thresholdDistance || 100,
        thresholdTime: this.options.thresholdTime || 500,
        animation: false,
        itemAnimation: this.options.itemAnimation || false,
        loading: false,
        containerClass: {
          'swiper-container-vertical': false,
          'swiper-container-cursorGrab': this.options.grabCursor || false
        },
        pageInit: false,
        widthScalingRatio: this.options.widthScalingRatio || 0.8,
        heightScalingRatio: this.options.heightScalingRatio || 0.8,
        deviation: this.options.deviation || 200,
        currentPage: this.options.currentPage || 0,
        pageWidth: 0,
        pageHeight: 0,
        onSlide: false,
        onSlideEnd: true,
        sliderItem: '',
        pagination: this.options.pagination === undefined ? true : this.options.pagination,
        nested: this.options.nested === undefined ? true : this.options.nested,
        resize: this.options.resize === undefined ? true : this.options.resize,
        freeze: this.options.freeze === undefined ? false : this.options.freeze,
        slidesPerView: this.options.slidesPerView === undefined ? 0 : this.options.slidesPerView,
        $parent: this.judgeParentSlider(this),
        route: false,
        lastPage: this.options.currentPage || 0,
        e: undefined
      }
    }
  },
  watch: {
    // 解决route跳转问题
    '$route': function () {
      let that = this
      if (that.route) {
        let currentPage = that.data.currentPage
        let sliderLength = that.s_data.sliderLength
        that.s_data.transitionEnding = false
        if (currentPage < 0) {
          that.slide(0, 'animationnone')
        } else if (currentPage >= (that.pagenums || sliderLength)) {
          that.slide(sliderLength - 1, 'animationnone')
        } else {
          that.slide(currentPage, 'animationnone')
        }
        that.options.autoplay && that.clock().begin(that)
        that.route = false
      } else {
        that.route = true
        that.options.autoplay && that.clock().stop(that)
      }
    }
  },
  computed: {
    // 动画执行obj
    styleobj: function () {
      let style = {}
      style['transform'] = 'translate3D(' + this.data.poswidth + 'px' + ',' + this.data.posheight + 'px' + ',0)'
      style[this.s_data.prefixes.transition + 'TimingFunction'] = this.options.timingFunction || 'ease'
      style[this.s_data.prefixes.transition + 'Duration'] = (this.s_data.animation ? this.options.speed || 300 : 0) + 'ms'
      if (this.s_data.effect === 'fade' || this.s_data.effect === 'coverflow') {
        return {}
      }
      return style
    },
    // pagenum滑动数
    pagenums: function () {
      // 初始化跳转到页面
      if ((this.pages.length || this.s_data.sliderLength !== 0) && !this.s_data.pageInit) {
        // this.s_data.pageInit = true
      }
      return this.pages.length
    },
    // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点
    currentWidth: {
      get: function () {
        if ((!this.pages.length && this.s_data.sliderLength === 0) || this.s_data.effect === 'fade' || this.s_data.effect === 'coverflow') {
          return 0
        }
        let $slider
        let lastPage = this.data.currentPage
        let pageWidth = this.s_data.pageWidth
        let loopedSlides = this.options.loopedSlides || 1
        // let srollbar = false
        if (this.options.loop) {
          if (loopedSlides) {
            lastPage = lastPage + (loopedSlides <= (this.pagenums || this.s_data.sliderLength) ? loopedSlides : (this.pagenums || this.s_data.sliderLength))
          } else {
            lastPage = lastPage + 1
          }
        }
        if (this.options.effect === 'coverflow') {
          lastPage -= 1
        }
        // 获取slideritem子集
        for (let item in this.$el.children) {
          if (/slider-touch/ig.test(this.$el.children[item].className)) {
            $slider = this.$el.children[item]
          }
        }
        try {
          // 遍历子集
          let $sliderChildren = $slider.children[0].children
          let offsetLeft = $sliderChildren[lastPage].offsetLeft
          if (this.options.loop) {
            offsetLeft = $sliderChildren[lastPage].offsetLeft
          }
          // 居中
          let offsetWidth = $sliderChildren[lastPage].offsetWidth
          if (!offsetWidth) {
            throw new Error('找不到当前滑动元素，停止滑动')
          }
          let slidesPerView = this.options.slidesPerView
          let sliderLength = this.s_data.sliderLength
          if (this.options.centeredSlides) {
            if (slidesPerView) {
              let currentPage = this.data.currentPage
              let cent = parseInt((slidesPerView - 1) / 2)
              if (currentPage - cent <= 0) {
                currentPage = 0
              } else if (currentPage + cent >= sliderLength) {
                currentPage = sliderLength - slidesPerView
              } else {
                currentPage = currentPage - cent
              }
              offsetLeft = $sliderChildren[currentPage].offsetLeft
            } else {
              offsetLeft = offsetLeft - pageWidth / 2 + offsetWidth / 2
            }
          }
          if (!this.options.centeredSlides && slidesPerView) {
            let currentPage = this.data.currentPage
            let slidesToScroll = this.options.slidesToScroll || 1
            if (currentPage + slidesToScroll >= sliderLength) {
              offsetLeft = $sliderChildren[sliderLength - slidesToScroll].offsetLeft
            }
          }
          return offsetLeft + pageWidth - pageWidth
        } catch (error) {
          let that = this
          console.warn(error)
          console.warn('滑动报错，停止滑动及轮播')
          // 页码重置
          this.data.currentPage = this.s_data.lastPage
          this.options.autoplay = 0
          this.clock().stop(that)
        }
      }
    },
    currentHeight () {
      let sliderLength = this.s_data.sliderLength
      let currentPage = this.data.currentPage
      let pageLength = this.pages.length
      let posheight = 0
      let $slider
      let lastPage = currentPage - 1
      let pageWidth = this.s_data.pageWidth
      let loopedSlides = this.options.loopedSlides || 1
      if ((!pageLength && sliderLength === 0) || this.s_data.effect === 'fade') {
        return 0
      }
      // let srollbar = false
      if (this.options.loop) {
        if (loopedSlides) {
          lastPage = currentPage + (loopedSlides <= (pageLength || sliderLength) ? loopedSlides : (pageLength || sliderLength)) - 1
        } else {
          lastPage = currentPage + 1
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
    },
    classObject () {
      let obj = {}
      switch (this.options.effect) {
        case 'fade':
          obj = {
            'slider-fade': true
          }
          break
        default:
          break
      }
      return obj
    }
  },
  mounted () {
    let that = this
    this.s_data.pageWidth = this.$el.offsetWidth
    this.s_data.pageHeight = this.$el.offsetHeight
    // 初始化事件
    this.$emit('init', this.data)
    // 定制事件
    this.$on('slideTo', (num) => {
      this.data.direction = 'slideTo'
      this.slide(num, 'slideTo')
    })
    this.$on('slideNext', () => {
      this.next()
    })
    this.$on('slidePre', () => {
      this.pre()
    })
    this.$on('autoplayStart', (autoplay) => {
      this.options.autoplay = autoplay || this.options.autoplay || 1000
      this.clock().begin(that)
    })
    this.$on('autoplayStop', () => {
      this.options.autoplay = 0
      this.clock().stop(that)
    })
    this.$on('loadingShow', () => {
      this.s_data.loading = true
    })
    this.$on('loadingHide', () => {
      this.s_data.loading = false
    })
    if (this.options.autoplay && this.s_data.sliderLength) {
      // 自动轮播 支持无缝滚动
      this.clock().begin(that)
    }
    // 解决页面切换报错bug
    document.addEventListener('visibilitychange', this.visibilitychange, false)
    // 设定垂直轮播class
    if (this.options.direction === 'vertical') {
      this.s_data.containerClass['swiper-container-vertical'] = true
    } else {
      this.s_data.containerClass['swiper-container-horizontal'] = true
    }
    // 添加reszie监听
    if (this.s_data.resize) {
      window.addEventListener('resize', this.resize)
    }
  },
  beforeDestroy () {
    this.options.autoplay && this.clock().stop(this)
    if (this.options.preventDocumentMove === true) {
      document.removeEventListener('touchmove', this.preventDefault)
    }
    document.removeEventListener('visibilitychange', this.visibilitychange, false)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    visibilitychange () {
      let that = this
      if (document.hidden) {
        that.options.autoplay && that.clock().stop(that)
      } else {
        that.options.autoplay && that.clock().begin(that)
      }
    },
    resize () {
      this.s_data.pageWidth = this.$el.offsetWidth
      this.s_data.pageHeight = this.$el.offsetHeight
      // 修复循环切换bug
      if (this.data.currentPage >= this.s_data.sliderLength && this.options.loop) {
        this.slide(0, 'animationnone')
        return false
      }
      this.slide(this.data.currentPage, 'animationnone')
    },
    swipeStart (e) {
      let that = this
      this.s_data.e = e
      if (this.s_data.freeze) {
        return
      }
      if (this.s_data.transitionEnding) {
        return
      }
      if (this.s_data.transitionEnding) {
        return
      }
      if (this.s_data.itemTransitionEnding && this.options.itemAnimation) {
        return
      }
      this.s_data.animation = false
      // 暂停自动滚动
      if (this.options.autoplay) {
        this.clock().stop(that)
      }
      // 阻止页面滚动
      if (this.options.preventDocumentMove === true) {
        document.addEventListener('touchmove', that.preventDefault(e))
      }
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.s_data.tracking = false
          return false
        } else {
          this.s_data.tracking = true
          /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
          this.data.start.t = new Date().getTime()
          this.data.start.x = e.targetTouches[0].clientX
          this.data.start.y = e.targetTouches[0].clientY
          this.data.end.x = e.targetTouches[0].clientX
          this.data.end.y = e.targetTouches[0].clientY
        }
      } else {
        this.s_data.tracking = true
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        this.data.start.t = new Date().getTime()
        this.data.start.x = e.clientX
        this.data.start.y = e.clientY
        this.data.end.x = e.clientX
        this.data.end.y = e.clientY
      }
    },
    swipeMove (e) {
      this.s_data.e = e
      if (this.s_data.tracking) {
        let effect = this.s_data.effect
        let $parent = this.s_data.$parent
        if (e.type === 'touchmove') {
          // e.preventDefault()
          this.data.end.x = e.targetTouches[0].clientX
          this.data.end.y = e.targetTouches[0].clientY
        } else {
          // e.preventDefault()
          this.data.end.x = e.clientX
          this.data.end.y = e.clientY
        }
        let deltaX = Math.abs(this.data.end.x - this.data.start.x)
        let deltaY = Math.abs(this.data.end.y - this.data.start.y)
        if (deltaX >= deltaY && this.options.direction !== 'vertical' && e.cancelable) {
          e.preventDefault()
        } else if (deltaX <= deltaY && this.options.direction === 'vertical' && e.cancelable) {
          e.preventDefault()
        }
        // 嵌套滚动处理事件传播
        if ($parent && $parent.s_data.direction === this.s_data.direction) {
          e.stopPropagation()
        }
        if (effect === 'fade' || effect === 'coverflow') {
          return
        }
        if (this.options.direction === 'vertical') {
          if (deltaX > deltaY) {
            return
          }
          // 处理嵌套滚动
          if ($parent && $parent.options.direction === 'vertical' && this.data.currentPage === 0 && this.data.end.y - this.data.start.y >= 0 && $parent.s_data.nested && !($parent.options.preventRebound && $parent.data.currentPage === 0)) {
            $parent.data.posheight = -($parent.currentHeight) + this.data.end.y - this.data.start.y
          } else if ($parent && $parent.options.direction === 'vertical' && this.data.currentPage === this.s_data.sliderLength - 1 && this.data.end.y - this.data.start.y <= 0 && $parent.s_data.nested && !($parent.options.preventRebound && $parent.data.currentPage === $parent.s_data.sliderLength - 1)) {
            $parent.data.posheight = -($parent.currentHeight) + this.data.end.y - this.data.start.y
          } else if (this.options.preventRebound && !this.options.loop) {

          } else {
            this.data.posheight = -(this.currentHeight) + this.data.end.y - this.data.start.y
          }
        } else {
          if (deltaX < deltaY) {
            return
          }
          // 处理嵌套滚动
          if ($parent && $parent.options.direction !== 'vertical' && this.data.currentPage === 0 && this.data.end.x - this.data.start.x >= 0 && $parent.s_data.nested && !($parent.options.preventRebound && $parent.data.currentPage === 0)) {
            $parent.data.poswidth = -($parent.currentWidth) + this.data.end.x - this.data.start.x
          } else if ($parent && $parent.options.direction !== 'vertical' && this.data.currentPage === this.s_data.sliderLength - 1 && this.data.end.x - this.data.start.x <= 0 && $parent.s_data.nested && !($parent.options.preventRebound && $parent.data.currentPage === $parent.s_data.sliderLength - 1)) {
            $parent.data.poswidth = -($parent.currentWidth) + this.data.end.x - this.data.start.x
          } else if (this.options.preventRebound && !this.options.loop) {

          } else {
            this.data.poswidth = -(this.currentWidth) + this.data.end.x - this.data.start.x
          }
        }
      }
    },
    swipeEnd (e) {
      this.s_data.e = e
      this.s_data.tracking = false
      let now = new Date().getTime()
      let deltaTime = now - this.data.start.t
      let deltaX = this.data.end.x - this.data.start.x
      let deltaY = this.data.end.y - this.data.start.y
      let thresholdDistance = this.s_data.thresholdDistance
      let currentPage = this.data.currentPage
      // 自动滚动重启
      if (this.options.autoplay) {
        let that = this
        setTimeout(function () {
          that.clock().begin(that)
        }, this.options.autoplay)
      }
      // 解除阻止
      if (this.options.preventDocumentMove === true) {
        document.removeEventListener('touchmove', this.preventDefault(e))
      }
      if (deltaTime > this.s_data.thresholdTime) {
        this.slide(currentPage)
        /* gesture too slow */
        return false
      } else if (this.options.direction !== 'vertical') {
        // 为了平滑滑动，修改y轴限制
        if ((deltaX > thresholdDistance) && (Math.abs(deltaY) < Math.abs(deltaX))) {
          // swipe right
          this.pre()
          return false
        } else if ((-deltaX > thresholdDistance) && (Math.abs(deltaY) < Math.abs(deltaX))) {
          // swipe left
          this.next()
          return false
          // tap
        } else if (deltaTime < 100 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
          this.data.direction = 'click'
          this.$emit('tap', this.data)
          this.slide(currentPage, 'click')
          //
        } else {
          this.slide(currentPage)
          return false
        }
        // 垂直判定
      } else {
        if ((deltaY > thresholdDistance) && (Math.abs(deltaX) < Math.abs(deltaY))) {
          // swipe right
          this.pre()
          return false
        } else if ((-deltaY > thresholdDistance) && (Math.abs(deltaX) < Math.abs(deltaY))) {
          // swipe left
          this.next()
          return false
        } else if (deltaTime < 100 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
          this.data.direction = 'click'
          this.$emit('tap', this.data)
          this.slide(currentPage, 'click')
        } else {
          this.slide(currentPage)
          return false
        }
      }
    },
    swipeOut (e) {
      if (this.$el === e.target && this.s_data.tracking) {
        this.swipeEnd(e)
      }
    },
    pre () {
      // debugger
      this.s_data.lastPage = this.data.currentPage
      this.data.direction = this.options.direction === 'vertical' ? 'up' : 'left'
      let sliderLength = this.s_data.sliderLength
      let slidesToScroll = this.options.slidesToScroll || 1
      let $parent = this.s_data.$parent
      // let slidesPerView = this.s_data.slidesPerView
      if (this.data.currentPage >= 1 && this.data.currentPage - slidesToScroll >= 0) {
        this.data.currentPage -= slidesToScroll || 1
        this.slide()
      } else if (this.options.loop && this.data.currentPage - slidesToScroll < 0 && (!$parent || !$parent.s_data.nested)) {
        this.data.currentPage -= slidesToScroll || 1
        this.s_data.transitionEnding = true
        this.s_data.itemTransitionEnding = true
        if (this.data.currentPage < 0 && this.s_data.effect === 'fade') {
          this.slide((this.pagenums || sliderLength) - 1)
          this.s_data.transitionEnding = false
          this.s_data.itemTransitionEnding = false
        } else {
          this.slide()
        }
      } else if ($parent && this.data.currentPage === 0 && $parent.s_data.nested) {
        $parent.pre()
        this.slide()
      } else {
        this.slide(0)
      }
      // this.$emit('update:currentpage', this.data.currentPage)
      // this.$emit('slide', this.data)
    },
    next () {
      this.data.direction = this.options.direction === 'vertical' ? 'down' : 'right'
      this.s_data.lastPage = this.data.currentPage
      let sliderLength = this.s_data.sliderLength
      let $parent = this.s_data.$parent
      let slidesToScroll = this.options.slidesToScroll || 1
      // let slidesPerView = this.s_data.slidesPerView ? (this.options.loop ? 0 : ((sliderLength - this.s_data.slidesPerView) / slidesToScroll)) : 0
      if (this.data.currentPage < (this.pagenums || sliderLength) - 1 && this.data.currentPage + slidesToScroll <= sliderLength - 1) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.slide()
      } else if (this.options.loop && this.data.currentPage + slidesToScroll > sliderLength - 1 && this.data.currentPage + slidesToScroll <= sliderLength && (!$parent || !$parent.s_data.nested)) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.s_data.transitionEnding = true
        this.s_data.itemTransitionEnding = true
        if (this.data.currentPage >= (this.pagenums || sliderLength) && this.s_data.effect === 'fade') {
          this.slide(0)
          this.s_data.transitionEnding = false
          this.s_data.itemTransitionEnding = false
        } else {
          this.slide()
        }
      } else if ($parent && this.data.currentPage === (this.pagenums || sliderLength) - 1 && $parent.s_data.nested) {
        let parent = this.s_data.$parent
        parent.next()
        this.slide()
      } else {
        this.data.direction = 'rebound'
        this.slide()
      }
    },
    slide (pagenum, type) {
      // 执行动画
      this.s_data.animation = true
      // 处理点击事件
      if (type === 'slideTo' && this.s_data.onSlide === true) {
        return false
      }
      if ((pagenum || pagenum === 0) && type === undefined) {
        this.data.direction = 'rebound'
      }
      // 无样式滚动
      if (type === 'animationnone') {
        this.s_data.animation = false
        this.s_data.onSlideEnd = true
        this.s_data.onSlide = false
      } else {
        this.s_data.onSlideEnd = false
        this.s_data.onSlide = true
      }
      if (pagenum || pagenum === 0) {
        this.data.currentPage = pagenum
      }
      // 传递事件
      if (type !== 'click') {
        this.$emit('slide', this.data)
      }
      // fade优化
      if (this.s_data.effect === 'fade') {
        if (!this.pagenums) {
          this.fadeDom()
        }
        return
      } else {
        // 增加垂直滚动判定
        if (this.options.direction === 'vertical') {
          if (Math.abs(this.data.posheight) === Math.abs(-this.currentHeight)) {
            this.s_data.onSlideEnd = true
            this.s_data.onSlide = false
          }
          this.data.posheight = -this.currentHeight
        } else {
          if (Math.abs(this.data.poswidth) === Math.abs(-this.currentWidth)) {
            this.s_data.onSlideEnd = true
            this.s_data.onSlide = false
          }
          this.data.poswidth = -this.currentWidth
        }
      }
      // 添加class
      if (this.s_data.sliderLength) {
        let slideDom = this.$el.getElementsByClassName('slider-wrapper')[0]
        let childrens = Array.prototype.slice.call(slideDom.children)
        let sliderItem = childrens.filter((item) => {
          return item.className.indexOf('slider-item') !== -1
        })
        let sliderActiveCopy = childrens.filter((item) => {
          return item.className.indexOf('slider-active-copy') !== -1
        })
        // let sliderItem = slideDom.getElementsByClassName('slider-item')
        // let sliderActiveCopy = slideDom.getElementsByClassName('slider-active-copy')
        let loopedSlides = this.options.loopedSlides || 1
        let sliderLength = this.s_data.sliderLength
        let children = this.$children
        let currentPage = this.data.currentPage
        children = children.filter((item) => {
          return item.$options.name === 'slideritem'
        })
        children.forEach(element => {
          element.removeActive()
        })
        // 取消嵌套轮播active标签
        if (this.options.effect === 'nest') {
          return
        }
        if (children[currentPage]) {
          children[currentPage].addActive()
        }
        if (currentPage < 0 || currentPage >= (this.pagenums || sliderLength)) {
          if (sliderItem[currentPage + loopedSlides] && sliderItem[currentPage + loopedSlides].classList) {
            sliderItem[currentPage + loopedSlides].classList.add('slider-active-copy')
          }
          let lastPage = currentPage < 0 ? (this.pagenums || sliderLength) + currentPage : 0 + currentPage - (this.pagenums || sliderLength)
          children[lastPage] && children[lastPage].addActive()
        } else {
          for (let index = 0; index < sliderActiveCopy.length; index++) {
            const item = sliderActiveCopy[index]
            item.classList.remove('slider-active-copy')
          }
        }
      }
      if (this.data.currentPage < 0 || this.data.currentPage >= (this.pagenums || this.s_data.sliderLength)) {
        return false
      }
    },
    clock: function () {
      // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
      return {
        begin: function (that) {
          if (that.s_data.setIntervalid) {
            return
          }
          if (that.options.autoplay === 0) {
            return
          }
          that.s_data.setIntervalid = setInterval(function () {
            that.next()
            if (that.data.currentPage === (that.pagenums || that.s_data.sliderLength) - 1 && !that.options.loop) {
              clearInterval(that.s_data.setIntervalid)
              that.s_data.setIntervalid = 0
            }
          }, that.options.autoplay)
        },
        stop: function (that) {
          clearInterval(that.s_data.setIntervalid)
          that.s_data.setIntervalid = 0
        }
      }
    },
    // 阻止页面滚动
    preventDefault (e) {
      let event = e || this.s_data.e
      this.s_data.e = event
      event && event.preventDefault()
    },
    // 无限循环中transitionEnd
    onTransitionEnd (e) {
      var that = this
      this.s_data.onSlideEnd = true
      this.s_data.onSlide = false
      setTimeout(function () {
        let currentPage = that.data.currentPage
        let sliderLength = that.s_data.sliderLength
        if (that.options.loop && that.s_data.effect !== '') {
          that.s_data.transitionEnding = false
          if (currentPage < 0) {
            that.slide((that.pagenums || sliderLength) + currentPage, 'animationnone')
          } else if (currentPage >= (that.pagenums || sliderLength)) {
            that.slide(0 + currentPage - (that.pagenums || sliderLength), 'animationnone')
          }
        }
      }, 0)
    },
    onItemTransitionEnd (e) {
      if (e.target !== e.currentTarget) {
        return
      }
      var that = this
      setTimeout(function () {
        that.s_data.itemTransitionEnding = false
      }, 0)
    },
    renderDom (item) {
      let that = this
      // 防抖函数
      if (this.s_data.renderTime) {
        clearTimeout(this.s_data.renderTime)
      }
      // fade添加z-index
      that.s_data.sliderLength += 1
      if (that.s_data.sliderLength >= 1 && that.options.effect === 'fade') {
        if (item.previousSibling) {
          item['style']['z-index'] = 99 - that.s_data.sliderLength
        } else {
          item['style']['z-index'] = 99 + that.s_data.sliderLength
        }
      }
      this.s_data.renderTime = setTimeout(() => {
        that.s_data.renderTime = undefined
        let slideDom = that.$el.getElementsByClassName('slider-wrapper')[0]
        let children = Array.prototype.slice.call(slideDom.children)
        let sliderItem = children.filter((item) => {
          return item.className.indexOf('slider-item') !== -1 && item.className.indexOf('slider-copy') === -1
        })
        that.s_data.sliderLength = sliderItem.length || 0
        if (that.s_data.sliderLength >= 1 && that.options.loop && that.options.effect !== 'fade' && that.options.effect !== 'coverflow') {
          // 先清空上次添加的节点
          let sliderCopy = slideDom.getElementsByClassName('slider-copy')
          for (let i = sliderCopy.length - 1; i >= 0; i--) {
            slideDom.removeChild(sliderCopy[i])
          }
          // debugger
          let children = Array.prototype.slice.call(slideDom.children)
          // 批量复制添加
          let sliderItem = children.filter((item) => {
            return item.className.indexOf('slider-item') !== -1
          })
          let length = sliderItem.length
          let loopedSlides = that.options.loopedSlides || 1
          let a = 0
          for (let j = 0; j < length; j++) {
            if (j + loopedSlides - length >= 0) {
              // 向前添加节点
              let copeBefore = sliderItem[j + a].cloneNode(true)
              copeBefore.classList.add('slider-copy')
              copeBefore.classList.remove('slider-active')
              slideDom.insertBefore(copeBefore, sliderItem[0 + a])
              // slideDom.insertBefore(copeBefore, sliderItem[0 + a])
            }
            if (j - loopedSlides < 0) {
              // 向后添加节点
              let copeAfter = sliderItem[j].cloneNode(true)
              copeAfter.classList.add('slider-copy')
              copeAfter.classList.remove('slider-active')
              slideDom.appendChild(copeAfter)
            }
          }
        }
        that.$nextTick(() => {
          that.slide(that.data.currentPage, 'animationnone')
          if (that.options.autoplay && this.s_data.sliderLength) {
            // 自动轮播 支持无缝滚动
            that.clock().begin(that)
          }
        })
      }, 0)
    },
    fadeDom () {
      let currentPage = this.data.currentPage
      let slideDom = this.$el.getElementsByClassName('slider-wrapper')[0]
      let sliderItem = slideDom.getElementsByClassName('slider-item')
      let speed = this.options.speed
      for (let i = 0; i < sliderItem.length; i++) {
        if (i === currentPage || i === currentPage + 1) {
          sliderItem[i]['style']['opacity'] = '1'
          sliderItem[i]['style']['transition-property'] = 'opacity'
          sliderItem[i]['style'][this.s_data.prefixes.transition + '-duration'] = (this.s_data.animation ? speed || 300 : 0) + 'ms'
        } else {
          sliderItem[i]['style']['opacity'] = '0'
          sliderItem[i]['style'][this.s_data.prefixes.transition + '-duration'] = (this.s_data.animation ? speed || 300 : 0) + 'ms'
        }
      }
    },
    judgeParentSlider (that) {
      if (that.$parent && that.$parent.$vnode && that.$parent.$options.name === 'slider') {
        return that.$parent
      } else if (that.$parent && that.$parent.$vnode === undefined) {
        return false
      } else {
        return this.judgeParentSlider(that.$parent)
      }
    }
  },
  components: {
    // basic: sliderBasic,
    // basicLoop: sliderBasicLoop,
    // fade: sliderFade,
    // fadeLoop: sliderFade,
    // coverflow: sliderCoverflow,
    renderpagination: { // eslint-disable-line
      render: function (createElement) {
        let index = this.index
        let render = this.options.renderPagination
        return render.call(this, createElement, index)
      },
      name: 'renderpagination',
      props: {
        index: {
          type: Number,
          required: true
        },
        options: {
          type: Object,
          required: true
        }
      }
    }
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
.slider-center-center {
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
.swiper-container-horizontal > * > .slider-wrapper {
  box-sizing: content-box;
  display: flex;
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  align-items: center;
  /*flex-direction: column;*/
  /* 09版 */
  -webkit-box-orient: vertical;
  /* 12版 */
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
}
/*垂直*/
.swiper-container-vertical > * > .slider-wrapper {
  box-sizing: content-box;
  display: flex;
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  align-items: center;
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

.slider-fade .slider-item {
  position: absolute;
  left: 0;
  opacity: 0;
}
.slider-pagination {
  position: absolute;
  text-align: center;
  transform: translate3d(0px, 0px, 0px);
  /*transition: all 350ms ease 0s;*/
  z-index: 10;
}
.swiper-container-horizontal > .slider-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}
.swiper-container-horizontal > * > .slider-pagination-bullet {
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
  left: 0;
  bottom: auto;
  left: auto;
  width: auto;
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0px);
}
.swiper-container-vertical > * > .slider-pagination-bullet {
  background: #000 none repeat scroll 0 0;
  border-radius: 100%;
  height: 8px;
  opacity: 0.2;
  width: 8px;
  cursor: pointer;
  display: block;
  margin: 5px 0;
}
.swiper-container-vertical .slider-pagination-bullet-active ,.swiper-container-horizontal .slider-pagination-bullet-active{
  background: #fff none repeat scroll 0 0;
  opacity: 1;
}
.slider-loading {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
}
.swiper-container-cursorGrab {
  cursor: grab;
}
</style>
