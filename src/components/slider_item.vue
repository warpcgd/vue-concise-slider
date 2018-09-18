<template>
  <div 
  @webkit-transition-end="onTransitionEnd"
  @transitionend="onTransitionEnd" 
  :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>