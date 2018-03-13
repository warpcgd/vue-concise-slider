<template>
  <div class="slider-wrapper">
    <template v-if="pages.length">
     <template v-if="sliderinit.infinite" v-for="(item, index) in pages" >
      <template v-if="index+sliderinit.infinite-pages.length>=0">
        <div class="slider-item" :style="item.style">
          <template v-if="item.component">
            <component :pages="pages" :item="item" :sliderinit="sliderinit" :is="item.component" ></component>
          </template>
          <div v-else  v-html="item.html"></div>
        </div>
      </template>
     </template>
     <template v-if="!sliderinit.infinite">
      <div class="slider-item" :style="pages[pages.length-1].style">
        <template v-if="pages[pages.length-1].component">
          <component :pages="pages" :item="pages[pages.length-1]" :sliderinit="sliderinit" :is="pages[pages.length-1].component"></component>
        </template>
        <div v-else v-html="pages[pages.length-1].html"></div>
      </div>
     </template>
     <template v-for="item in pages">
      <div class="slider-item" :style="item.style">
        <template v-if="item.component">
          <component :pages="pages" :item="item" :sliderinit="sliderinit" :is="item.component"></component>
        </template>
        <div v-else  v-html="item.html"></div>
      </div>
     </template>
     <template v-if="sliderinit.infinite" v-for="(item, index) in pages" >
       <template v-if="index-sliderinit.infinite<0">
        <div class="slider-item" :style="item.style">
          <template v-if="item.component">
            <component :pages="pages" :item="item" :sliderinit="sliderinit" :is="item.component"></component>
          </template>
          <div v-else  v-html="item.html"></div>
        </div>
       </template>
     </template>
     <template v-if="!sliderinit.infinite">
      <div class="slider-item" :style="pages[0].style">
        <template v-if="pages[0].component">
          <component :pages="pages" :item="pages[0]" :sliderinit="sliderinit" :is="pages[0].component"></component>
        </template>
        <div v-else v-html="pages[0].html"></div>
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