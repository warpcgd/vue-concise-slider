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
  name: 'sliderDom',
  data() {
    return {
      data: {
        currentPage: this.options.currentPage || 0
      },
      config: {
        pageWidth: '',
        pageHeight: '',
        renderTime: '',
        sliderIndex: 0,
        loop: this.options.loop,
        loopedSlides: this.options.loopedSlides || 1,
        pagination: this.options.pagination === undefined ? true : this.options.pagination
      }
    }
  },
  methods: {
    renderDom(item) {
      let that = this
      // 防抖函数
      if (this.config.renderTime) {
        clearTimeout(this.config.renderTime)
      }
      // debugger
      this.config.sliderIndex += 1
      // fade添加z-index
      if (that.config.sliderIndex >= 1 && that.options.effect === 'fade') {
        if (item.previousSibling) {
          item['style']['z-index'] = 99 - that.config.sliderIndex
        } else {
          item['style']['z-index'] = 99 + that.config.sliderIndex
        }
      }
      this.config.renderTime = setTimeout(() => {
        that.config.renderTime = undefined
        that.$emit('hasRenderDom', that.data)
        that.$nextTick(() => {
          that.slide(that.data.currentPage, 'animationnone')
        })
      }, 0)
    }
  }
}
