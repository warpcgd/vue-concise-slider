export default {
  name: 'sliderComputed',
  mounted() {
    let that = this
    // 初始化事件
    this.$emit('init', this.data)
    // 定制事件
    this.$on('slideTo', num => {
      this.slide(num)
    })
    this.$on('slideNext', () => {
      this.next()
    })
    this.$on('slidePre', () => {
      this.pre()
    })
    this.$on('autoplayStart', autoplay => {
      this.options.autoplay = autoplay || this.options.autoplay || 1000
      this.clock().begin(that)
    })
    this.$on('autoplayStop', () => {
      this.options.autoplay = 0
      this.clock().stop(that)
    })
    this.$on('loadingShow', () => {
      this.config.loading = true
    })
    this.$on('loadingHide', () => {
      this.config.loading = false
    })
    if (this.options.autoplay) {
      // 自动轮播 支持无缝滚动
      this.clock().begin(that)
    }
    // 添加reszie监听
    if (this.config.resize) {
      window.addEventListener('resize', this.resize)
    }
    // 解决页面切换报错bug
    document.addEventListener('visibilitychange', this.visibilitychange, false)
  },
  beforeDestroy() {
    this.options.autoplay && this.clock().stop(this)
    if (this.options.preventDocumentMove === true) {
      document.removeEventListener('touchmove', this.preventDefault())
    }
    document.removeEventListener('visibilitychange', this.visibilitychange, false)
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    // 解决route跳转问题
    $route: function() {
      let that = this
      if (that.route) {
        let currentPage = that.data.currentPage
        let sliderLength = that.config.sliderLength
        that.config.transitionEnding = false
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
  methods: {
    visibilitychange() {
      let that = this
      if (document.hidden) {
        that.options.autoplay && that.clock().stop(that)
      } else {
        that.options.autoplay && that.clock().begin(that)
      }
    },
    resize() {
      this.config.pageWidth = this.$el.offsetWidth
      this.config.pageHeight = this.$el.offsetHeight
      // 修复循环切换bug
      if (this.data.currentPage >= this.config.sliderLength && this.options.loop) {
        this.slide(0, 'animationnone')
        return false
      }
      this.slide(this.data.currentPage, 'animationnone')
    },
    onItemTransitionEnd(e) {
      if (e.target !== e.currentTarget) {
        return
      }
      var that = this
      setTimeout(function() {
        that.config.itemTransitionEnding = false
      }, 0)
    }
  }
}
