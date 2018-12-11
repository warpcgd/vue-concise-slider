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
  name: 'sliderDom',
  data () {
    return {
      data: {
        currentPage: this.options.currentPage || 0
      },
      config: {
        pageWidth: '',
        pageHeight: '',
        sliderLength: 0,
        renderTime: '',
        pagination: this.options.pagination === undefined ? true : this.options.pagination,
        containerClass: {
          'swiper-container-vertical': false,
          'swiper-container-horizontal': true,
          'swiper-container-cursorGrab': this.options.grabCursor || false
        }
      }
    }
  },
  mounted () {
    this.config.pageWidth = this.$el.offsetWidth
    this.config.pageHeight = this.$el.offsetHeight
    // 初始化事件
    this.$emit('init', this.data)
  },
  methods: {
    renderDom (item) {
      let that = this
      // 防抖函数
      if (this.config.renderTime) {
        clearTimeout(this.config.renderTime)
      }
      // fade添加z-index
      that.config.sliderLength += 1
      if (that.config.sliderLength >= 1 && that.options.effect === 'fade') {
        if (item.previousSibling) {
          item['style']['z-index'] = 99 - that.config.sliderLength
        } else {
          item['style']['z-index'] = 99 + that.config.sliderLength
        }
      }
      this.config.renderTime = setTimeout(() => {
        that.config.renderTime = undefined
        let slideDom = that.$el.getElementsByClassName('slider-wrapper')[0]
        let children = Array.prototype.slice.call(slideDom.children)
        let sliderItem = children.filter((item) => {
          return item.className.indexOf('slider-item') !== -1
        })
        if (that.config.sliderLength >= 1 && that.options.loop && that.options.effect !== 'fade' && that.options.effect !== 'coverflow') {
          // 先清空上次添加的节点
          let sliderCopy = slideDom.getElementsByClassName('slider-copy')
          for (let i = sliderCopy.length - 1; i >= 0; i--) {
            slideDom.removeChild(sliderCopy[i])
          }
          let children = Array.prototype.slice.call(slideDom.children)
          // 批量复制添加
          sliderItem = children.filter((item) => {
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
        that.$emit('hasRenderDom', that.data)
        that.$nextTick(() => {
          that.slide(that.data.currentPage, 'animationnone')
        })
      }, 0)
    }
  }
}
