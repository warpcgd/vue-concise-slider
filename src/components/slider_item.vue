<template>
  <div 
  @touchstart="touchStart"
  @touchend="touchEnd"
  @mousedown="touchStart"
  @mouseup="touchEnd"
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
  props: ['index', 'pageLength'],
  name: 'slideritem',
  data () {
    return {
      slideClass: {
        'slider-item': true,
        'slider-active': false
      },
      data: {
        start: {},
        end: {},
        index: this.index ? this.index : this.$vnode.key,
        $el: ''
      }
    }
  },
  mounted () {
    this.renderDom()
    this.data.$el = this.$el
    // console.log(options)
  },
  methods: {
    touchStart (e) {
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.data.tracking = false
          return false
        } else {
          /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
          this.data.start.t = new Date().getTime()
          this.data.start.x = e.targetTouches[0].clientX
          this.data.start.y = e.targetTouches[0].clientY
          this.data.end.x = e.targetTouches[0].clientX
          this.data.end.y = e.targetTouches[0].clientY
          this.data.start.pageX = e.targetTouches[0].pageX
          this.data.start.pageY = e.targetTouches[0].pageY
        }
      } else {
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        this.data.start.t = new Date().getTime()
        this.data.start.x = e.clientX
        this.data.start.y = e.clientY
        this.data.end.x = e.clientX
        this.data.end.y = e.clientY
        this.data.start.pageX = e.pageX
        this.data.start.pageY = e.pageY
      }
    },
    touchEnd (e) {
      let now = new Date().getTime()
      let deltaTime = now - this.data.start.t
      if (e.type === 'touchend') {
        this.data.end.t = new Date().getTime()
        this.data.end.x = e.changedTouches[0].clientX
        this.data.end.y = e.changedTouches[0].clientY
        this.data.end.pageX = e.changedTouches[0].pageX
        this.data.end.pageY = e.changedTouches[0].pageY
      } else {
        this.data.end.t = new Date().getTime()
        this.data.end.x = e.clientX
        this.data.end.y = e.clientY
        this.data.end.pageX = e.pageX
        this.data.end.pageY = e.pageY
      }
      let deltaX = (this.data.end.pageX - this.data.start.pageX) || 0
      let deltaY = (this.data.end.pageY - this.data.start.pageY) || 0
      if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        this.$emit('tap', this.data)
      }
    },
    renderDom () {
      // console.log(this.$parent)
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
    transform () {
      let options = this.$parent.options
      let data = this.$parent.data
      let sData = this.$parent.s_data
      if (!options || !data || !sData || !this.$el || options.effect !== 'coverflow') {
        return {}
      }
      let index = this.index
      let winWidth = sData.pageWidth
      // let height = sData.pageHeight
      let width = this.$el.offsetWidth
      let offsetWidth = winWidth / 2 - width / 2
      let leftWidth = offsetWidth - sData.deviation + 'px'
      let rightWidth = offsetWidth + sData.deviation + 'px'
      let centerWidth = offsetWidth + 'px'
      let style = {}
      // 基本
      if (index === data.currentPage - 1 || (index === this.pageLength - 2 && data.currentPage === -1)) {
        style['transform'] = 'translate3D(' + leftWidth + ',0 ,0)' + ' scale3d(' + sData.widthScalingRatio + ',' + sData.heightScalingRatio + ',1)'
        style['opacity'] = '1'
        if (data.direction === 'left') {
          style['z-index'] = '10'
        } else {
          style['z-index'] = '1'
        }
      } else if (index === data.currentPage + 1 || (index === 1 && data.currentPage === this.pageLength)) {
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)'
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)' + ' scale3d(' + sData.widthScalingRatio + ',' + sData.heightScalingRatio + ',1)'
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
        style['transform'] = 'translate3D(' + leftWidth + ',0 ,0)' + ' scale3d(' + sData.widthScalingRatio + ',' + sData.heightScalingRatio + ',1)'
        style['opacity'] = '1'
      }
      if (index === 0 && data.currentPage === this.pageLength - 1) {
        style['transform'] = 'translate3D(' + rightWidth + ',0 ,0)' + ' scale3d(' + sData.widthScalingRatio + ',' + sData.heightScalingRatio + ',1)'
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
      style[sData.prefixes.transition + 'Duration'] = (sData.animation ? options.speed || 300 : 0) + 'ms'
      style['position'] = 'absolute'
      return style
    }
  }
}
</script>