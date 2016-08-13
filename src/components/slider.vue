<style>
.slider-container {
    height: 400px;
    margin: 20px auto;
    width: 50%;
}
.slider-container {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    z-index: 1;
}
.slider-center-center{
		margin: auto;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    font-size: 40px;
    justify-content: center;
    text-align: center;
    color: #fff;
}
.animation-ease {
		-webkit-transition: -webkit-transform 350ms cubic-bezier(.165, .84, .44, 1);
		transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
}
.slider-pagination {
    position: absolute;
    text-align: center;
    transform: translate3d(0px, 0px, 0px);
    transition: all 350ms ease 0s;
    z-index: 10;
}
.slider-pagination-bullets{
    bottom: 10px;
    left: 0;
    width: 100%;
}
.slider-pagination-bullet{
    background: #000 none repeat scroll 0 0;
    border-radius: 100%;
    display: inline-block;
    height: 8px;
    opacity: 0.2;
    width: 8px;
    cursor: pointer;
    margin: 0 5px;
}
.slider-pagination-bullet-active {
    background: #fff none repeat scroll 0 0;
    opacity: 1;
}
.slider-button-next, .slider-button-prev {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 27px 44px;
    cursor: pointer;
    height: 44px;
    margin-top: -22px;
    position: absolute;
    top: 50%;
    width: 27px;
    z-index: 10;
}
.slider-button-prev{
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E");
    left: 10px;
    right: auto;
}

.slider-button-next{
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2027%2044\'%3E%3Cpath%20d%3D\'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z\'%20fill%3D\'%23ffffff\'%2F%3E%3C%2Fsvg%3E");
    left: auto;
    right: 10px;
}
</style>
<template>
    <div class='slider-container slider-center-center'>
      <div class="slider-wrapper"
      :style="styleobj"
      :class="basicdata.animation"
	    @touchmove="swipeMove"
   	  @touchstart="swipeStart"
      @touchend="swipeEnd"
      @mousedown="swipeStart"
      @mouseup="swipeEnd"
      @mousemove="swipeMove"
      >
      	<template v-for="item in pages">
      		<div class="slider-item" :style="item.style">
       		<!-- 	<img src="{{item.img}}" alt="{{item.title}}"> -->
       		{{item.title}}
       		</div>
      	</template>
      </div>
      <div class="slider-pagination slider-pagination-bullets">
         <template v-for="item in pagenum">
           <span class="slider-pagination-bullet" :class="$index == sliderinit.currentPage ? 'slider-pagination-bullet-active':''"></span>
        </template>
      </div>
      <div class="slider-button-next" @click="next"></div>
      <div class="slider-button-prev" @click="pre"></div>
    </div>
</template>
<script>
export default {
     props: ['sliderinit', 'pages'],
     data(){
     	return {
     		basicdata:{
     			poswidth:'0',
     			animation:{
     				'animation-ease':false,
     			},
     		}
     	}
     },
     computed:{
     		styleobj: function () {
     		 // `this` 指向 vm 实例
     		 return {'transform': 'translate3D(' + this.basicdata.poswidth + ',0,0)'}
   		   },
   		   pagenum: function(){
   		   	return this.pages.length
   		   },
     },
    ready () {
    		//定制事件
        this.$on('slideTo', (num) => {
            this.slide(num)
        });
        this.$on('slideNext', () => {
            this.next()
        });
        this.$on('slidePre', () => {
            this.pre()
        });
     },
     methods:{
     	swipeStart (e) {
     		this.basicdata.animation = {
     			'animation-ease':false,
     		}
     		this.sliderinit.contentWidth = e.target.clientWidth
     		console.log(e);
        if (e.type === 'touchstart') {
            if (e.touches.length>1) {
                    this.sliderinit.tracking = false;
                    return;
            } else {
                    this.sliderinit.tracking = true;
                    /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
                    this.sliderinit.start.t = new Date().getTime();
                    this.sliderinit.start.x = e.targetTouches[0].clientX;
                    this.sliderinit.start.y = e.targetTouches[0].clientY;
            }
        } else {
                this.sliderinit.tracking = true;
                /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
                this.sliderinit.start.t = new Date().getTime();
                this.sliderinit.start.x = e.clientX;
                this.sliderinit.start.y = e.clientY;
        		}
        },
        swipeMove (e) {
            if (this.sliderinit.tracking) {
                if (e.type === 'touchmove') {
                    e.preventDefault();
                    this.sliderinit.end.x = e.targetTouches[0].clientX;
                    this.sliderinit.end.y = e.targetTouches[0].clientY;
                } else {
                    e.preventDefault();
                    this.sliderinit.end.x = e.clientX;
                    this.sliderinit.end.y = e.clientY;
                }
                this.basicdata.poswidth = -(this.sliderinit.currentPage * this.sliderinit.contentWidth) + this.sliderinit.end.x - this.sliderinit.start.x  + 'px';
            }
        },
        swipeEnd (e) {
            this.sliderinit.tracking = false;
            let now = new Date().getTime();
            let deltaTime = now - this.sliderinit.start.t;
            let deltaX = this.sliderinit.end.x - this.sliderinit.start.x;
            let deltaY = this.sliderinit.end.y - this.sliderinit.start.y;
            /* work out what the movement was */
            if (deltaTime > this.sliderinit.thresholdTime) {
            		this.slide(this.sliderinit.currentPage);
                /* gesture too slow */
                return;
            } else {
                if ((deltaX > this.sliderinit.thresholdDistance)&&(Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                    //swipe right
                    this.pre()
                } else if ((-deltaX > this.sliderinit.thresholdDistance)&&(Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                    //swipe left
                    this.next()
                } else {
                   this.slide(this.sliderinit.currentPage);
                    return;
                }
            }
        },
        pre () {
					if (this.sliderinit.currentPage != 0) {
						this.sliderinit.currentPage -= 1;
				  	this.slide(this.sliderinit.currentPage);
		      } else {
			      this.slide(this.sliderinit.currentPage);
					}
        },
        next () {
					if (this.sliderinit.currentPage != this.pagenum - 1) {
						this.sliderinit.currentPage += 1;
						this.slide(this.sliderinit.currentPage);
					} else {
						this.slide(this.sliderinit.currentPage);
					}
        },
        slide(pagenum){
        	let poswidth = -pagenum * this.sliderinit.contentWidth + 'px';
						this.basicdata.animation = {
     					'animation-ease':true,
     				}
					//执行动画
					this.basicdata.poswidth = poswidth;
        }
     }
}
</script>