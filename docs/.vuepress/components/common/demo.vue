<template>
  <div class="demo fullpage">
    <section class="header">
      <div class="demo_content"> 
        <header class="demo_header">Demos</header> 
      </div>
    </section>
    <div class="demo_content">
      <div class="demo_basic">
        <div class="demo_basic_title">Basic demos:</div>
        <div class="splite_line"></div>
        <div class="demo_basic_wrap">
          <router-link to="/demos/Basic.html">
            <div class="demo_basic_item">Basic</div>
          </router-link>
          <router-link to="/demos/Center.html">
            <div class="demo_basic_item">Center</div>
          </router-link>
          <router-link to="/demos/CoverFlow.html">
            <div class="demo_basic_item">CoverFlow</div>
          </router-link>
          <router-link to="/demos/Fade.html">
            <div class="demo_basic_item">Fade</div>
          </router-link>
          <router-link to="/demos/Loop.html">
            <div class="demo_basic_item">Loop</div>
          </router-link>
          <router-link to="/demos/Multiple.html">
            <div class="demo_basic_item">Multiple</div>
          </router-link>
          <router-link to="/demos/Nest.html">
            <div class="demo_basic_item">Nest</div>
          </router-link>
          <router-link to="/demos/RenderPagination.html">
            <div class="demo_basic_item">RenderPagination</div>
          </router-link>
          <router-link to="/demos/VariableWidth.html">
            <div class="demo_basic_item">VariableWidth</div>
          </router-link>
          <router-link to="/demos/Vertical.html">
            <div class="demo_basic_item">Vertical</div>
          </router-link>
        </div>
      </div>
      <!-- <div class="demo_plugins">
        <div class="demo_plugins_title">plugins demos:</div>
        <div class="splite_line"></div>
        <div class="demo_plugins_wrap">
          <router-link to="/demos/plugins">
            <div class="demo_basic_item">plugins</div>
          </router-link>
          <router-link to="/demos/plugins">
            <div class="demo_plugins_item">plugins</div>
          </router-link>
          <router-link to="/demos/plugins">
            <div class="demo_plugins_item">plugins</div>
          </router-link>
          <router-link to="/demos/plugins">
            <div class="demo_plugins_item">plugins</div>
          </router-link>
        </div>
      </div>
      <div class="demo_libary">
        <div class="demo_libary_title">libary demos:</div>
        <div class="splite_line"></div>
          <router-link to="/demos/libary">
            <div class="demo_libary_item">libary</div>
          </router-link>
      </div> -->
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
<style lang="scss" scoped>
.fullpage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0!important;
  padding: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 3.6rem;
}
.demo {
  height: 100%;
  // overflow: hidden;
  a {
    color: #2c3e50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  .header {
    background: linear-gradient(to left bottom, hsl(189, 100%, 85%) 0%,hsl(111, 100%, 85%) 100%);
  }
  &_header {
    padding: 1.5rem 0;
    font-size: 2.75rem;
    font-weight: 300;
    line-height: 1.7;
  }
  &_content {
    margin: 0 auto;
    // width: 1000px;
    max-width: 62.5rem;
  }
  &_basic {
    margin-top: 20px;
    &_title {
      font-size: 24px;
      font-weight: 400;
      height: 80px;
      line-height: 80px;
    }
    &_wrap{
      display: flex;;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
    &_item{
      padding: 1rem;
      margin: 20px 20px 0 0;
      width: 190px;
      height: 70px;
      // cursor: pointer;
      background: #eaeaea;
      font-size: 1.2rem;
      font-weight: 400;
      text-decoration: none;
    }
    &_item:hover {
      color: #fff;
      background-color:rgb(74, 191, 138);
      transition: color 200ms linear,background-color 500ms ease;
      text-decoration: none;
    }
  }
  &_plugins {
    margin-top: 20px;
    &_title {
      font-size: 24px;
      font-weight: 400;
      height: 80px;
      line-height: 80px;
    }
    &_wrap{
      display: flex;;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
    &_item{
      padding: 1rem;
      margin: 20px 20px 0 0;
      width: 190px;
      height: 70px;
      cursor: pointer;
      background: #eaeaea;
      font-size: 1.2rem;
      font-weight: 400;
    }
    &_item:hover {
      color: #fff;
      background-color:rgb(74, 191, 138);
      transition: color 200ms linear,background-color 500ms ease;
    }
  }
  &_libary {
    margin-top: 20px;
    &_title {
      font-size: 24px;
      font-weight: 400;
      height: 80px;
      line-height: 80px;
    }
    &_wrap{
      display: flex;;
      justify-content: flex-start;
      flex-flow: row wrap;
    }
    &_item{
      padding: 1rem;
      margin: 20px 20px 0 0;
      width: 190px;
      height: 70px;
      cursor: pointer;
      background: #eaeaea;
      font-size: 1.2rem;
      font-weight: 400;
    }
    &_item:hover {
      color: #fff;
      background-color:rgb(74, 191, 138);
      transition: color 200ms linear,background-color 500ms ease;
    }
  }
}
.splite_line {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}
</style>


