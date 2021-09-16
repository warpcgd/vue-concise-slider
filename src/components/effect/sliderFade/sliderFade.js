export default {
  props: {
    options: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  name: 'sliderCoverflow',
  data() {
    return {
      data: {},
      config: {
        thresholdDistance: this.options.thresholdDistance || 50,
        transitionEnding: false,
        itemTransitionEnding: false
      }
    }
  },
  methods: {
    pre() {
      let sliderLength = this.config.sliderLength
      if (this.data.currentPage >= 1) {
        this.data.currentPage -= 1
        this.slide()
        return false
      }
      if (this.options.loop) {
        this.data.currentPage -= 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        if (this.data.currentPage < 0) {
          this.slide(sliderLength - 1)
          this.config.transitionEnding = false
          this.config.itemTransitionEnding = false
          return false
        }
      }
      this.slide()
    },
    next() {
      let sliderLength = this.config.sliderLength
      if (this.data.currentPage < sliderLength - 1) {
        this.data.currentPage += 1
        this.slide()
        return false
      }
      if (this.options.loop) {
        this.data.currentPage += 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        if (this.data.currentPage >= sliderLength) {
          this.slide(0)
          this.config.transitionEnding = false
          this.config.itemTransitionEnding = false
          return false
        }
      }
      this.slide()
    },
    slide(pagenum, type) {
      // 渐变切换
      this.fadeDom()
    },
    fadeDom() {
      let currentPage = this.data.currentPage
      let slideDom = this.$el.getElementsByClassName('slider-wrapper')[0]
      let sliderItem = slideDom.getElementsByClassName('slider-item')
      let speed = this.options.speed
      for (let i = 0; i < sliderItem.length; i++) {
        if (i === currentPage || i === currentPage + 1) {
          sliderItem[i]['style']['opacity'] = '1'
          sliderItem[i]['style']['transition-property'] = 'opacity'
          sliderItem[i]['style']['-webkit-transition-property'] = 'opacity'
          sliderItem[i]['style']['transition-duration'] =
            (this.config.animation ? speed || 300 : 0) + 'ms'
          sliderItem[i]['style']['-wekkit-transition-duration'] =
            (this.config.animation ? speed || 300 : 0) + 'ms'
        } else {
          sliderItem[i]['style']['opacity'] = '0'
          sliderItem[i]['style']['transition-duration'] =
            (this.config.animation ? speed || 300 : 0) + 'ms'
          sliderItem[i]['style']['-webkit-transition-duration'] =
            (this.config.animation ? speed || 300 : 0) + 'ms'
        }
      }
    }
  }
}
