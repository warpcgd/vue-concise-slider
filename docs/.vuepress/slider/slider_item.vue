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
import sliderCoverflowItem from './effect/sliderCoverflow/sliderCoverflowItem.js'
export default {
  props: ['index', 'pageLength'],
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
    // console.log(options)
  },
  methods: {
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
      let config = this.$parent.config
      if (!options || !data || !config || !this.$el) {
        return {}
      }
      if (options.effect === 'coverflow') {
        return sliderCoverflowItem.methods.transform.call(this)
      }
    }
  }
}
</script>