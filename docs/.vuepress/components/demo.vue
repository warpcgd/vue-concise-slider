<template>
  <div class="demo">
    <header class="demo__header">Demos</header>    
    <div class="demo__content">
      <div class="demo__basic">
        <div class="demo__basic--title">Basic demos:</div>
        <div class="splite__line"></div>
        <div class="demo__basic--wrap">
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
          <router-link to="/demos/foo">
            <div class="demo__basic--item">Basic</div>
          </router-link>
        </div>
      </div>
      <div class="demo__plugins">
        <div class="demo__plugins--title">plugins demos:</div>
        <div class="splite__line"></div>
        <div class="demo__plugins--wrap">
          <router-link to="/demos/plugins">
            <div class="demo__basic--item">plugins</div>
          </router-link>
          <router-link to="/demos/plugins">
            <div class="demo__plugins--item">plugins</div>
          </router-link>
          <router-link to="/demos/plugins">
            <div class="demo__plugins--item">plugins</div>
          </router-link>
          <router-link to="/demos/plugins">
            <div class="demo__plugins--item">plugins</div>
          </router-link>
        </div>
      </div>
      <div class="demo__libary">
        <div class="demo__libary--title">libary demos:</div>
        <div class="splite__line"></div>
          <router-link to="/demos/libary">
            <div class="demo__libary--item">libary</div>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss">
a {
  color: rgb(42, 46, 45);
}
.demo {
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  overflow: hidden;
  &__header {
    padding-left: 420px;
    height: 100px;
    line-height: 100px;
    font-size: 32px;
    font-weight: bold;
    background: linear-gradient(to left bottom, hsl(189, 100%, 85%) 0%,hsl(111, 100%, 85%) 100%);
  }
  &__content {
    margin: 0 auto;
    width: 1000px;
  }
  &__basic {
    margin-top: 20px;
    &--title {
      font-size: 24px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;
    }
    &--wrap{
      display: flex;;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
    &--item{
      margin: 20px 20px 20px 0;
      padding: 10px 0 0 10px;
      width: 190px;
      height: 70px;
      cursor: pointer;
      background: #eaeaea;
    }
    &--item:hover {
      color: #fff;
      background-color: #1ccacd;
      transition: color 200ms linear,background-color 500ms ease;
    }
  }
  &__plugins {
    margin-top: 20px;
    &--title {
      font-size: 24px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;
    }
    &--wrap{
      display: flex;;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
    &--item{
      margin: 20px 20px 20px 0;
      padding: 10px 0 0 10px;
      width: 190px;
      height: 70px;
      cursor: pointer;
      background: #eaeaea;
    }
    &--item:hover {
      color: #fff;
      background-color: #1ccacd;
      transition: color 200ms linear,background-color 500ms ease;
    }
  }
  &__libary {
    margin-top: 20px;
    &--title {
      font-size: 24px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;
    }
    &--wrap{
      display: flex;;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
    &--item{
      margin: 20px 20px 20px 0;
      padding: 10px 0 0 10px;
      width: 190px;
      height: 70px;
      cursor: pointer;
      background: #eaeaea;
    }
    &--item:hover {
      color: #fff;
      background-color: #1ccacd;
      transition: color 200ms linear,background-color 500ms ease;
    }
  }
}
.splite__line {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}
</style>


