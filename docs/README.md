## vue-concise-slider

> A simple sliding component

## What is it

vue-concise-slider,A simple sliding component,has easy configuration,supported self-adaption / fullscreen / page,and is compatible with mobile and PC terminal

See the [Quick start](#Quick start) for more details

## Features

* Simple configuration
* Simple and lightweight (~23kB gzipped)
* Multiple sliding effects

## Install

```html
  npm install vue-concise-slider --save
```

## start

<vuep template="#example"></vuep>


## Have a better idea？
Welcome to leave your opinion:https://github.com/warpcgd/vue-concise-slider/issues/1

## BUG？oh no!
You can be submitted here, and i will be dealt with as soon as possible:https://github.com/warpcgd/vue-concise-slider/issues/2



<script v-pre type="text/x-template" id="example">
  <template>
    <slider ref="slider" :pages="pages" :sliderinit="sliderinit">
    <!-- slot  -->
    </slider>
  </template>

  <script>
    import slider from 'module.js'// import slider
    module.exports = {
         components: {
              slider
         },
         data () {
            return {
              //Image list[arr]
              pages:[
                {
                  html: 'slide1',
                  style:{
                   'background': '#1bbc9b'
                  }
                },
                {
                 html: 'slide2',
                 style:{
                    background:'#4bbfc3'
                  }
                },
                {
                  html: 'slide3',
                  style:{
                    background:'#333'
                  },
                }
              ],
              // Sliding configuration[obj]
              sliderinit: {
                currentPage: 0,
                thresholdDistance: 100,
                thresholdTime: 300,
                loop:true,
                infinite:1,
                slidesToScroll:1
              }
            }
         }
    }
  </script>
</script>
