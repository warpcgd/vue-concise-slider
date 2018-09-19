<template>
  <div 
  @webkit-transition-end="onTransitionEnd"
  @transitionend="onTransitionEnd" 
  :class="slideClass"
  :style="[transform(index)]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['options', 'data', 's_data', 'index', 'pageLength'],
  name: 'slideritem',
  data () {
    return {
      slideClass: {
        'slider-item': true,
        'slider-active': false
      }
    }
  },
  mounted () {
    this.renderDom()
    // console.log(this.options)
  },
  methods: {
    renderDom () {
      if (this.$parent) {
        this.$parent.renderDom(this.$el)
      }
    },
    addActive () {
      this.slideClass['slider-active'] = true
    },
    removeActive () {
      this.slideClass['slider-active'] = false
    },
    onTransitionEnd (e) {
      if (this.$parent) {
        this.$parent.onItemTransitionEnd(e)
      }
    },
    transform: function () {
      if (!this.options || !this.data || !this.s_data || !this.$el) {
        return {}
      }
      let index = this.index
      let winWidth = this.s_data.pageWidth
      let height = this.s_data.pageHeight
      let width = this.$el.offsetWidth
      let offsetWidth = winWidth / 2 - width / 2
      let leftWidth = offsetWidth - this.s_data.deviation + 'px'
      let rightWidth = offsetWidth + this.s_data.deviation + 'px'
      let centerWidth = offsetWidth + 'px'
      let style = {}
      // 基本
      if (index === this.data.currentPage - 1 || (index === this.pageLength - 2 && this.data.currentPage === -1)) {
        // style['left'] = leftWidth
        style['transform'] = 'translate3D(' + leftWidth + ',0 ,0)'
        style['width'] = width * this.s_data.widthScalingRatio + 'px'
        style['height'] = height * this.s_data.heightScalingRatio + 'px'
        style['opacity'] = '1'
        if (this.data.direction === 'left') {
          style['z-index'] = '10'
        } else {
          style['z-index'] = '1'
        }
      } else if (index === this.data.currentPage + 1 || (index === 1 && this.data.currentPage === this.pageLength)) {
        // style['left'] = rightWidth
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)'
        style['width'] = width * this.s_data.widthScalingRatio + 'px'
        style['height'] = height * this.s_data.heightScalingRatio + 'px'
        style['opacity'] = '1'
        if (this.data.direction === 'left') {
          style['z-index'] = '1'
        } else {
          style['z-index'] = '10'
        }
      } else if (index === this.data.currentPage) {
        // style['left'] = centerWidth
        style['transform'] = 'translate3D(' + centerWidth + ',0 ,0)'
        style['z-index'] = '99'
        style['opacity'] = '1'
      } else {
        style['transform'] = 'translate3D(' + centerWidth + ',0 ,0)'
        // style['left'] = centerWidth
        style['opacity'] = '0'
      }
      // 循环拓展
      if (index === this.pageLength - 1 && this.data.currentPage === 0) {
        style['transform'] = 'translate3D(' + leftWidth + ',0 ,0)'
        // style['left'] = leftWidth
        style['width'] = width * this.s_data.widthScalingRatio + 'px'
        style['height'] = height * this.s_data.heightScalingRatio + 'px'
        style['opacity'] = '1'
      }
      if (index === 0 && this.data.currentPage === this.pageLength - 1) {
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)'
        // style['left'] = rightWidth
        style['width'] = width * this.s_data.widthScalingRatio + 'px'
        style['height'] = height * this.s_data.heightScalingRatio + 'px'
        style['opacity'] = '1'
      }
      // 切换优化
      if (((index === this.pageLength - 1 || index === this.pageLength - 2) && this.data.currentPage === -1) || ((index === 0 || index === 1) && this.data.currentPage === this.pageLength)) {
        style['opacity'] = '1'
        if (index === 0) {
          style['z-index'] = '99'
        }
        if (index === this.pageLength - 1) {
          style['z-index'] = '99'
        }
      }
      style[this.s_data.prefixes.transition + 'Duration'] = (this.s_data.animation ? this.options.speed || 300 : 0) + 'ms'
      style['position'] = 'absolute'
      return style
    }
  }
}
</script>