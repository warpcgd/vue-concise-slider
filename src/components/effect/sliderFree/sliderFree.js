import { getTranformMaxWidth } from '../../../utils/index.js'
import sliderAddClass from '../../common/sliderAddClass.js'
function getBaseLog (x, y) {
  return Math.log(y) / Math.log(x)
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
        freeModeMomentum: this.options.freeModeMomentum === undefined ? true : this.options.freeModeMomentum, // free模式动量。free模式下，若设置为false则关闭动量，释放slide之后立即停止不会滑动。
        freeModeMomentumRatio: this.options.freeModeMomentumRatio === undefined ? 1000 : this.options.freeModeMomentumRatio,
        freeModeMomentumVelocityRatio: this.options.freeModeMomentumVelocityRatio === undefined ? 1 : this.options.freeModeMomentumVelocityRatio,
        preventRebound: this.options.preventRebound === undefined ? false : this.options.preventRebound,
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
      if (this.config.tracking) {
        let poswidth = this.config.freePosWidth
        let posheight = this.config.freePosHeight
        let preventRebound = this.config.preventRebound
        if (this.config.direction === 'vertical') {
          // 处理free模式
          this.data.posheight = posheight + this.data.end.y - this.data.start.y
        } else {
          this.data.poswidth = poswidth + this.data.end.x - this.data.start.x
          if (preventRebound) {
            let tranformMaxWidth = getTranformMaxWidth(this.$el)
            let $sliderItem = this.config.$sliderItem
            let critical = 0 + this.options.centeredSlides ? this.config.pageWidth / 2 - $sliderItem[$sliderItem.length - 1]['offsetWidth'] / 2 : 0
            if (this.data.poswidth >= critical) {
              this.data.poswidth = critical
            }
            if (this.data.poswidth <= -tranformMaxWidth + critical) {
              this.data.poswidth = -tranformMaxWidth + critical
            }
          }
        }
      }
    },
    swipeEnd (e) {
      let now = new Date().getTime()
      let deltaTime = now - this.data.start.t
      let currentPage = this.data.currentPage
      let deltaX = this.data.end.x - this.data.start.x
      // let deltaY = this.data.end.y - this.data.start.y
      let preX = deltaX >= 0 ? -1 : 1
      let freeModeMomentumVelocityRatio = this.config.freeModeMomentumVelocityRatio
      let preventRebound = this.config.preventRebound
      let loop = this.config.loop
      // let preY = deltaY >= 0 ? -1 : 1
      let Vx = preX * Math.pow((Math.abs(deltaX) * 1000 * freeModeMomentumVelocityRatio / deltaTime), 2) / 2
      // let Vy = preY * Math.pow((Math.abs(deltaY) * 1000 / deltaTime), 2) / 2
      let tranformMaxWidth = getTranformMaxWidth(this.$el)
      let $sliderItem = this.config.$sliderItem
      // center的临界值
      let pageCritical = 0 + this.options.centeredSlides ? this.config.pageWidth / 2 : 0
      let leftCritical = 0 + this.options.centeredSlides ? (this.config.pageWidth / 2 - $sliderItem[0]['offsetWidth'] / 2) : 0
      let rightCritical = 0 + this.options.centeredSlides ? (this.config.pageWidth / 2 - $sliderItem[$sliderItem.length - 1]['offsetWidth'] / 2) : 0
      let sliderLength = this.config.sliderLength
      let calX = this.data.poswidth - Vx / 1000
      // debugger
      // let thresholdDistance = this.config.thresholdDistance
      let condition = (this.data.poswidth >= pageCritical && this.data.currentPage === 0 && this.config.gestureDirection === 'right') || (this.data.poswidth <= -tranformMaxWidth + pageCritical && this.data.currentPage === this.config.sliderLength - 1 && this.config.gestureDirection === 'left')
      // if (this.config.freeModeMomentum && this.data.currentPage !== 0 && this.data.currentPage !== this.config.sliderLength - 1) {
      if (this.config.freeModeMomentum && !condition) {
        this.config.animation = true
        // freeModeMomentumRatio
        this.config.speed = this.config.freeModeMomentumRatio
        // let calY = this.data.posheight - Vy / 1000
        if (preventRebound && !loop) {
          if (calX > pageCritical) {
            this.data.poswidth = leftCritical
          } else if (calX < -tranformMaxWidth + pageCritical) {
            this.data.poswidth = -tranformMaxWidth + rightCritical
          } else {
            this.data.poswidth = this.data.poswidth - Vx / 1000
          }
        } else {
          if (calX > pageCritical && !loop) {
            let offsetX = getBaseLog(1.1, calX) + leftCritical
            this.data.poswidth = offsetX
          } else if (calX < -tranformMaxWidth + pageCritical && !loop) {
            let offsetX = getBaseLog(1.1, -calX)
            this.data.poswidth = -tranformMaxWidth - offsetX + rightCritical
          } else {
            this.data.poswidth = this.data.poswidth - Vx / 1000
          }
        }
        // if (this.config.direction === 'vertical') {
        //   this.data.posheight = this.data.posheight - Vy / 1000
        // } else {
        //   this.data.poswidth = this.data.poswidth - Vx / 1000
        // }
      }
      // 头和尾 单独处理
      if (condition && !preventRebound) {
        this.slide(currentPage)
      }

      if (!this.config.freeModeMomentum) {
        this.config.freePosWidth = this.data.poswidth
        this.config.freePosHeight = this.data.posheight
      }
      // 确认currentPage
      if (sliderLength) {
        let posWidth = this.data.poswidth
        let pageWidth = this.config.pageWidth
        for (let i = 0; i < $sliderItem.length; i++) {
          let offsetLeft = $sliderItem[i].offsetLeft
          let offsetWidth = $sliderItem[i].offsetWidth
          let centerOffsetLeft = offsetLeft - offsetWidth / 2
          if (this.options.centeredSlides) {
            centerOffsetLeft = offsetLeft - pageWidth / 2 + offsetWidth / 2
          }
          if (centerOffsetLeft > -posWidth) {
            currentPage = (i - 1) < 0 ? 0 : i - 1
            sliderAddClass.call(this)
            break
          }
          if (-posWidth >= centerOffsetLeft && i === $sliderItem.length - 1) {
            currentPage = i
            sliderAddClass.call(this)
            break
          }
        }
      }
      // debugger
      // sliderpreview
      let slidesPerView = this.options.slidesPerView
      if (slidesPerView) {
        if (currentPage + slidesPerView > sliderLength && this.data.poswidth < -1 * $sliderItem[sliderLength - slidesPerView].offsetLeft) {
          let offsetX = getBaseLog(1.1, -calX)
          this.data.poswidth = -1 * $sliderItem[sliderLength - slidesPerView].offsetLeft - offsetX
        }
      }
      this.data.currentPage = currentPage
    },
    onTransitionEnd () {
      this.config.tracking = false
      let $sliderItem = this.config.$sliderItem
      let currentPage = this.data.currentPage
      let tranformMaxWidth = getTranformMaxWidth(this.$el)
      let critical = 0 + this.options.centeredSlides ? this.config.pageWidth / 2 - $sliderItem[currentPage]['offsetWidth'] / 2 : 0
      let leftCritical = 0 + this.options.centeredSlides ? (this.config.pageWidth / 2 - $sliderItem[0]['offsetWidth'] / 2) : 0
      let rightCritical = 0 + this.options.centeredSlides ? (this.config.pageWidth / 2 - $sliderItem[$sliderItem.length - 1]['offsetWidth'] / 2) : 0
      let slidesPerView = this.options.slidesPerView
      let sliderLength = this.config.sliderLength
      if (!this.config.loop) {
        if (this.data.poswidth > leftCritical) {
          this.config.speed = 300
          this.data.poswidth = critical
        }
        if (this.data.poswidth < -tranformMaxWidth + rightCritical && !slidesPerView) {
          this.config.speed = 300
          this.data.poswidth = -tranformMaxWidth + critical
        }
        if (slidesPerView && currentPage + slidesPerView > sliderLength && this.data.poswidth < -1 * $sliderItem[sliderLength - slidesPerView].offsetLeft) {
          this.config.speed = 300
          this.data.poswidth = -1 * $sliderItem[sliderLength - slidesPerView].offsetLeft
        }
      }
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
