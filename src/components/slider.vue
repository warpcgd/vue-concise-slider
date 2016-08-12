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
.animation-ease {
		-webkit-transition: -webkit-transform 350ms cubic-bezier(.165, .84, .44, 1);
		transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
}
</style>
<template>
    <div class="slider">
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
      		<div class="slider-item" >
       		<!-- 	<img src="{{item.img}}" alt="{{item.title}}"> -->
       		{{item.title}}
       		</div>
      	</template>
    	</div>
    </div>
</template>
<script>
export default {
     props: ['sliderinit', 'pages'],
     data(){
     	return {
     		basicdata:{
     			poswidth:'0',
     			pagenum:this.pages.length,
     			animation:{
     				'animation-ease':false,
     			},
     		}
     	}
     },
     computed:{
     		styleobj: function () {
     		 // `this` 指向 vm 实例
     		 return {'transform': 'translate3D(' + this.basicdata.poswidth + ',0,0)',}
   		 }
     },
     methods:{
     	swipeStart (e) {
     		this.basicdata.animation = {
     			'animation-ease':false,
     		}
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
					if (this.sliderinit.currentPage != this.basicdata.pagenum - 1) {
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