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
  name: 'sliderClock',
  data() {
    return {
      data: {},
      config: {
        setIntervalid: ''
      }
    }
  },
  methods: {
    clock: function() {
      // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
      return {
        begin: function(that) {
          if (that.config.setIntervalid) {
            return
          }
          if (that.options.autoplay === 0) {
            return
          }
          that.config.setIntervalid = setInterval(function() {
            that.next()
            if (that.data.currentPage === that.config.sliderLength - 1 && !that.options.loop) {
              clearInterval(that.config.setIntervalid)
              that.config.setIntervalid = 0
            }
          }, that.options.autoplay)
        },
        stop: function(that) {
          clearInterval(that.config.setIntervalid)
          that.config.setIntervalid = 0
        }
      }
    }
  }
}
