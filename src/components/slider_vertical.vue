<style>
.sliderButton{

    text-align: center;
}
.sliderButton button{
    display: inline-block;
    background: #fff;
    border-radius: 3px;
/*    width: 100px;*/
    height: 30px;
    border: 1px solid #333;
    line-height: 30px;
    margin-left: 10px;
    padding: 0 15px;
     margin-top: 10px;
}
</style>
<template>
<div>
  <slider :pages="someList" :sliderinit="sliderinit">
    <!-- slot  -->
  </slider>
  <div class="sliderButton">
  <button @click="slidePre">上一页</button>
  <button @click="slideNext">下一页</button>
  <button @click="appendslider">添加一页</button>
  <button @click="turnTo(2)">跳转到第三页</button>
  </div>
</template>
<script>
import slider from './slider'
export default {
	 el: '#slidervertical',
	 data () {
        return {
            someList:[
                {
                    title: 'slide1',
                    style:{
                         'background':'#1bbc9b',
                    },
                },
                {
                    title: 'slide2',
                    style:{
                         'background':'#4bbfc3',
                    },
                },
                {
                    title: 'slide3',
                    style:{
                         'background':'#7baabe',
                    },
                }
            ],
            sliderinit: {
                currentPage: 1,
                start: {},
                end: {},
                tracking: false,
                thresholdTime: 300,//滑动判定距离
                thresholdDistance: 100,//滑动判定时间
                direction:'vertical',//垂直滚动
                // loop:true,//无限循环
                // autoplay:1000,//自动播放:时间[ms]
            }
        }
    },
    components: {
        slider
    },
    methods: {
        turnTo (num) {
            // 传递事件
            this.$emit('slideTo', num);
        },
        slideNext () {
            this.$emit('slideNext');
        },
        slidePre () {
            this.$emit('slidePre');
        },
        appendslider(){
            this.someList.push({
                title: 'slidernew',
                style:{
                    background:'#333',
                    color:'#fff'
                }
            });
        }
    },
    events:{
        slide(pagenum){
            // console.log(pagenum);
        }
    }
}
</script>
