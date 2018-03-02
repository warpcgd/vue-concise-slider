English | [中文](README.md)

[![npm](https://img.shields.io/npm/v/vue-concise-slider.svg)](https://www.npmjs.com/package/vue-concise-slider)
[![npm](https://img.shields.io/npm/dw/vue-concise-slider.svg)](https://www.npmjs.com/package/vue-concise-slider)
[![npm](https://img.shields.io/github/size/warpcgd/vue-concise-slider/dist/module.js.svg)](https://www.npmjs.com/package/vue-concise-slider)

## vue-concise-slider
![](vue-slider-github.jpg)
* * *

vue-concise-slider,A simple sliding component,has easy configuration,supported self-adaption / fullscreen / button / page,and is compatible with mobile and PC terminal

### version
[v2.4.7](https://github.com/warpcgd/vue-concise-slider/issues/29)  Supported vue2.0+

### Features

* Simple configuration
* Simple and lightweight (~24kB gzipped)
* Multiple sliding effects

### Achieved
- [x] Self-adaption Fullscreen
- [x] Compatible with mobile and PC terminal
- [x] Vertical Slides
- [x] Autoplay Slides
- [x] Auto Slides Per View / Carousel Mode
- [x] Loop Mode / Infinite Loop
- [x] Loop Mode / multiple slide
- [x] Fade Effect
- [x] CoverFlow Effect
- [x] Add custom components in page

### To Do List
- [ ] Parallax

### Links

- [Documentation](https://warpcgd.github.io/vue-concise-slider/)
- [demo](https://warpcgd.github.io/vue-concise-slider/demo/)

### Installation

```html
  npm install vue-concise-slider --save
```

### How to use it

```html
<template>
<!-- Make a frame wrapped slider -->
 <div style="width:70%;margin:20px auto;height:400px">
      <!-- Configuring slider components -->
      <slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
          <!-- Set loading -->
          <div slot="loading">loading...</div>
      </slider>
 </div>
</template>
<script>
import slider from 'vue-concise-slider'// import slider components
export default {
   el: '#app',
   data () {
      return {
        //Image list
        pages:[
          {
          html: '<div class="slider1">slider1</div>',
          style: {
            'background': '#1bbc9b'
            }
          },
          {
            html: '<div class="slider2">slider2</div>',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: '<div class="slider3">slider3</div>',
            style: {
              'background': '#7baabe'
            }
          }
        ],
        //Sliding configuration [obj]
        sliderinit: {
          currentPage: 0,
          thresholdDistance: 500,
          thresholdTime: 100,
          autoplay:1000,
          loop:true,
          direction:'vertical',
          infinite:1,
          slidesToScroll:1,
          timingFunction: 'ease',
          duration: 300
        }
      }
    },
    components: {
        slider
    },
    methods: {
      // Listener event
      slide (data) {
        console.log(data)
      },
      onTap (data) {
        console.log(data)
      },
      onInit (data) {
        console.log(data)
      }
    }
}
</script>
```
## Browser Support

Modern browsers and Internet Explorer 10+.


## Contributing

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

### Have a better idea？
Welcome to leave your opinion:https://github.com/warpcgd/vue-concise-slider/issues/1

### BUG？oh no!
You can be submitted here, and i will be dealt with as soon as possible:https://github.com/warpcgd/vue-concise-slider/issues/2
