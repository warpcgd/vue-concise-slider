<template>
  <div class="fullpage">
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
        <p><effect-sliderHome></effect-sliderHome></p>
      </div>
    </section>
    <section>
      <div class="row">
        <h3>Features</h3>
        <div class="features">
          <div class="feature"><h2>Simple configuration</h2> <p>A structure centered around the vue component that helps you achieve sliding with minimal configuration.</p></div>
          <div class="feature"><h2>Lightweight volume</h2> <p>Load on demand, only 30k in size, to help you load quickly on your computer and mobile phone.</p></div>
          <div class="feature"><h2>Multiple sliding styles</h2> <p>More than ten sliding effects to meet all your product manager needs</p></div>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <h3>Easy Start</h3>
        <Content slot-key="startDemo"/>
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
<style scoped>
  body {
    -webkit-font-smoothing: antialiased;
    color: #34495e;
    font-size: 16px;
    letter-spacing: 0;
    margin: 0;
    overflow-x: hidden;
  }
  .fullpage {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    margin: 0!important;
    padding: 0;
    top: 3.6rem;
  }
  .content:not(.custom) {
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
  }
  /* .navbar {
    display: none
  }
  */
  .custom-layout {
    padding-top: 0;
  }
  section.cover {
      -ms-flex-align: center;
      align-items: center;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      height: 50vh;
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
  section .features {
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }
  .features .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
  }
  .features .feature h2 {
    font-size: 1.5rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
  }
</style>

