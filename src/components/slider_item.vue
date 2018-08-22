<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'slider-item',
  data () {
    return {
      slideClass: 'slider-item'
    }
  },
  ready () {
    this.renderDom()
  },
  mounted () {
    this.renderDom()
  },
  methods: {
    renderDom () {
      if (this.$parent) {
        this.$parent.renderDom()
      }
    }
  }
}
</script>