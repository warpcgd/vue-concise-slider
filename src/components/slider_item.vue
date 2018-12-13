<template>
  <div 
  @touchstart="touchStart"
  @touchend="touchEnd"
  @mousedown="touchStart"
  @mouseup="touchEnd"
  @webkit-transition-end="onTransitionEnd"
  @transitionend="onTransitionEnd" 
  :class="slideClass"
  :style="[transform]"
  >
    <slot></slot>
  </div>
</template>

<script>
import sliderCoverflowItem from './effect/sliderCoverflow/sliderCoverflowItem.js'
export default {
  props: ['index', 'pageLength'],
  name: 'slideritem',
  data () {
    return {
      slideClass: {
        'slider-item': true,
        'slider-active': false,
        'slider-copy': false,
        'slider-active-copy': false
      },
      data: {
        start: {},
        end: {},
        index: this.index ? this.index : this.$vnode.key,
        $el: ''
      }
    }
  },
  computed: {
    transform () {
      let options = this.$parent.$parent.options
      let data = this.$parent.$parent.data
      let config = this.$parent.$parent.config
      if (!options || !data || !config || !this.data.$el) {
        return {}
      }
      if (options.effect === 'coverflow') {
        return sliderCoverflowItem.methods.transform.call(this)
      }
    }
  },
  mounted () {
    this.data.$el = this.$el
    if (this.$vnode.isCloned) {
      this.slideClass['slider-copy'] = true
    } else {
      this.renderDom()
    }
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
      if (this.$parent) {
        this.$parent.renderDom(this.$el)
      }
    },
    addActive () {
      this.slideClass['slider-active'] = true
    },
    addCopyActive () {
      this.slideClass['slider-active-copy'] = true
    },
    removeCopyActive () {
      this.slideClass['slider-active-copy'] = false
    },
    removeActive () {
      this.slideClass['slider-active'] = false
    },
    onTransitionEnd (e) {
      if (this.$parent) {
        this.$parent.onItemTransitionEnd(e)
      }
    }
  }
}
</script>