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
        <div class="features">
          <div class="feature"><h2>简单配置</h2> <p>以vue组件为中心的结构，用最少的配置帮助你实现滑动。</p></div>
          <div class="feature"><h2>轻量体积</h2> <p>36KB的大小，帮助你在电脑和手机端快速加载。</p></div>
          <div class="feature"><h2>多种滑动样式</h2> <p>十种以上滑动特效，满足你产品经理所有需求</p></div>
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
<style>
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
  .slider-item {
    color: #FFF;
    text-align: center;
    font-style: italic;
    font-weight: 300;
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

