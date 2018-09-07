<template>
</template>
<script>
export default { // eslint-disable-line
  render: function (createElement) {
    let index = this.index
    let render = this.sliderinit.renderPagination
    return render.call(this, createElement, index)
  },
  name: 'renderpagination',
  props: {
    index: {
      type: Number,
      required: true
    },
    sliderinit: {
      type: Object,
      required: true
    }
  }
}
</script>
