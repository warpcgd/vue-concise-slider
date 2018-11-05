## pages

- Type: `Array`
- Default value: `null`
Array of slider list,supporting configure DOM,and style CSS
```html
 [
    {
      html: '',
      style:{
       background:'url(src/img/testimg-1.jpg)'
      }
    },
    {
     html: '',
     style:{
      background:'url(src/img/testimg-2.jpg)'
      }
    },
    {
      html: 'slide3',
      style:{
        background:'#4bbfc3',
      }
    }
 ]
```

### html

- Type: `String`
- Default value: `null`
The value is mounted on the label [v-html](https://vuejs.org/v2/api/#v-html),outputting real HTML
```html
  {
    html: '<div>test</div>'
  }
```

### style

- Type: `object`
- Default value: `null`

The style pattern that works directly on each item can output background maps, background colors, each width can be customized, and automatically switch to indefinite width scrolling

```html
  {
  style:{
    background:'#4bbfc3'
   }
  }
```

### component

- Type: `object`
- Default value: `null`

For the extension of each page page, you can customize the component template , and use props in the component

* item : per pages
* options: slider configuration
* pages: array of slider list

```html
  {
    component: {
      props: ['item', 'options', 'pages'],
      data () {
        return {
          img: 'src/img/testimg-1.jpg'
        }
      },
      mounted () {
        console.log(this.item)
      },
      template: '<div><img style="width: 100%" :src="img" /><p style="position: absolute; margin: 0; right: 10px; bottom: 10px; font-size: 16px;">test1</p></div>'
    }
  }
```

## options

- Type: `Object`
- Default value: `null`

Slider configuration

```html
  {
    currentPage: 0,
    thresholdDistance: 500,
    thresholdTime: 100,
    autoplay:1000,
    loop:true,
    direction:'vertical',
    loopedSlides:1,
    slidesToScroll:1
  }
```
### effect

- Type: `string`
- Default value: `slide`

Switching effect,it Could be 'slide','fade','coverflow'

```html
  {
    effect:'slide'
  }
```

### direction

- Type: `string`
- Default value: `horizontal`

Direction setting,it Could be 'horizontal' or 'vertical' (for vertical slider)

```html
  {
    direction:'horizontal'
  }
```

### currentPage

- Type: `number`
- Default value: `0`

Initing current Page of slider

```html
  {
    currentPage:0
  }
```

### thresholdDistance

- Type: `number`
- Default value: `100`

Minimal distance (in px) to trigger swipe to next/previous slide during swipes

```html
  {
    thresholdDistance:'100'
  }
```

### thresholdTime

- Type: `number`
- Default value: `500`

Minimal speed (in ms) to trigger swipe to next/previous slide during swipes

```html
  {
    thresholdTime:'500'
  }
```

### autoplay

- Type: `number`
- Default value: `number[ms]`

delay between transitions (in ms).

```html
  {
    autoplay:'1000'
  }
```

### loop

- Type: `boolean`
- Default value: `false`

Set to true to enable continuous loop mode

```html
  {
    loop:false
  }
```

### loopedSlides

- Type: `number`
- Default value: `1`

like carousel, works with multiple slides

```html
  {
    loopedSlides:1
  }
```
### slidesToScroll

- Type: `number`
- Default value: `1`

slides scrolled at once

```html
  {
    slidesToScroll:1
  }
```
### preventDocumentMove

- Type: `boolean`
- Default value: `false`

When the touch event is triggered, the entire page scrolls

```html
  {
    preventDocumentMove:true
  }
```

### speed

- Type: `number[ms]`
- Default value: `300`

Sliding speed[ms]

```html
  {
    speed: 300
  }
```

### timingFunction

- Type: `string`
- Default value: `ease`

Sliding mode

```html
  {
    timingFunction: 'ease'
  }
```

### widthScalingRatio

- Type: `string`
- Default value: `0.8`

Coverflow mode configuration width scale scaling, range 0~1

```html
  {
    widthScalingRatio: '0.8'
  }
```
### heightScalingRatio

- Type: `string`
- Default value: `0.8`

Coverflow mode configuration hight scale scaling, range 0~1

```html
  {
    heightScalingRatio: '0.8'
  }
```
### deviation

- Type: `string`
- Default value: `200`

Configuration of sliding item offset in coverflow mode

```html
  {
    deviation: '200'
  }
```
### pagination

- Type: `boolean`
- Default: `true`

Whether paging is displayed in all modes

```html
  {
    pagination: true
  }
```
### renderPagination

- Type: `function`
- Default: `null`
- Parameter: `createElement, index`

Custom paging function, the parameter is VUE's createElement function, and the current page number index

```html
  {
    renderPagination: (h, index) => {
      return h('div', {
        class: 'swiper-pagination-bullet'
      }, [index])
    }
  }
```

### centeredSlides

- Type：`boolean`
- Default：`false`

Whether to slide in the middle

```html
  {
    centeredSlides: true
  }
```

### itemAnimation

- Type：`boolean`
- Default：`false`

Use itemAnimation in infinite scrolling to ensure that the last one to the first (first to last) effect ends before you can continue to slide

```html
  {
    itemAnimation: true
  }
```

### nested

- Type：`boolean`
- Default：`true`

When nesting the same direction of the swiper, when the child swiper is switched, the parent swiper will switch.

```html
  {
    nested: false
  }
```

## Transitive events


### slideTo

- parameter: `number`

Sliding to (number) page

```html
  slideTo () {
    this.$refs.slider.$emit('slideTo', num)
  }

```
### slideNext

- parameter: `null`

Sliding to the next page

```html
  slideNext () {
    this.$refs.slider.$emit('slideNext')
  }

```

### slidePre

- parameter: `null`

Sliding to the previous page

```html
  slide () {
    this.$refs.slider.$emit('slidePre')
  }

```

### autoplayStart

- parameter: `ms`

Opening timing carousel,Setting the carousel time

```html
  this.$refs.slider.$emit('autoplayStart',1000)
```

### autoplayStop

- parameter: ``

Pause timing carousel

```html
  this.$refs.slider.$emit('autoplayStop')
```

## Monitoring events

### slide

- parameter: `obj`

The current sliding to page number, the parameter is slider basic information

```html
  slide (data) {
    console.log(data)
  }
```

### tap

- parameter: `obj`

tapped on page , and the parameters are slider basic information

```html
  tap (data) {
    console.log(data)
  }
```

### init

- parameter: `obj`

initted slider , and the parameters are slider basic information

```html
  init (data) {
    console.log(data)
  }
```


<script v-pre type="text/x-template" id="config">
  <template>
      <slider :pages="pages" :options="options">
      <!-- slot  -->
      </slider>
  </template>

  <script>
    // import slider from 'vue-concise-slider'
    import slider from 'module.js'
    // export default
    module.exports = {
         components: {
              slider
         },
         data () {
            return {
              //image list
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
              //Sliding configuration
              options: {
                currentPage: 0,
                thresholdDistance: 100,
                thresholdTime: 300,
                loop:true,
                loopedSlides:1,
                slidesToScroll:1,
                direction:'horizontal',
                autoplay:0
              }
            }
         }
    }
  </script>
</script>