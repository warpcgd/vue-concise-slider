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
  name: 'sliderNest',
  data() {
    return {
      data: {},
      config: {
        slidesToScroll: this.options.slidesToScroll || 1,
        effect: this.options.effect || 'slide',
        thresholdDistance: this.options.thresholdDistance || 50,
        thresholdTime: this.options.thresholdTime || 1000,
        direction: this.options.direction || 'horizontal',
        transitionEnding: false,
        itemTransitionEnding: false,
        animation: false,
        slidesPerView: this.options.slidesPerView || 0,
        $parent: this.judgeParentSlider(this),
        nested: this.options.nested === undefined ? true : this.options.nested
      }
    }
  },
  methods: {
    judgeParentSlider(that) {
      if (
        that.$parent &&
        that.$parent.$vnode &&
        that.$parent.$vnode.tag === 'vue-component-1-slider'
      ) {
        return that.$parent
      } else if (that.$parent && that.$parent.$vnode === undefined) {
        return false
      } else {
        return this.judgeParentSlider(that.$parent)
      }
    },
    swipeMove(e) {
      let $parent = this.config.$parent
      // 嵌套滚动处理事件传播
      if ($parent && $parent.config.direction === this.config.direction) {
        e.stopPropagation()
      }
      if (this.config.tracking) {
        if (this.config.direction === 'vertical') {
          if (
            $parent &&
            $parent.options.direction === 'vertical' &&
            this.data.currentPage === 0 &&
            this.data.end.y - this.data.start.y >= 0 &&
            $parent.config.nested &&
            !($parent.options.preventRebound && $parent.data.currentPage === 0)
          ) {
            $parent.data.posheight = -$parent.currentHeight + this.data.end.y - this.data.start.y
          } else if (
            $parent &&
            $parent.options.direction === 'vertical' &&
            this.data.currentPage === this.config.sliderLength - 1 &&
            this.data.end.y - this.data.start.y <= 0 &&
            $parent.config.nested
          ) {
            $parent.data.posheight = -$parent.currentHeight + this.data.end.y - this.data.start.y
          } else if (this.options.preventRebound && !this.options.loop) {
            return
          } else {
            this.data.posheight = -this.currentHeight + this.data.end.y - this.data.start.y
          }
        } else {
          if (
            $parent &&
            $parent.options.direction !== 'vertical' &&
            this.data.currentPage === 0 &&
            this.data.end.x - this.data.start.x >= 0 &&
            $parent.config.nested &&
            !($parent.options.preventRebound && $parent.data.currentPage === 0)
          ) {
            $parent.data.poswidth = -$parent.currentWidth + this.data.end.x - this.data.start.x
          } else if (
            $parent &&
            $parent.options.direction !== 'vertical' &&
            this.data.currentPage === this.config.sliderLength - 1 &&
            this.data.end.x - this.data.start.x <= 0 &&
            $parent.config.nested
          ) {
            $parent.data.poswidth = -$parent.currentWidth + this.data.end.x - this.data.start.x
          } else if (this.options.preventRebound && !this.options.loop) {
            return
          } else {
            this.data.poswidth = -this.currentWidth + this.data.end.x - this.data.start.x
          }
        }
      }
    },
    pre() {
      let $parent = this.config.$parent
      if ($parent && this.data.currentPage === 0 && $parent.config.nested) {
        $parent.pre()
        this.slide()
        return false
      }
    },
    next() {
      let sliderLength = this.config.sliderLength
      let $parent = this.config.$parent
      if ($parent && this.data.currentPage === sliderLength - 1 && $parent.config.nested) {
        let parent = this.config.$parent
        parent.next()
        this.slide()
        return false
      }
    }
  }
}
