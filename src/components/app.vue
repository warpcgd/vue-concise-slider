<style>
.slider-container {
    height: 300px;
    margin: 20px auto;
    width: 500px;
}
.slider-container {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    z-index: 1;
}
.slider-wrapper {
    box-sizing: content-box;
    display: flex;
    height: 100%;
    position: relative;
    transition-property: transform;
    width: 100%;
    z-index: 1;
}
.slider-item {
    flex-shrink: 0;
    height: 100%;
    position: relative;
    width: 100%;
}
.slider-item {
    align-items: center;
    background: #fff none repeat scroll 0 0;
    display: flex;
    font-size: 18px;
    justify-content: center;
    text-align: center;
}
</style>
<template>
	<slider class='slider-container' :pages="someList" :slideinit="slideinit">
    <!-- slot  -->
    <div class="slider-wrapper">
      <template v-for="item in someList">
      <div class="slider-item" >
       <!-- 	<img src="{{item.img}}" alt="{{item.title}}"> -->
       {{item.title}}
       </div>
      </template>
    </div>
  </slider>
</template>
<script>
import slider from './slider'
export default {
	 el: '#app',
	 data () {
        return {
            someList:[
                {
                    title: 'slide1',
                    img: 'testimg-1.jpg',
                },
                {
                    title: 'slide2',
                    img: 'testimg-2.jpg',
                },
                {
                    title: 'slide3',
                    img: 'testimg-3.jpg',
                }
            ],
            slideinit: {
                pageNum: 3,
                currentPage: 1,
                canPre : false,
                canNext: true,
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
    }
}
</script>
