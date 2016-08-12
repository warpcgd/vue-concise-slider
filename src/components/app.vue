
<template>
	<slider :pages="someList" :sliderinit="sliderinit">
    <!-- slot  -->
  </slider>
  <button @click="slidePre">上一页</button>
<button @click="slideNext">下一页</button>
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
        }
    },
}
</script>
