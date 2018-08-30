<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'slideritem',
  data () {
    return {
      slideClass: 'slider-item'
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
    }
  }
}
</script>