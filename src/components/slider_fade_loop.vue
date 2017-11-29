<template>
  <div class="slider-wrapper">
    <template v-if="pages.length">
     <template v-if="sliderinit.infinite" v-for="(item, index) in pages" >
      <div v-if="index+sliderinit.infinite-pages.length>=0" class="slider-item" :style="item.style" v-html="item.html"></div>
     </template>
     <template v-if="!sliderinit.infinite">
      <div class="slider-item" :style="pages[pages.length-1].style" v-html="pages[pages.length-1].html"></div>
     </template>
     <template v-for="item in pages">
      <div class="slider-item" :style="item.style" v-html="item.html"></div>
     </template>
     <template v-if="sliderinit.infinite" v-for="(item, index) in pages" >
      <div v-if="index-sliderinit.infinite<0" class="slider-item" :style="item.style" v-html="item.html"></div>
     </template>
     <template v-if="!sliderinit.infinite">
      <div class="slider-item" :style="pages[0].style" v-html="pages[0].html"></div>
     </template>
    </template>
  </div>
</template>
<script>
export default {
  props: ['sliderinit', 'pages'],
  data () {
    return {}
  }
}
</script>