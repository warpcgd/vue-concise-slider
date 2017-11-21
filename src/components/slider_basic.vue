<template>
  <div class="slider-wrapper">
    <template v-if="pages.length">
      <template v-for="item in pages">
    	  <div class="slider-item" :style="item.style">
    	    <div v-html="item.html"></div>
    	  </div>
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