import sliderNest from './sliderNest.js'
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
        slidesPerView: this.options.slidesPerView === undefined ? 0 : this.options.slidesPerView,
        $parent: this.judgeParentSlider(this),
        nested: this.options.nested === undefined ? true : this.options.nested
      }
    }
  },
  methods: {
    judgeParentSlider (that) {
      if (that.$parent && that.$parent.$vnode && that.$parent.$options._componentTag === 'slider') {
        return that.$parent
      } else if (that.$parent && that.$parent.$vnode === undefined) {
        return false
      } else {
        return this.judgeParentSlider(that.$parent)
      }
    },
    swipeMove (e) {
      if (this.config.tracking && this.config.effect === 'slide') {
        if (this.config.direction === 'vertical') {
          // 处理嵌套滚动
          this.data.posheight = -(this.currentHeight) + this.data.end.y - this.data.start.y
        } else {
          this.data.poswidth = -(this.currentWidth) + this.data.end.x - this.data.start.x
        }
      }
      if (this.config.effect === 'nest') {
        sliderNest.methods.swipeMove.call(this, e)
      }
    },
    pre () {
      let $parent = this.config.$parent
      let slidesToScroll = this.config.slidesToScroll
      if (this.data.currentPage >= 1 && this.data.currentPage - slidesToScroll >= 0) {
        this.data.currentPage -= slidesToScroll || 1
        this.slide()
        return false
      }
      if (this.options.loop && this.data.currentPage - slidesToScroll < 0 && (!$parent || !$parent.config.nested)) {
        this.data.currentPage -= slidesToScroll || 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        this.slide()
        return false
      }
      if (this.config.effect === 'nest') {
        return sliderNest.methods.pre.call(this)
      }
      this.slide(0)
    },
    next () {
      let $parent = this.config.$parent
      let sliderLength = this.config.sliderLength
      let slidesToScroll = this.config.slidesToScroll
      // let slidesPerView = this.options.loop ? 0 : ((sliderLength - this.config.slidesPerView) / slidesToScroll)
      if (this.data.currentPage < sliderLength - 1 && this.data.currentPage + slidesToScroll <= sliderLength - 1) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.slide()
        return false
      }
      if (this.options.loop && this.data.currentPage + slidesToScroll > sliderLength - 1 && (!$parent || !$parent.config.nested)) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        this.slide()
        return false
      }
      if (this.config.effect === 'nest') {
        return sliderNest.methods.next.call(this)
      }
      this.slide()
    },
    slide (pagenum, type) {
      // 增加垂直滚动判定
      if (this.options.direction === 'vertical' && this.config.effect !== 'fade') {
        this.data.posheight = -this.currentHeight
      } else {
        this.data.poswidth = -this.currentWidth
      }
    }
  }
}
