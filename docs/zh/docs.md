---
sidebar: auto
---

# options

## 基础信息

- 类型：`Object`
- 默认值：`null`

滑动配置

```js
  {
    currentPage: 0,//当前页码
    thresholdDistance: 500,//滑动判定距离
    thresholdTime: 100,//滑动判定时间
    autoplay:1000,//自动滚动[ms]
    loop:true,//循环滚动
    direction:'vertical',//方向设置，垂直滚动
    loopedSlides:1,//无限滚动前后遍历数
    slidesToScroll:1,//每次滑动项数
  }
```

### effect

- 类型：`string`
- 默认值：`slide`

切换效果，默认为滚动滑动('slide'),可设置为渐变滑动('fade'),旋转滚动('coverflow')

```html
  {
    effect:'slide'
  }
```

### direction

- 类型：`string`
- 默认值：`horizontal`

方向设置，默认为水平滚动('horizontal'),可设置为垂直滚动('vertical')

```html
  {
    direction:'horizontal'
  }
```

### currentPage

- 类型：`number`
- 默认值：`0`

初始化slider时为第几页

```html
  {
    currentPage:0
  }
```

### thresholdDistance

- 类型：`number`
- 默认值：`100`

触发滑动的距离阈值

```html
  {
    thresholdDistance:'100'
  }
```

### thresholdTime

- 类型：`number`
- 默认值：`500`

触发滑动的时间阈值

```html
  {
    thresholdTime:'500'
  }
```

### autoplay

- 类型：`number`
- 默认值：`number[ms]`

自动播放的时间

```html
  {
    autoplay:'1000'
  }
```

### loop

- 类型：`boolean`
- 默认值：`false`

是否循环滚动

```html
  {
    loop:false
  }
```

### loopedSlides

- 类型：`number`
- 默认值：`1`

loop设置为true时,设置前后复制页面的数量

```html
  {
    loopedSlides:1
  }
```
### slidesToScroll

- 类型：`number`
- 默认值：`1`

每次滑动切换的页数

```html
  {
    slidesToScroll:1
  }
```
### preventDocumentMove

- 类型：`boolean`
- 默认值：`false`

阻止touch事件触发时，整个页面的滚动

```html
  {
    preventDocumentMove:true
  }
```

### speed

- 类型：`number[ms]`
- 默认值：`300`

滑动持续时间[ms]

```html
  {
    speed: 300
  }
```

### timingFunction

- 类型：`string`
- 默认值：`ease`

滑动方式

```html
  {
    timingFunction: 'ease'
  }
```

### pagination

- 类型：`boolean`
- 默认值：`true`

所有模式下分页是否显示

```html
  {
    pagination: true
  }
```
### renderPagination

- 类型：`function`
- 默认值：`null`
- 参数：`createElement, index`

自定义分页函数，参数为vue的createElement函数，和当前页码index

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

- 类型：`boolean`
- 默认值：`false`

是否居中滑动

```html
  {
    centeredSlides: true
  }
```

### itemAnimation

- 类型：`boolean`
- 默认值：`false`

在无限滚动中使用itemAnimation，保证最后一个到第一个（第一个到最后一个）特效结束后才能继续滑动

```html
  {
    itemAnimation: true
  }
```
### freeze

- 类型：`boolean`
- 默认值：`false`

阻止touch滑动

```js
  {
    freeze: false
  }
```
### preventRebound

- 类型：`boolean`
- 默认值：`false`

阻止回弹

```js
  {
    preventRebound: false
  }
```

## CoverFlow options

### widthScalingRatio

- 类型：`string`
- 默认值：`0.8`

coverflow模式下配置宽度比例缩放,范围0~1

```html
  {
    widthScalingRatio: '0.8'
  }
```
### heightScalingRatio

- 类型：`string`
- 默认值：`0.8`

coverflow模式下配置高度比例缩放,范围0~1

```html
  {
    heightScalingRatio: '0.8'
  }
```
### deviation

- 类型：`string`
- 默认值：`200`

coverflow模式下配置滑动项偏移

```html
  {
    deviation: '200'
  }
```

## 嵌套配置

### nested

- 类型：`boolean`
- 默认值：`true`

用于嵌套相同方向的swiper时，当子swiper切换完的时候，开启父swiper的切换

```html
  {
    nested: false
  }
```

## 传递的事件

### slideTo

- 参数：`number`

滑动到(number)页

```html
  slideTo () {
    this.$refs.slider.$emit('slideTo', num)
  }

```
### slideNext

- 参数：`null`

滑动到下一页

```html
  slideNext () {
    this.$refs.slider.$emit('slideNext')
  }

```

### slidePre

- 参数：`null`

滑动到上一页

```html
  slide () {
    this.$refs.slider.$emit('slidePre')
  }

```

### autoplayStart

- 参数：`ms`

开启定时轮播,设置轮播时长

```html
  this.$refs.slider.$emit('autoplayStart',1000)
```

### autoplayStop

- 参数：``

暂停定时轮播

```html
  this.$refs.slider.$emit('autoplayStop')
```
## 监听的事件

### slide

- 参数：`obj`

当前滑动到第几页,参数为slider基础信息

```html
  slide (data) {
    console.log(data)
  }
```

### tap

- 参数：`obj`

当前点击第几页,参数为slider基础信息

```html
  tap (data) {
    console.log(data)
  }
```

### init

- 参数：`obj`

初始化成功事件,参数为slider基础信息

```html
  init (data) {
    console.log(data)
  }
```