<template>
  <div class="slider-wrapper">
    <template v-if="pages.length">
      <template v-for="(item, index) in pages">
        <div class="slider-item" :style="[item.style, transform(index)]">
          <div v-if="!item.component" v-html="item.html"></div>
          <template v-else>
            <component :pages="pages" :item="item" :sliderinit="sliderinit" :is="item.component" ></component>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: ['sliderinit', 'pages', 'basicdata', 'temporarydata'],
  data () {
    return {}
  },
  methods: {
    transform: function (index) {
      let winWidth = this.temporarydata.pageWidth
      let height = ''
      if (this.pages[index].style.height) {
        height = this.pages[index].style.height.indexOf('px') === -1 ? this.temporarydata.pageHeight * parseFloat(this.pages[index].style.height) / 100 : parseFloat(this.pages[index].style.height)
      } else {
        height = this.temporarydata.pageHeight
      }
      let width = this.pages[index].style.width.indexOf('px') === -1 ? this.temporarydata.pageWidth * parseFloat(this.pages[index].style.width) / 100 : parseFloat(this.pages[index].style.width)
      let offsetWidth = winWidth / 2 - width / 2
      let leftWidth = offsetWidth - this.temporarydata.deviation + 'px'
      let rightWidth = offsetWidth + this.temporarydata.deviation + width * (1 - this.temporarydata.widthScalingRatio) + 'px'
      let centerWidth = offsetWidth + 'px'
      let style = {}
      // 基本
      if (index === this.basicdata.currentPage - 1 || (index === this.pages.length - 2 && this.basicdata.currentPage === -1)) {
        style['left'] = leftWidth
        style['width'] = width * this.temporarydata.widthScalingRatio + 'px'
        style['height'] = height * this.temporarydata.heightScalingRatio + 'px'
        style['opacity'] = '1'
        if (this.basicdata.direction === 'left') {
          style['z-index'] = '10'
        } else {
          style['z-index'] = '1'
        }
      } else if (index === this.basicdata.currentPage + 1 || (index === 1 && this.basicdata.currentPage === this.pages.length)) {
        style['left'] = rightWidth
        style['width'] = width * this.temporarydata.widthScalingRatio + 'px'
        style['height'] = height * this.temporarydata.heightScalingRatio + 'px'
        style['opacity'] = '1'
        if (this.basicdata.direction === 'left') {
          style['z-index'] = '1'
        } else {
          style['z-index'] = '10'
        }
      } else if (index === this.basicdata.currentPage) {
        style['left'] = centerWidth
        style['z-index'] = '99'
        style['opacity'] = '1'
      } else {
        style['left'] = centerWidth
        style['opacity'] = '0'
      }
      // 循环拓展
      if (index === this.pages.length - 1 && this.basicdata.currentPage === 0) {
        style['left'] = leftWidth
        style['width'] = width * this.temporarydata.widthScalingRatio + 'px'
        style['height'] = height * this.temporarydata.heightScalingRatio + 'px'
        style['opacity'] = '1'
      }
      if (index === 0 && this.basicdata.currentPage === this.pages.length - 1) {
        style['left'] = rightWidth
        style['width'] = width * this.temporarydata.widthScalingRatio + 'px'
        style['height'] = height * this.temporarydata.heightScalingRatio + 'px'
        style['opacity'] = '1'
      }
      // 切换优化
      if (((index === this.pages.length - 1 || index === this.pages.length - 2) && this.basicdata.currentPage === -1) || ((index === 0 || index === 1) && this.basicdata.currentPage === this.pages.length)) {
        style['opacity'] = '1'
        if (index === 0) {
          style['z-index'] = '99'
        }
        if (index === this.pages.length - 1) {
          style['z-index'] = '99'
        }
      }
      style[this.temporarydata.prefixes.transition + 'Duration'] = (this.temporarydata.animation ? this.sliderinit.duration || 300 : 0) + 'ms'
      style['position'] = 'absolute'
      return style
    }
  }
}
</script>