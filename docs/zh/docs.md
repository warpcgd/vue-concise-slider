---
sidebar: auto
---

# options

## Basic options

- Type: `Object`
- Default value: `null`

Slider configuration

```js
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

Switching effect,it Could be  `slide`, `fade`, `coverflow`, `nest`

```js
  {
    effect:'slide'
  }
```

### direction

- Type: `string`
- Default value: `horizontal`

Direction setting,it Could be `horizontal` or `vertical` (for vertical slider)

```js
  {
    direction:'horizontal'
  }
```

### currentPage

- Type: `number`
- Default value: `0`

Initing current Page of slider

```js
  {
    currentPage:0
  }
```

### thresholdDistance

- Type: `number`
- Default value: `100`

Minimal distance (in px) to trigger swipe to next/previous slide during swipes

```js
  {
    thresholdDistance:'100'
  }
```

### thresholdTime

- Type: `number`
- Default value: `500`

Minimal speed (in ms) to trigger swipe to next/previous slide during swipes

```js
  {
    thresholdTime:'500'
  }
```

### autoplay

- Type: `number`
- Default value: `number[ms]`

delay between transitions (in ms).

```js
  {
    autoplay:'1000'
  }
```

### loop

- Type: `boolean`
- Default value: `false`

Set to true to enable continuous loop mode

```js
  {
    loop:false
  }
```

### loopedSlides

- Type: `number`
- Default value: `1`

like carousel, works with multiple slides

```js
  {
    loopedSlides:1
  }
```
### slidesToScroll

- Type: `number`
- Default value: `1`

slides scrolled at once

```js
  {
    slidesToScroll:1
  }
```
### preventDocumentMove

- Type: `boolean`
- Default value: `false`

When the touch event is triggered, the entire page scrolls

```js
  {
    preventDocumentMove:true
  }
```

### speed

- Type: `number[ms]`
- Default value: `300`

Sliding speed[ms]

```js
  {
    speed: 300
  }
```

### timingFunction

- Type: `string`
- Default value: `ease`

Sliding mode

```js
  {
    timingFunction: 'ease'
  }
```

### pagination

- Type: `boolean`
- Default: `true`

Whether paging is displayed in all modes

```js
  {
    pagination: true
  }
```
### renderPagination

- Type: `function`
- Default: `null`
- Parameter: `createElement, index`

Custom paging function, the parameter is VUE's createElement function, and the current page number index

```js
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

```js
  {
    centeredSlides: true
  }
```
### itemAnimation

- Type：`boolean`
- Default：`false`

Use itemAnimation in infinite scrolling to ensure that the last one to the first (first to last) effect ends before you can continue to slide

```js
  {
    itemAnimation: true
  }
```

### freeze

- Type：`boolean`
- Default：`false`

Prevent Slider sliding

```js
  {
    freeze: false
  }
```
### preventRebound

- Type：`boolean`
- Default：`false`

Stop rebound

```js
  {
    preventRebound: false
  }
```

## CoverFlow options

### widthScalingRatio

- Type: `string`
- Default value: `0.8`

Coverflow mode configuration width scale scaling, range `0~1`

```js
  {
    widthScalingRatio: '0.8'
  }
```
### heightScalingRatio

- Type: `string`
- Default value: `0.8`

Coverflow mode configuration hight scale scaling, range `0~1`

```js
  {
    heightScalingRatio: '0.8'
  }
```
### deviation

- Type: `string`
- Default value: `200`

Configuration of sliding item offset in coverflow mode

```js
  {
    deviation: '200'
  }
```

## Nest options

### nested

- Type：`boolean`
- Default：`true`

When nesting the same direction of the swiper, when the child swiper is switched, the parent swiper will switch.

```js
  {
    nested: false
  }
```
## Transitive events


### slideTo

- parameter: `number`

Sliding to (number) page

```js
  slideTo () {
    this.$refs.slider.$emit('slideTo', num)
  }

```
### slideNext

- parameter: `null`

Sliding to the next page

```js
  slideNext () {
    this.$refs.slider.$emit('slideNext')
  }

```

### slidePre

- parameter: `null`

Sliding to the previous page

```js
  slide () {
    this.$refs.slider.$emit('slidePre')
  }

```

### autoplayStart

- parameter: `ms`

Opening timing carousel,Setting the carousel time

```js
  this.$refs.slider.$emit('autoplayStart',1000)
```

### autoplayStop

- parameter: ``

Pause timing carousel

```js
  this.$refs.slider.$emit('autoplayStop')
```

## Slider monitoring events

### slide

- parameter: `obj`

The current sliding to page number, the parameter is slider basic information

```js
  slide (data) {
    console.log(data)
  }
```
### init

- parameter: `obj`

initted slider , and the parameters are slider basic information

```js
  init (data) {
    console.log(data)
  }
```

## SliderItem monitoring events

### tap

- parameter: `obj`

tapped on page , and the parameters are slider basic information

```js
  tap (data) {
    console.log(data)
  }
```