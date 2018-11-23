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
  name: 'sliderBasic',
  data () {
    return {
      data: {
      },
      config: {
        slidesToScroll: this.options.slidesToScroll || 1,
        effect: this.options.effect || 'slide',
        thresholdDistance: this.options.thresholdDistance || 50,
        thresholdTime: this.options.thresholdTime || 1000,
        direction: this.options.direction || 'horizontal',
        transitionEnding: false,
        itemTransitionEnding: false,
        animation: false,
        slidesPerView: this.options.slidesPerView === undefined ? 0 : this.options.slidesPerView
      }
    }
  },
  methods: {
    swipeMove (e) {
      if (this.config.tracking) {
        if (this.config.direction === 'vertical') {
          // 处理嵌套滚动
          this.data.posheight = -(this.currentHeight) + this.data.end.y - this.data.start.y
        } else {
          this.data.poswidth = -(this.currentWidth) + this.data.end.x - this.data.start.x
        }
      }
    },
    swipeEnd (e) {
      let deltaX = this.data.end.x - this.data.start.x
      let deltaY = this.data.end.y - this.data.start.y
      let thresholdDistance = this.config.thresholdDistance
      let currentPage = this.data.currentPage
      if (this.config.direction !== 'vertical') {
        if (deltaX > thresholdDistance) {
          // swipe right
          this.pre()
          return false
        } else if (-deltaX > thresholdDistance) {
          // swipe left
          this.next()
          return false
        } else {
          this.slide(currentPage)
          return false
        }
      }
      if (this.config.direction === 'vertical') {
        if (deltaY > thresholdDistance) {
          // swipe bottom
          this.pre()
          return false
        } else if (-deltaY > thresholdDistance) {
          // swipe top
          this.next()
          return false
        } else {
          this.slide(currentPage)
          return false
        }
      }
    },
    pre () {
      this.data.direction = 'left'
      let slidesToScroll = this.config.slidesToScroll
      if (this.data.currentPage >= 1 && this.data.currentPage - slidesToScroll >= 0) {
        this.data.currentPage -= slidesToScroll || 1
        this.slide()
        return false
      }
      if (this.options.loop && this.data.currentPage - slidesToScroll < 0) {
        this.data.currentPage -= slidesToScroll || 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        this.slide()
        return false
      }
      this.slide()
    },
    next () {
      this.data.direction = 'right'
      let sliderLength = this.config.sliderLength
      let slidesToScroll = this.config.slidesToScroll
      let slidesPerView = this.options.loop ? 0 : ((sliderLength - this.config.slidesPerView) / slidesToScroll)
      if (this.data.currentPage < sliderLength - 1 && this.data.currentPage + slidesToScroll <= (slidesPerView ? slidesPerView + slidesToScroll - 1 : sliderLength - 1)) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.slide()
        return false
      }
      if (this.options.loop && this.data.currentPage + slidesToScroll > sliderLength - 1) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        this.slide()
        return false
      }
      this.slide()
    },
    slide (pagenum, type) {
      // 执行动画
      this.config.animation = true
      // 无样式滚动
      if (type === 'animationnone') {
        this.config.animation = false
      }
      if (pagenum || pagenum === 0) {
        this.data.currentPage = pagenum
      }
      // 增加垂直滚动判定
      if (this.options.direction === 'vertical' && this.config.effect !== 'fade') {
        this.data.posheight = -this.currentHeight
      } else {
        this.data.poswidth = -this.currentWidth
      }
    }
  }
}
