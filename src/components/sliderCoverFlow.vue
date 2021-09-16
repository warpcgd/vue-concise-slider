<template>
    <div class='slider-container' :class = 'config.containerClass' @mouseleave="swipeOut">
      <div class='slider-touch'
      :style="styleobj"
      @touchmove="swipeMove"
      @touchstart="swipeStart"
      @touchend="swipeEnd"
      @mousedown="swipeStart"
      @mouseup="swipeEnd"
      @mousemove="swipeMove"
      @webkit-transition-end="onTransitionEnd"
      @transitionend="onTransitionEnd"
      @transitioncancel="onTransitionEnd"
      @webkit-transition-cancel="onTransitionEnd"
      >
      <sliderWrapper>
        <slot></slot>
      </sliderWrapper>
      </div>
      <div v-if="config.pagination" class="slider-pagination slider-pagination-bullets">
        <template v-for="n in config.sliderLength">
          <span v-if="!options.renderPagination" @click='slide(n-1)' :key="n" class="slider-pagination-bullet" :class="n-1 === data.currentPage? 'slider-pagination-bullet-active':''"></span>
          <renderpagination v-if="options.renderPagination"  @click.native='slide(n-1)' :key="n" :class="n-1 === data.currentPage? 'slider-pagination-bullet-active-render':''" :index="n" :options="options" ></renderpagination>
        </template>
      </div>
      <div class="slider-loading" v-show="config.sliderLength === 0 || config.loading">
        <slot name="loading"></slot>
      </div>
    </div>
