<template>
  <div>
    <section class="cover">
      <div class="cover-main">
        <h1>vue-concise-slider</h1>
        <blockquote>
          <p>A simple vue sliding component</p>
        </blockquote>
        <ul>
          <li>Simple and lightweight (~36kB)</li>
          <li>Multiple sliding effects</li>
          <li>Simple configuration</li>
        </ul>
      </div>
    </section>
    <section class="home-demo">
      <div class="row">
        <h3>Demo</h3>
        <p><sliderBasic></sliderBasic></p>
      </div>
    </section>
    <section>
      <div class="row">
        <h3>Features</h3>
        <p></p>
      </div>
    </section>
    <section>
      <div class="row">
        <h3>Start</h3>
        <p></p>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style>
  body {
    -webkit-font-smoothing: antialiased;
    color: #34495e;
    font-size: 16px;
    letter-spacing: 0;
    margin: 0;
    overflow-x: hidden;
  }
  /* .navbar {
    display: none
  }
  */
  .custom-layout {
    padding-top: 0
  }
  section.cover {
      -ms-flex-align: center;
      align-items: center;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      display: flex;
      background: linear-gradient(to left bottom, hsl(189, 100%, 85%) 0%,hsl(111, 100%, 85%) 100%);
  }
  section.cover .cover-main {
    -ms-flex: 1;
    flex: 1;
    margin: -20px 16px 0;
    text-align: center;
    z-index: 1;
  }
  section.cover h1 {
    color: inherit;
    font-size: 2.5rem;
    font-weight: 300;
    position: relative;
    text-align: center;
  }
  section.cover blockquote {
    font-size: 1.5rem;
    text-align: center;
    color: #34495e;
  }
  section.cover p {
    line-height: 1.5rem;
    margin: 1em 0;
  }
  section.cover ul {
    line-height: 1.8;
    list-style-type: none;
    margin: 1em auto;
    max-width: 500px;
    padding: 0;
  }
  section.home-demo {
    padding: 2rem 0;
  }
  section .row {
    margin: 0 auto;
    max-width: 62.5rem;
    width: 100%;
  }
  section h3 {
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem;
  }
  .slider-item {
    color: #FFF;
    text-align: center;
    font-style: italic;
    font-weight: 300;
  }
</style>

