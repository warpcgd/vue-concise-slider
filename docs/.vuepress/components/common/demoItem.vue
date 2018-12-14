<template>
  <div class="demo">
    <section class="header">
      <div class="demo_content"> 
        <header class="demo_header">
          <Content slot-key="name"/>
        </header> 
      </div>
    </section>
    <div class="demo_content">
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
<style lang="scss">
a {
  color: rgb(42, 46, 45);
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
}
.demo {
  height: 100%;
  overflow: hidden;
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
}
.splite_line {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}
</style>


