
<template>
	<slider class='slider-container' :pages="someList" :sliderinit="sliderinit">
    <!-- slot  -->
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
            sliderinit: {
                currentPage: 0,
                contentWidth:500,
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
