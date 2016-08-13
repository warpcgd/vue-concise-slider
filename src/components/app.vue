<style>
.sliderButton{
    margin-top: 10px
}
.sliderButton button{
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    width: 100px;
    height: 30px;
    border: 1px solid #333;
    line-height: 30px;
    margin-left: 10px;
}
</style>
<template>
	<slider :pages="someList" :sliderinit="sliderinit">
    <!-- slot  -->
  </slider>
  <div class="sliderButton">
  <button @click="slidePre">上一页</button>
  <button @click="slideNext">下一页</button>
  <button @click="appendslider">添加一页</button>
  </div>
</template>

<script>
import slider from './slider'
export default {
	 el: '#slider',
	 data () {
        return {
            someList:[
                {
                    title: 'slide1',
                    img: 'testimg-1.jpg',
                    style:{
                        background:'#1bbc9b',
                    },
                },
                {
                    title: 'slide2',
                    img: 'testimg-2.jpg',
                    style:{
                       background:'#4bbfc3',
                    },
                },
                {
                    title: 'slide3',
                    img: 'testimg-3.jpg',
                    style:{
                        background:'#7baabe',
                    },
                }
            ],
            sliderinit: {
                currentPage: 0,
                start: {},
                end: {},
                tracking: false,
                thresholdTime: 500,
                thresholdDistance: 100,
            }
        }
    },
    components: {
        slider
    },
    methods: {
        turnTo (num) {
            console.log(num)
            this.$broadcast('slideTo', num)
        },
        slideNext () {
            this.$broadcast('slideNext')
        },
        slidePre () {
            this.$broadcast('slidePre')
        },
        appendslider(){
            this.someList.push({title: 'slidenew',img: 'testimg-4.jpg',});
            console.log(this.someList);
        }
    },
}
</script>