</template>
<script>
// 引入基础组件
import sliderMove from './common/sliderMove.js'
import sliderWrapper from './common/sliderWrapper.js'
import sliderComputed from './common/sliderComputed.js'
import sliderEvent from './common/sliderEvent.js'
import sliderClock from './common/sliderClock.js'
import sliderDom from './common/sliderDom.js'
import sliderAddClass from './common/sliderAddClass.js'
// 引入不同类型slider
// import sliderBasic from './effect/sliderBasic/sliderBasic.js'
import sliderCoverflow from './effect/sliderCoverflow/sliderCoverflow.js'
// import sliderFade from './effect/sliderFade/sliderFade.js'
export default {
  props: {
    options: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  name: 'sliderCoverFlow',
  mixins: [sliderDom, sliderMove, sliderClock, sliderEvent, sliderComputed, sliderCoverflow],
  data() {
    return {
      data: {},
      config: {
        pageWidth: 0,
        pageHeight: 0,
        loading: false,
        effect: this.options.effect || 'slide',
        resize: this.options.resize === undefined ? true : this.options.resize,
        containerClass: {
          'swiper-container-vertical': false,
          'swiper-container-horizontal': true,
          'swiper-container-cursorGrab': this.options.grabCursor || false
        }
      }
    }
  },
  mounted() {
    this.config.pageWidth = this.$el.offsetWidth
    this.config.pageHeight = this.$el.offsetHeight
    // 设定垂直轮播class
    if (this.options.direction === 'vertical') {
      this.config.containerClass['swiper-container-vertical'] = true
    } else {
      this.config.containerClass['swiper-container-horizontal'] = true
    }
  },
  methods: {
    swipeStart(e) {
      sliderMove.methods.swipeStart.call(this, e)
    },
    swipeMove(e) {
      sliderMove.methods.swipeMove.call(this, e)
      // if (this.config.effect === 'slide' || this.config.effect === 'nest') {
      //   sliderBasic.methods.swipeMove.call(this, e)
      // }
    },
    swipeEnd(e) {
      sliderMove.methods.swipeEnd.call(this, e)
    },
    swipeOut(e) {
      sliderMove.methods.swipeOut.call(this, e)
    },
    pre() {
      this.data.direction = 'left'
      // if (this.config.effect === 'slide' || this.config.effect === 'nest') {
      //   sliderBasic.methods.pre.call(this)
      // }
      if (this.config.effect === 'coverflow') {
        sliderCoverflow.methods.pre.call(this)
      }
      // if (this.config.effect === 'fade') {
      //   sliderFade.methods.pre.call(this)
      // }
    },
    next() {
      this.data.direction = 'right'
      // if (this.config.effect === 'slide' || this.config.effect === 'nest') {
      //   sliderBasic.methods.next.call(this)
      // }
      if (this.config.effect === 'coverflow') {
        sliderCoverflow.methods.next.call(this)
      }
      // if (this.config.effect === 'fade') {
      //   sliderFade.methods.next.call(this)
      // }
    },
    slide(pagenum, type) {
      this.$emit('slide', this.data)
      sliderAddClass.call(this, pagenum, type)
      // 执行动画
      this.config.animation = true
      // 无样式滚动
      if (type === 'animationnone') {
        this.config.animation = false
      }
      if (pagenum || pagenum === 0) {
        this.data.currentPage = pagenum
      }
      // if (this.config.effect === 'slide' || this.config.effect === 'nest') {
      //   sliderBasic.methods.slide.call(this, pagenum, type)
      // }
      // if (this.config.effect === 'fade') {
      //   sliderFade.methods.slide.call(this, pagenum, type)
      // }
    },
    // 阻止页面滚动
    preventDefault(e) {
      e.preventDefault()
    }
  },
  components: {
    sliderWrapper,
    renderpagination: {
      // eslint-disable-line
      render: function(createElement) {
        let index = this.index
        let render = this.options.renderPagination
        return render.call(this, createElement, index)
      },
      name: 'renderpagination',
      props: {
        index: {
          type: Number,
          required: true
        },
        options: {
          type: Object,
          required: true
        }
      }
    }
  }
}
</script>

<style>
.slider-container {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.slider-container {
  height: 100%;
  width: 100%;
  position: relative;
  white-space: nowrap;
}
.slider-center-center {
  margin: auto;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slider-touch {
  height: 100%;
}
.swiper-container-horizontal > * > .slider-wrapper {
  box-sizing: content-box;
  display: flex;
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  align-items: center;
  /*flex-direction: column;*/
  /* 09版 */
  -webkit-box-orient: vertical;
  /* 12版 */
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
}
/*垂直*/
.swiper-container-vertical > * > .slider-wrapper {
  box-sizing: content-box;
  display: flex;
  height: 100%;
  position: relative;
  transition-property: transform;
  width: 100%;
  z-index: 1;
  align-items: center;
  /*flex-direction: column;*/
  /* 09版 */
  -webkit-box-orient: vertical;
  /* 12版 */
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
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
  /*background: #fff none repeat scroll 0 0;*/
  display: flex;
  font-size: 40px;
  justify-content: center;
  text-align: center;
  color: #fff;
  /*display: inline-block;*/
}

.slider-fade .slider-item {
  position: absolute;
  left: 0;
  opacity: 0;
}
.slider-pagination {
  position: absolute;
  text-align: center;
  transform: translate3d(0px, 0px, 0px);
  /*transition: all 350ms ease 0s;*/
  z-index: 10;
}
.swiper-container-horizontal > .slider-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}
.swiper-container-horizontal > * > .slider-pagination-bullet {
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
  left: 0;
  bottom: auto;
  left: auto;
  width: auto;
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0px);
}
.swiper-container-vertical > * > .slider-pagination-bullet {
  background: #000 none repeat scroll 0 0;
  border-radius: 100%;
  height: 8px;
  opacity: 0.2;
  width: 8px;
  cursor: pointer;
  display: block;
  margin: 5px 0;
}
.swiper-container-vertical .slider-pagination-bullet-active,
.swiper-container-horizontal .slider-pagination-bullet-active {
  background: #fff none repeat scroll 0 0;
  opacity: 1;
}
.slider-loading {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  width: 100%;
  text-align: center;
}
.swiper-container-cursorGrab {
  cursor: grab;
}
</style>
