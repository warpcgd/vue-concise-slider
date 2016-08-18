<style>
.slider-container {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    z-index: 1;
}
 .slider-container {
    height: 400px;
    margin: 20px auto;
    width: 50%;
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
.slider-item {
    background-position: center center!important;
    background-size: cover!important;
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
/*移动端优化*/
 @media screen and (max-width:414px) {
    .slider-container {
    height: 200px;
    margin: 20px auto;
    width: 90%;
    }
}
</style>
<template>
    <div class='slider-container'>
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
           <span @click='slide($index)' class="slider-pagination-bullet" :class="$index == sliderinit.currentPage ? 'slider-pagination-bullet-active':''"></span>
        </template>
      </div>
      <div class="slider-button-next" @click="next"></div>
      <div class="slider-button-prev" @click="pre"></div>
      <slot></slot>
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
          setIntervalid:'',
     		}
     	}
     },
     computed:{
     		// 动画执行obj
     		styleobj: function () {
     			return {'transform': 'translate3D(' + this.basicdata.poswidth + ',0,0)'}
   		  },
   		  // pagenum滑动数
   		  pagenum: function(){
   		   	return this.pages.length
   		  },
        currentWidth:function(){
          console.log('yes');
          let poswidth = 0;
          let $slider;
          let lastPage = this.sliderinit.currentPage-1;
          // 获取slideritem子集
          for(let item in this.$el.children){
            if(/slider-wrapper/ig.test(this.$el.children[item].className)){
               $slider = this.$el.children[item]
            }
          }

           // 遍历子集
          let $sliderChildren  = $slider.children;
          for(let item in $sliderChildren){
            if(item <= lastPage){
              // 找到实际宽度clientWidth+外边距
              poswidth += $sliderChildren[item].clientWidth;
              poswidth += parseInt($sliderChildren[item].style.marginRight.length?$sliderChildren[item].style.marginRight:0);
              poswidth += parseInt($sliderChildren[item].style.marginLeft.length?$sliderChildren[item].style.marginLeft:0);
            }
          }

          return poswidth
        }
     },
    ready () {
      let that = this;
      //起始跳到指定页
      that.slide(this.sliderinit.currentPage)
    	//定制事件
      that.$on('slideTo', (num) => {
          this.slide(num);
      });
      that.$on('slideNext', () => {
          this.next();
      });
      that.$on('slidePre', () => {
          this.pre();
      });
      // 第一次启动也要向上传递一次事件
      that.$dispatch('slide',this.sliderinit.currentPage);

      //自动轮播  暂时不支持无缝滚动
      if(that.sliderinit.autoplay){
        that.setIntervalid = setInterval(function(){
          that.next();
          if(that.sliderinit.currentPage == that.pagenum - 1){
            clearInterval(that.setIntervalid)
          }
        }, that.sliderinit.autoplay);
       }
     },
     methods:{
     	swipeStart (e) {
     		this.basicdata.animation = {
     			'animation-ease':false,
     		}
        // console.log(e);
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
                // console.log(this.currentWidth);
                this.basicdata.poswidth = -(this.currentWidth) + this.sliderinit.end.x - this.sliderinit.start.x  + 'px';
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
				  	this.slide();
		       } else {
			      this.slide();
					 }
        },
        next () {
			     if (this.sliderinit.currentPage != this.pagenum - 1) {
						this.sliderinit.currentPage += 1;
						this.slide();
			     } else {
						this.slide();
			     }
        },
        slide(pagenum){
          //执行动画
			    this.basicdata.animation = {
     					'animation-ease':true,
     		  }
          //console.log(pagenum);
			    // this.$set('this.sliderinit.currentPage',pagenum)
          if(pagenum||pagenum == 0){
            this.sliderinit.currentPage = pagenum;
          }
           console.log(pagenum);
			    this.basicdata.poswidth = -this.currentWidth + 'px';
          // console.log(this.styleobj);
          // 广播事件
          this.$dispatch('slide',this.sliderinit.currentPage)
        },
     }
}
</script>