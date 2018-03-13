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
    return {
    }
  },
  methods: {
    // 设置默认的
    transform: function (index) {
      let offsetWidth = '-' + this.temporarydata.pageWidth * index + 'px'
      let style = {}
      style['transform'] = 'translate3D(' + offsetWidth + ',0,0)'
      style['opacity'] = this.basicdata.currentPage === index || this.basicdata.currentPage === index + 1 ? '1' : '0'
      // style[this.temporarydata.prefixes.transition + 'TimingFunction'] = this.sliderinit.timingFunction || 'ease'
      style['transition-property'] = 'opacity'
      style[this.temporarydata.prefixes.transition + 'Duration'] = (this.temporarydata.animation ? this.sliderinit.duration || 300 : 0) + 'ms'
      return style
      // })
    }
  }
}
</script>