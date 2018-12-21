<template>
  <div class="demo fullpage">
    <section class="header">
      <div class="demo_content"> 
        <header class="demo_header">
          <Content slot-key="name"/>
        </header> 
      </div>
    </section>
    <div class="demo_content demoItem">
      <Content slot-key="content"/>
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
a {
  color: rgb(42, 46, 45);
}
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
body {
  -webkit-font-smoothing: antialiased;
  color: #34495e;
  font-size: 16px;
  letter-spacing: 0;
  margin: 0;
  overflow-x: hidden;
}
.content:not(.custom) {
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  margin-top: -3.6rem;
  margin-bottom: -2.75rem;
}
.demo {
  height: 100%;
  // overflow: hidden;
  .header {
    background: linear-gradient(to left bottom, hsl(189, 100%, 85%) 0%,hsl(111, 100%, 85%) 100%);
  }
  &_header {
    padding: 1.5rem 0;
    font-size: 2.75rem;
    font-weight: 300;
    p {
      margin: 0!important;
      padding: 0;
      font-weight: 300;
      margin: 0;
      line-height: 1.5;
      font-size: 2.75rem;
    }
  }
  &_content {
    margin: 0 auto;
    // width: 1000px;
    max-width: 62.5rem;
  }
  .demoItem {
    padding-top: 20px;
  }
}
.splite_line {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}
</style>


