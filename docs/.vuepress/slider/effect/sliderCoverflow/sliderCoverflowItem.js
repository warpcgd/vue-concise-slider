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
      }
    }
  },
  methods: {
    transform () {
      // debugger
      let options = this.$parent.options
      let data = this.$parent.data
      let config = this.$parent.config
      let index = this.index
      let winWidth = config.pageWidth
      // let height = config.pageHeight
      let width = this.$el.offsetWidth
      let offsetWidth = winWidth / 2 - width / 2
      let leftWidth = offsetWidth - config.deviation + 'px'
      let rightWidth = offsetWidth + config.deviation + 'px'
      let centerWidth = offsetWidth + 'px'
      let style = {}
      // 基本
      if (index === data.currentPage - 1 || (index === this.pageLength - 2 && data.currentPage === -1)) {
        style['transform'] = 'translate3D(' + leftWidth + ',0 ,0)' + ' scale3d(' + config.widthScalingRatio + ',' + config.heightScalingRatio + ',1)'
        style['opacity'] = '1'
        if (data.direction === 'left') {
          style['z-index'] = '10'
        } else {
          style['z-index'] = '1'
        }
      } else if (index === data.currentPage + 1 || (index === 1 && data.currentPage === this.pageLength)) {
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)'
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)' + ' scale3d(' + config.widthScalingRatio + ',' + config.heightScalingRatio + ',1)'
        style['opacity'] = '1'
        if (data.direction === 'left') {
          style['z-index'] = '1'
        } else {
          style['z-index'] = '10'
        }
      } else if (index === data.currentPage) {
        style['transform'] = 'translate3D(' + centerWidth + ',0 ,0)' + ' scale3d(' + 1 + ',' + 1 + ',1)'
        style['z-index'] = '99'
        style['opacity'] = '1'
      } else {
        style['transform'] = 'translate3D(' + centerWidth + ',0 ,0)'
        style['opacity'] = '0'
      }
      // 循环拓展
      if (index === this.pageLength - 1 && data.currentPage === 0) {
        style['transform'] = 'translate3D(' + leftWidth + ',0 ,0)' + ' scale3d(' + config.widthScalingRatio + ',' + config.heightScalingRatio + ',1)'
        style['opacity'] = '1'
      }
      if (index === 0 && data.currentPage === this.pageLength - 1) {
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)' + ' scale3d(' + config.widthScalingRatio + ',' + config.heightScalingRatio + ',1)'
        style['opacity'] = '1'
      }
      // 切换优化
      if (((index === this.pageLength - 1 || index === this.pageLength - 2) && data.currentPage === -1) || ((index === 0 || index === 1) && data.currentPage === this.pageLength)) {
        style['opacity'] = '1'
        if (index === 0) {
          style['z-index'] = '99'
        }
        if (index === this.pageLength - 1) {
          style['z-index'] = '99'
        }
      }
      style[config.prefixes.transition + 'Duration'] = (config.animation ? options.speed || 300 : 0) + 'ms'
      style['position'] = 'absolute'
      return style
    }
  }
}
