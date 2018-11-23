import detectPrefixes from '../utils/detect-prefixes.js'
export default {
  props: {
    options: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return {}
      }
    }
  },
  name: 'sliderMove',
  data () {
    return {
      data: {
        poswidth: 0,
        posheight: 0,
        start: {},
        end: {},
        direction: ''
      },
      config: {
        prefixes: detectPrefixes(),
        transitionEnding: false,
        itemTransitionEnding: false,
        animation: false,
        tracking: false,
        effect: this.options.effect || 'slide',
        thresholdDistance: this.options.thresholdDistance || 50,
        thresholdTime: this.options.thresholdTime || 1000,
        direction: this.options.direction || 'horizontal',
        freeze: this.options.freeze === undefined ? false : this.options.freeze
      }
    }
  },
  computed: {
    styleobj () {
      let style = {}
      style['transform'] = 'translate3D(' + this.data.poswidth + 'px' + ',' + this.data.posheight + 'px' + ',0)'
      style[this.config.prefixes.transition + 'TimingFunction'] = this.options.timingFunction || 'ease'
      style[this.config.prefixes.transition + 'Duration'] = (this.config.animation ? this.options.speed || 300 : 0) + 'ms'
      if (this.config.effect === 'fade' || this.config.effect === 'coverflow') {
        return {}
      }
      return style
    },
    currentWidth () {
      if (this.config.sliderLength === 0 || this.config.effect === 'fade' || this.config.effect === 'coverflow') {
        return 0
      }
      let $slider
      let lastPage = this.data.currentPage
      let pageWidth = this.config.pageWidth
      let loopedSlides = this.options.loopedSlides || 1
      // let srollbar = false
      if (this.options.loop) {
        if (loopedSlides) {
          lastPage = lastPage + (loopedSlides <= this.config.sliderLength ? loopedSlides : this.config.sliderLength)
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
      // 遍历子集
      let $sliderChildren = $slider.children[0].children
      let offsetLeft = $sliderChildren[lastPage].offsetLeft
      if (this.options.loop) {
        offsetLeft = $sliderChildren[lastPage].offsetLeft
      }
      let offsetWidth = $sliderChildren[lastPage].offsetWidth
      if (this.options.centeredSlides) {
        offsetLeft = offsetLeft - pageWidth / 2 + offsetWidth / 2
      }
      return offsetLeft + pageWidth - pageWidth
    },
    currentHeight () {
      let sliderLength = this.config.sliderLength
      let currentPage = this.data.currentPage
      let posheight = 0
      let $slider
      let lastPage = currentPage - 1
      let pageWidth = this.config.pageWidth
      let loopedSlides = this.options.loopedSlides || 1
      if (sliderLength === 0 || this.config.effect === 'fade') {
        return 0
      }
      // let srollbar = false
      if (this.options.loop) {
        if (loopedSlides) {
          lastPage = currentPage + (loopedSlides <= sliderLength ? loopedSlides : sliderLength) - 1
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
    }
  },
  mounted () {
  },
  methods: {
    swipeStart (e) {
      let that = this
      if (this.config.freeze) {
        return
      }
      if (this.config.transitionEnding) {
        return
      }
      if (this.config.itemTransitionEnding && this.options.itemAnimation) {
        return
      }
      this.config.animation = false
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
          this.config.tracking = false
          return false
        } else {
          this.config.tracking = true
          /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
          this.data.start.t = new Date().getTime()
          this.data.start.x = e.targetTouches[0].clientX
          this.data.start.y = e.targetTouches[0].clientY
          this.data.end.x = e.targetTouches[0].clientX
          this.data.end.y = e.targetTouches[0].clientY
        }
      } else {
        this.config.tracking = true
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        this.data.start.t = new Date().getTime()
        this.data.start.x = e.clientX
        this.data.start.y = e.clientY
        this.data.end.x = e.clientX
        this.data.end.y = e.clientY
      }
    },
    swipeMove (e) {
      if (this.config.tracking) {
        if (e.type === 'touchmove') {
          this.data.end.x = e.targetTouches[0].clientX
          this.data.end.y = e.targetTouches[0].clientY
        } else {
          this.data.end.x = e.clientX
          this.data.end.y = e.clientY
        }
        let deltaX = Math.abs(this.data.end.x - this.data.start.x)
        let deltaY = Math.abs(this.data.end.y - this.data.start.y)
        if (deltaX >= deltaY && this.config.direction !== 'vertical') {
          e.preventDefault()
        } else if (deltaX <= deltaY && this.config.direction === 'vertical') {
          e.preventDefault()
        }
        if (this.config.direction === 'vertical') {
          if (deltaX > deltaY) {
            return
          }
          // 处理嵌套滚动
        } else {
          if (deltaX < deltaY) {
            return
          }
        }
      }
    },
    swipeEnd (e) {
      this.config.tracking = false
      let now = new Date().getTime()
      let deltaTime = now - this.data.start.t
      let currentPage = this.data.currentPage
      let deltaX = this.data.end.x - this.data.start.x
      let deltaY = this.data.end.y - this.data.start.y
      let thresholdDistance = this.config.thresholdDistance
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
      if (deltaTime > this.config.thresholdTime || deltaTime < 100) {
        this.slide(currentPage)
        return false
      }
      if ((Math.abs(deltaX) < thresholdDistance || Math.abs(deltaY) > thresholdDistance) && this.config.direction !== 'vertical') {
        this.slide(currentPage)
        return false
      }
      if ((Math.abs(deltaX) > thresholdDistance || Math.abs(deltaY) < thresholdDistance) && this.config.direction === 'vertical') {
        this.slide(currentPage)
        return false
      }
    },
    swipeOut (e) {
      if (this.$el === e.target && this.config.tracking) {
        this.swipeEnd(e)
      }
    },
    onTransitionEnd (e, type) {
      if (!this.options.loop || (this.data.currentPage > 0 && this.data.currentPage < this.config.sliderLength)) {
        return
      }
      let that = this
      setTimeout(function () {
        let currentPage = that.data.currentPage
        let sliderLength = that.config.sliderLength
        that.config.transitionEnding = false
        if (currentPage < 0) {
          that.slide(sliderLength + currentPage, 'animationnone')
        } else if (currentPage >= sliderLength) {
          that.slide(0 + currentPage - sliderLength, 'animationnone')
        }
      }, 0)
    },
    onItemTransitionEnd (e) {
      if (e.target !== e.currentTarget) {
        return
      }
      var that = this
      setTimeout(function () {
        that.config.itemTransitionEnding = false
      }, 0)
    }
  }
}
