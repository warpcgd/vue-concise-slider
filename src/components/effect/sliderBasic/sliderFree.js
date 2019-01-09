import { getTranformMaxWidth } from '../../util/index.js'
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
export default {
  props: {
    options: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return {}
      }
    }
  },
  name: 'sliderNest',
  data () {
    return {
      data: {
      },
      config: {
        slidesToScroll: this.options.slidesToScroll || 1,
        effect: this.options.effect || 'slide',
        thresholdDistance: this.options.thresholdDistance || 50,
        thresholdTime: this.options.thresholdTime || 1000,
        direction: this.options.direction || 'horizontal',
        transitionEnding: false,
        itemTransitionEnding: false,
        animation: false,
        slidesPerView: this.options.slidesPerView === undefined ? 0 : this.options.slidesPerView,
        nested: this.options.nested === undefined ? true : this.options.nested,
        freeMode: this.options.freeMode === undefined ? false : this.options.freeMode,
        freeModeMomentum: this.options.freeModeMomentum === undefined ? true : this.options.freeModeMomentum, // free模式动量。free模式下，若设置为false则关闭动量，释放slide之后立即停止不会滑动。
        freeModeMomentumRatio: this.options.freeModeMomentumRatio === undefined ? 1 : this.options.freeModeMomentumRatio,
        freeModeMomentumVelocityRatio: this.options.freeModeMomentumVelocityRatio === undefined ? 1 : this.options.freeModeMomentumVelocityRatio,
        freeModeSticky: this.options.freeModeSticky === undefined ? false : this.options.freeModeSticky,
        freePosWidth: 0,
        freePosHeight: 0
      }
    }
  },
  methods: {
    swipeStart (e) {
      let transform = window.getComputedStyle(e.currentTarget).getPropertyValue('transform')
      let transformX = parseFloat(transform.substring(7).split(',')[4])
      let transformY = parseFloat(transform.substring(7).split(',')[5])
      this.config.freePosWidth = transformX
      this.config.freePosHeight = transformY
    },
    swipeMove (e) {
      let poswidth = this.config.freePosWidth
      let posheight = this.config.freePosHeight
      if (this.config.direction === 'vertical') {
        // 处理free模式
        this.data.posheight = posheight + this.data.end.y - this.data.start.y
      } else {
        this.data.poswidth = poswidth + this.data.end.x - this.data.start.x
      }
    },
    onTransitionEnd () {
      let tranformMaxWidth = getTranformMaxWidth(this.$el)
      if (!this.config.loop) {
        if (this.data.poswidth > 0) {
          this.config.speed = 300
          this.data.poswidth = 0
        }
        if (this.data.poswidth < -tranformMaxWidth) {
          this.config.speed = 300
          this.data.poswidth = -tranformMaxWidth
        }
      }
    },
    swipeEnd (e) {
      // debugger
      let now = new Date().getTime()
      let deltaTime = now - this.data.start.t
      // let currentPage = this.data.currentPage
      let deltaX = this.data.end.x - this.data.start.x
      let deltaY = this.data.end.y - this.data.start.y
      let preX = deltaX >= 0 ? -1 : 1
      let preY = deltaY >= 0 ? -1 : 1
      let Vx = preX * Math.pow((Math.abs(deltaX) * 1000 / deltaTime), 2) / 2
      let Vy = preY * Math.pow((Math.abs(deltaY) * 1000 / deltaTime), 2) / 2
      let tranformMaxWidth = getTranformMaxWidth(this.$el)
      // debugger
      if (this.config.freeModeMomentum) {
        this.config.animation = true
        // freeModeMomentumRatio
        this.config.speed = 1000
        let calX = this.data.poswidth - Vx / 1000
        let calY = this.data.posheight - Vy / 1000
        if (calX > 0) {
          let offsetX = getBaseLog(1.1, calX)
          this.data.poswidth = offsetX
          return
        }
        if (calX < -tranformMaxWidth) {
          let offsetX = getBaseLog(1.1, -calX)
          this.data.poswidth = -tranformMaxWidth - offsetX
          return

        }
        if (this.config.direction === 'vertical') {
          this.data.posheight = this.data.posheight - Vy / 1000
        } else {
          this.data.poswidth = this.data.poswidth - Vx / 1000
        }
      }

      // if (!this.config.freeModeMomentum) {
      //   this.config.freePosWidth = this.data.poswidth
      //   this.config.freePosHeight = this.data.posheight
      // }

      // 触底反弹
      // let slideDom = this.$el.getElementsByClassName('slider-wrapper')[0]
      // let sliderItem = slideDom.getElementsByClassName('slider-item')
      // let sliderLastItem = sliderItem[this.config.sliderLength - 1]

      // if (this.data.poswidth > 0 || this.data.posheight > 0) {
      //   this.slide(0)
      //   this.config.freePosWidth = 0
      //   this.config.freePosHeight = 0
      // }
      // if (this.data.poswidth < -sliderLastItem.offsetLeft || this.data.posheight < -sliderLastItem.offsetTop) {
      //   this.slide(this.config.sliderLength - 1)
      //   this.config.freePosWidth = -sliderLastItem.offsetLeft
      //   this.config.freePosHeight = -sliderLastItem.offsetTop
      // }
    },
    pre () {
      // let $parent = this.config.$parent
      // if ($parent && this.data.currentPage === 0 && $parent.config.nested) {
      //   $parent.pre()
      //   this.slide()
      //   return false
      // }
    },
    next () {
      // let sliderLength = this.config.sliderLength
      // let $parent = this.config.$parent
      // if ($parent && this.data.currentPage === sliderLength - 1 && $parent.config.nested) {
      //   let parent = this.config.$parent
      //   parent.next()
      //   this.slide()
      //   return false
      // }
    }
  }
}
