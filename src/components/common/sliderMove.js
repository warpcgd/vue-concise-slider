import { getTranformMaxWidth } from '../../utils/index.js'
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
        transitionEnding: false,
        itemTransitionEnding: false,
        animation: false,
        tracking: false,
        gestureDirection: '',
        thresholdDistance: this.options.thresholdDistance || 50,
        thresholdTime: this.options.thresholdTime || 1000,
        direction: this.options.direction || 'horizontal',
        freeze: this.options.freeze === undefined ? false : this.options.freeze,
        preventRebound: this.options.preventRebound === undefined ? false : this.options.preventRebound
      }
    }
  },
  methods: {
    swipeStart (e) {
      let that = this
      if (this.config.transitionEnding) {
        return false
      }
      if (this.config.itemTransitionEnding && this.options.itemAnimation) {
        return false
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
      return true
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
        let deltaX = this.data.end.x - this.data.start.x
        let deltaY = this.data.end.y - this.data.start.y
        let deltaXAbs = Math.abs(deltaX)
        let deltaYAbs = Math.abs(deltaY)
        let tranformMaxWidth = getTranformMaxWidth(this.$el)
        if (deltaXAbs >= deltaYAbs && this.config.direction !== 'vertical') {
          e.preventDefault()
        } else if (deltaXAbs <= deltaYAbs && this.config.direction === 'vertical') {
          e.preventDefault()
        }
        // 判定方向
        if (deltaX > 0) {
          this.config.gestureDirection = 'right'
        } else {
          this.config.gestureDirection = 'left'
        }
        // 处理free模式
        if (this.config.preventRebound && !this.config.loop && ((this.config.gestureDirection === 'right' && this.data.poswidth === 0) || (this.config.gestureDirection === 'left' && this.data.poswidth === -tranformMaxWidth))) {
          this.data.start.x = this.data.end.x
          let transform = window.getComputedStyle(e.currentTarget).getPropertyValue('transform')
          let transformX = parseFloat(transform.substring(7).split(',')[4])
          let transformY = parseFloat(transform.substring(7).split(',')[5])
          this.config.freePosWidth = transformX
          this.config.freePosHeight = transformY
          return false
        }
        // 处理嵌套滚动
        if (this.config.direction === 'vertical' && deltaXAbs > deltaYAbs) {
          return false
        }
        if (this.config.direction === 'horizontal' && deltaXAbs < deltaYAbs) {
          return false
        }
        return true
      }
      return false
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
      if (this.config.effect === 'free') {
        return
      }
      if (deltaTime > this.config.thresholdTime || deltaTime < 100) {
        this.slide(currentPage)
        return true
      }
      if ((Math.abs(deltaX) < thresholdDistance || Math.abs(deltaY) > thresholdDistance) && this.config.direction !== 'vertical') {
        this.slide(currentPage)
        return true
      }
      if ((Math.abs(deltaX) > thresholdDistance || Math.abs(deltaY) < thresholdDistance) && this.config.direction === 'vertical') {
        this.slide(currentPage)
        return true
      }
      if (this.config.direction !== 'vertical') {
        if (deltaX > thresholdDistance) {
          // swipe left
          this.pre()
          return true
        } else if (-deltaX > thresholdDistance) {
          // swipe right
          this.next()
          return true
        } else {
          this.slide(currentPage)
          return true
        }
      }
      if (this.config.direction === 'vertical') {
        if (deltaY > thresholdDistance) {
          // swipe bottom
          this.pre()
          return true
        } else if (-deltaY > thresholdDistance) {
          // swipe top
          this.next()
          return true
        } else {
          this.slide(currentPage)
          return true
        }
      }
    },
    swipeOut (e) {
      if (this.$el === e.target && this.config.tracking) {
        this.swipeEnd(e)
      }
    },
    onTransitionEnd (e, type) {
      if (!this.options.loop || this.config.effect === 'free' || (this.data.currentPage > 0 && this.data.currentPage < this.config.sliderLength)) {
        return
      }
      let that = this
      setTimeout(function () {
        let currentPage = that.data.currentPage
        let sliderLength = that.config.sliderLength
        that.config.transitionEnding = false
        // debugger
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
