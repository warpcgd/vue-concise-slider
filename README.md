##vue-slider.js
####vue的slider滑动组件
* * *

vue-slider,一个简单的滑动组件,配置简单,支持自适应/全屏+按钮+分页,同时兼容移动端和PC端

###未来将实现
- [ ] 定时自动切换
- [ ] 垂直滚动
- [ ] 无缝滚动
- [ ] 渐变滚动
- [ ] 视差效果

###例子

<!-- [基本例子](http://warpcgd.github.io/webchataudio/src/demo.html) -->

###快速开始使用

通过以下demo来实现

###app.vue父级组件

```html
<template>
  <slider :pages="someList" :sliderinit="sliderinit">
    <!-- slot  -->
  </slider>
</template>

<script>
import slider from './slider'// 引入slider组件
export default {
   el: '#app',
   data () {
      return {
        //图片列表[arr]
        someList:[
          {
            title: '',
            style:{
             background:'url(src/img/testimg-1.jpg)'
            }
          },
          {
           title: '',
           style:{
            background:'url(src/img/testimg-2.jpg)'
            }
          },
          {
            title: 'slide3',
            style:{
              background:'#4bbfc3',
            },
          }
        ],
        //滑动配置[obj]
        sliderinit: {
          currentPage: 0,
          start: {},
          end: {},
          tracking: false,
          thresholdTime: 500,//滑动判定距离
          hresholdDistance: 100,//滑动判定时间
        }
      }
    },
    components: {
        slider
    }
}
</script>

```
###sliderinit/初始化参数
<table width="100%">
<thead>
  <tr>
    <th width="20%">Option</th>
    <th width="20%">Type</th>
    <th width="20%">Default</th>
    <th width="40%">Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>currentPage</code></td>
    <td>num</td>
    <td>-</td>
    <td>当前为第几页</td>
  </tr>
  <tr>
    <td><code>thresholdTime</code></td>
    <td>num</td>
    <td>-</td>
    <td>滑动距离阈值</td>
  </tr>
  <tr>
    <td><code>hresholdDistance</code></td>
    <td>num</td>
    <td>-</td>
    <td>滑动时间阈值</td>
  </tr>
 </tbody>
</table>
###API/父级传递的事件
<table width="100%" align="center">
<thead>
  <tr>
    <th align="center" width="12.5%">Method</th>
    <th align="center" width="12.5%">Parameters</th>
    <th align="center" width="35%">Description</th>
    <th align="center" width="40%">Example</th>
  </tr>
</thead>
<tbody>
  <tr align="center">
    <td><code>slideTo</code></td>
    <td>(num)</td>
    <td>滑动到(num)页</td>
    <td><code>this.$broadcast('slideTo', num)</code></td>
  </tr>
 <tr align="center">
    <td><code>slideNext</code></td>
    <td>-</td>
    <td>滑动到下一页</td>
    <td><code>this.$broadcast('slideNext')</code></td>
  </tr>
  <tr align="center">
    <td><code>slideTo</code></td>
    <td>-</td>
    <td>滑动到上一页</td>
    <td><code>this.$broadcast('slidePre')</code></td>
  </tr>
 </tbody>
</table>
###API/父级监听的事件
<table width="100%" align="center">
<thead>
  <tr>
    <th align="center" width="12.5%">Method</th>
    <th align="center" width="12.5%">Parameters</th>
    <th align="center" width="35%">Description</th>
    <th align="center" width="40%">Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>slide</code></td>
    <td>(num)</td>
    <td>当前滑动到第(num)页</td>
    <td><code>vm.$on('slide', function(pagenum){console.log(pagenum)})</code></td>
  </tr>
 </tbody>
</table>