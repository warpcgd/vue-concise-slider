export default {
  name: 'sliderComputed',
  computed: {
    styleobj() {
      let style = {}
      style['transform'] =
        'translate3D(' + this.data.poswidth + 'px' + ',' + this.data.posheight + 'px' + ',0)'
      style['transitionTimingFunction'] = this.options.timingFunction || 'ease'
      style['-webkitTransitionTimingFunction'] = this.options.timingFunction || 'ease'
      style['transitionDuration'] = (this.config.animation ? this.options.speed || 300 : 0) + 'ms'
      style['-webkitTransitionDuration'] =
        (this.config.animation ? this.options.speed || 300 : 0) + 'ms'
      if (this.config.effect === 'fade') {
        return {}
      }
      if (this.config.effect === 'coverflow') {
        return {}
      }
      return style
    },
    currentWidth() {
      if (this.config.sliderLength === 0) {
        return 0
      }
      if (this.config.effect === 'fade') {
        return 0
      }
      if (this.config.effect === 'coverflow') {
        return 0
      }
      let $slider
      let lastPage = this.data.currentPage
      let pageWidth = this.config.pageWidth
      let loopedSlides = this.options.loopedSlides || 1
      // let srollbar = false
      if (this.options.loop) {
        if (loopedSlides) {
          lastPage =
            lastPage +
            (loopedSlides <= this.config.sliderLength ? loopedSlides : this.config.sliderLength)
        } else {
          lastPage = lastPage + 1
        }
      }
      // coverflow
      if (this.options.effect === 'coverflow') {
        let lastPage = this.data.currentPage
        lastPage -= 1
      }
      // 获取slideritem子集
      for (let item in this.$el.children) {
        if (/slider-touch/gi.test(this.$el.children[item].className)) {
          $slider = this.$el.children[item]
        }
      }
      // 遍历子集
      let $sliderChildren = $slider.children[0].children
      let offsetLeft = $sliderChildren[lastPage] ? $sliderChildren[lastPage].offsetLeft : 0
      // 居中滚动
      let offsetWidth = $sliderChildren[lastPage]
        ? $sliderChildren[lastPage].offsetWidth
        : $sliderChildren[this.data.currentPage]
          ? $sliderChildren[this.data.currentPage].offsetWidth
          : 0

      let slidesPerView = this.config.slidesPerView
      let sliderLength = this.config.sliderLength

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
      // 非居中滚动
      if (!this.options.centeredSlides && slidesPerView) {
        let currentPage = this.data.currentPage
        let slidesToScroll = this.options.slidesToScroll || 1
        if (currentPage + slidesToScroll >= sliderLength) {
          offsetLeft = $sliderChildren[sliderLength - slidesToScroll].offsetLeft
        }
      }
      return offsetLeft + pageWidth - pageWidth
    },
    currentHeight() {
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
        if (/slider-touch/gi.test(this.$el.children[item].className)) {
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
    classObject() {
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
  }
}
