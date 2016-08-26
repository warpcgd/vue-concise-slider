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
    width: 70%;
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
/*垂直*/
.swiper-container-vertical > .slider-wrapper{
  flex-direction: column;
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
    /*transition: all 350ms ease 0s;*/
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
/*垂直*/
.swiper-container-vertical > .slider-pagination-bullets {
    bottom: auto;
    left: auto;
    width: auto;
    right: 10px;
    top: 50%;
    transform: translate3d(0px, -50%, 0px);
}
.swiper-container-vertical .slider-pagination-bullet{
    display: block;
    margin: 5px 0;
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
    <div class='slider-container' :class = 'basicdata.containerClass'>
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
      <!-- 正常滚动 -->
       <template  v-if="!sliderinit.loop">
        <template  v-for="item in pages">
      	 <div class="slider-item" :style="item.style">
        	{{item.title}}
       	  </div>
        </template>
       </template>
      <!-- 无缝滚动 -->
       <template  v-if="sliderinit.loop">
        <div class="slider-item" :style="pages[pages.length-1].style">{{pages[pages.length-1].title}}</div>
         <template  v-for="item in pages">
          <div class="slider-item" :style="item.style">{{item.title}}</div>
         </template>
        <div class="slider-item" :style="pages[0].style">{{pages[0].title}}</div>
       </template>
      </div>
      <div class="slider-pagination slider-pagination-bullets">
         <template v-for="item in pagenums">
           <span @click='slide($index)' class="slider-pagination-bullet" :class="$index == sliderinit.currentPage ? 'slider-pagination-bullet-active':''"></span>
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
          posheight:'0',
     			animation:{
     				'animation-ease':false,
     			},
          containerClass:{
            'swiper-container-vertical':false,
          },
          setIntervalid:'',
     		}
     	}
     },
     computed:{
     		// 动画执行obj
     		styleobj: function () {
     			return {'transform': 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)'}
   		  },
   		  // pagenum滑动数
   		  pagenums: function(){
   		   	return this.pages.length
   		  },
        // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点,应该直接储存节点，提高性能
        currentWidth:{
          get:function(){
          let poswidth = 0;
          let $slider;
          let lastPage = this.sliderinit.currentPage-1;
          let srollbar = false;
          if(this.sliderinit.loop){
            lastPage = this.sliderinit.currentPage;
          }
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
              poswidth += $sliderChildren[item].offsetWidth;
              poswidth += parseInt($sliderChildren[item].style.marginRight.length?$sliderChildren[item].style.marginRight:0);
              poswidth += parseInt($sliderChildren[item].style.marginLeft.length?$sliderChildren[item].style.marginLeft:0);
            }
          }
          return poswidth
         },
         set:function(value){
          return value;
         }
        },
        currentHeight:function(){
          let posheight = 0;
          let $slider;
          let lastPage = this.sliderinit.currentPage-1;
          let srollbar = false;
          if(this.sliderinit.loop){
            lastPage = this.sliderinit.currentPage;
          }
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
              posheight += $sliderChildren[item].offsetHeight;
              posheight += parseInt($sliderChildren[item].style.marginTop.length?$sliderChildren[item].style.marginTop:0);
              posheight += parseInt($sliderChildren[item].style.marginBottom.length?$sliderChildren[item].style.marginBottom:0);
            }
          }
          return posheight
        }
     },
    ready () {
      let that = this;
      //起始跳到指定页 更新为无样式的了,更符合常理
      that.slide(this.sliderinit.currentPage,'animationnone')
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
      // 第一次的滚动也要向上传递一次事件
      that.$dispatch('slide',this.sliderinit.currentPage);

      //自动轮播 支持无缝滚动
      that.clock().begin(that);
      // 设定垂直轮播class
      if(this.sliderinit.direction == 'vertical'){
        this.basicdata.containerClass['swiper-container-vertical'] = true;
      }
     },
     methods:{
     	swipeStart (e) {
     		this.basicdata.animation['animation-ease'] = false;
        // 暂停自动滚动
        if(this.sliderinit.autoplay){
          let that = this;
          this.clock().stop(that);
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
              this.sliderinit.end.x = e.targetTouches[0].clientX;
              this.sliderinit.end.y = e.targetTouches[0].clientY;
            }
        } else {
                this.sliderinit.tracking = true;
                /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
                this.sliderinit.start.t = new Date().getTime();
                this.sliderinit.start.x = e.clientX;
                this.sliderinit.start.y = e.clientY;
                this.sliderinit.end.x = e.clientX;
                this.sliderinit.end.y = e.clientY;
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
                if(this.sliderinit.direction == 'vertical'){
                  console.log('yes');
                  this.basicdata.posheight = -(this.currentHeight) + this.sliderinit.end.y - this.sliderinit.start.y  + 'px';
                  return
                }
                this.basicdata.poswidth = -(this.currentWidth) + this.sliderinit.end.x - this.sliderinit.start.x  + 'px';
            }
        },
        swipeEnd (e) {
            this.sliderinit.tracking = false;
            let now = new Date().getTime();
            let deltaTime = now - this.sliderinit.start.t;
            let deltaX = this.sliderinit.end.x - this.sliderinit.start.x;
            let deltaY = this.sliderinit.end.y - this.sliderinit.start.y;
            // 自动滚动重启
            if(this.sliderinit.autoplay){
              let that = this;
              setTimeout(function(){
              that.clock().begin(that);
              },350);
            }
            /* work out what the movement was */
            if (deltaTime > this.sliderinit.thresholdTime) {
            		this.slide(this.sliderinit.currentPage);
                /* gesture too slow */
                return;
            } else if (this.sliderinit.direction != 'vertical'){
                if ((deltaX > this.sliderinit.thresholdDistance)&&(Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                    //swipe right
                    this.pre();
                    return
                } else if ((-deltaX > this.sliderinit.thresholdDistance)&&(Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                    //swipe left
                    this.next();
                    return
                } else {
                   this.slide(this.sliderinit.currentPage);
                    return
                }
                // 垂直判定
            }else{
                if ((deltaY > this.sliderinit.thresholdDistance)&&(Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
                    //swipe right
                    this.pre();
                    return
                } else if ((-deltaY > this.sliderinit.thresholdDistance)&&(Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
                    //swipe left
                    this.next();
                    return
                } else {
                   this.slide(this.sliderinit.currentPage);
                    return
                }
            }
        },
        pre () {
			       if (this.sliderinit.currentPage != 0) {
						  this.sliderinit.currentPage -= 1;
				  	  this.slide();
		         } else if(this.sliderinit.loop) {
			         this.sliderinit.currentPage -= 1;
               this.slide(this.sliderinit.currentPage,'loop');
					   }else{
              this.slide();
             }

        },
        next () {
			     if (this.sliderinit.currentPage != this.pagenums - 1) {
						this.sliderinit.currentPage += 1;
						this.slide();
			     } else if(this.sliderinit.loop) {
						this.sliderinit.currentPage += 1;
            this.slide(this.sliderinit.currentPage,'loop');
           }else{
            this.slide();
           }
        },
        slide(pagenum,type){
          let that = this;

          //执行动画
			    this.basicdata.animation['animation-ease'] = true;
          // 无样式滚动
          if(type =='animationnone'){
            this.basicdata.animation['animation-ease'] = false;
          }
          if(pagenum||pagenum == 0){
            this.sliderinit.currentPage = pagenum;
          }
          // 增加垂直滚动判定
          if(this.sliderinit.direction == 'vertical'){
            this.basicdata.posheight = -this.currentHeight + 'px';
          }else{
			      this.basicdata.poswidth = -this.currentWidth + 'px';
          }
          //下面350定时写死了，下次更新会提供API修改
          if(type == 'loop'){
            setTimeout(function(){
              if(that.sliderinit.currentPage == -1){
                that.slide(that.pagenums-1,'animationnone');
              }else{
                that.slide(0,'animationnone');
              }
            },350);
            // 不传递广播事件
            return
          }
          // 广播事件
          this.$dispatch('slide',this.sliderinit.currentPage)
        },
        clock:function(){
          // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
          return {
            begin:function(that){
             if(that.sliderinit.autoplay){
              that.setIntervalid = setInterval(function(){
              that.next();
              if(that.sliderinit.currentPage == that.pagenums - 1&&!that.sliderinit.loop){
                clearInterval(that.setIntervalid)
              }
              }, that.sliderinit.autoplay);
              }
            },
            stop:function(that){
              clearInterval(that.setIntervalid)
            },
            }
        },
     }

}
</script>