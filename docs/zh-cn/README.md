## vue-concise-slider

> 一个简单的Vue滑动组件

## 它是什么

vue-concise-slider是一个简单的Vue滑动组件,配置简单,支持自适应/全屏,按钮,分页,兼容移动端和PC端

查看 [快速开始](#安装) 了解详情

## 特点

* 简单配置
* 轻量 (~36kB)
* 多种滑动样式

## 安装

```html
  npm install vue-concise-slider --save
```

## 快速开始

<vuep template="#example"></vuep>


## 有更好的想法？
欢迎来留下你的意见:https://github.com/warpcgd/vue-concise-slider/issues/1

## BUG？oh no!
可以在这里提交,会尽快处理:https://github.com/warpcgd/vue-concise-slider/issues/2



<script v-pre type="text/x-template" id="example">
  <template>
      <slider :pages="pages" :sliderinit="sliderinit">
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
              sliderinit: {
                currentPage: 0,
                thresholdDistance: 100,
                thresholdTime: 300,
                loop:true,
                infinite:1,
                slidesToScroll:1,
                direction:'horizontal',
                autoplay:0
              }
            }
         }
    }
  </script>
</script>