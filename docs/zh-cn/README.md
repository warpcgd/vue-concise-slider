## vue-concise-slider

> 一个简单的Vue滑动组件

## 它是什么

vue-concise-slider是一个简单的Vue滑动组件,配置简单,支持自适应/全屏,按钮,分页,兼容移动端和PC端

查看 [快速开始](#安装) 了解详情

## 特点

* 简单配置
* 轻量 (~16.9kB gzipped)
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
    <slider ref="slider" :pages="pages" :sliderinit="sliderinit">
    <!-- slot  -->
    </slider>
  </template>

  <script>
    import slider from 'module.js'// 引入slider组件
    module.exports = {
         components: {
              slider
         },
         data () {
            return {
              //图片列表[arr]
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
              //滑动配置[obj]
              sliderinit: {
                currentPage: 0,//当前页码
                thresholdDistance: 100,//滑动判定距离
                thresholdTime: 300,//滑动判定时间
                loop:true,//循环滚动
                infinite:1,//无限滚动前后遍历数
                slidesToScroll:1,//每次滑动项数
              }
            }
         }
    }
  </script>
</script>
