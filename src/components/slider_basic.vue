<template>
  <div class="slider-wrapper">
    <template v-if="pages.length">
      <template v-for="item in pages">
    	  <div class="slider-item" :style="item.style">
    	    <div v-if="!item.component" v-html="item.html"></div>
          <template v-else>
            <component :item="item" :pages="pages" :sliderinit="sliderinit" :is="item.component" ></component>
          </template>
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