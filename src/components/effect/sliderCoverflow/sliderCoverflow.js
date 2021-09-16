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
  name: 'sliderCoverflow',
  data() {
    return {
      data: {},
      config: {
        slidesToScroll: this.options.slidesToScroll || 1,
        effect: this.options.effect || 'slide',
        direction: this.options.direction || 'horizontal',
        transitionEnding: false,
        itemTransitionEnding: false,
        animation: false,
        slidesPerView: this.options.slidesPerView || 0,
        thresholdDistance: this.options.thresholdDistance || 50,
        widthScalingRatio: this.options.widthScalingRatio || 0.8,
        heightScalingRatio: this.options.heightScalingRatio || 0.8,
        deviation: this.options.deviation || 200
      }
    }
  },
  methods: {
    pre() {
      let $parent = this.config.$parent
      let slidesToScroll = this.config.slidesToScroll
      if (this.data.currentPage >= 1 && this.data.currentPage - slidesToScroll >= 0) {
        this.data.currentPage -= slidesToScroll || 1
        this.slide()
        return false
      }
      if (
        this.options.loop &&
        this.data.currentPage - slidesToScroll < 0 &&
        (!$parent || !$parent.config.nested)
      ) {
        this.data.currentPage -= slidesToScroll || 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        this.slide()
        return false
      }
      this.slide()
    },
    next() {
      let $parent = this.config.$parent
      let sliderLength = this.config.sliderLength
      let slidesToScroll = this.config.slidesToScroll
      let slidesPerView = this.options.loop
        ? 0
        : (sliderLength - this.config.slidesPerView) / slidesToScroll
      if (
        this.data.currentPage < sliderLength - 1 &&
        this.data.currentPage + slidesToScroll <=
          (slidesPerView ? slidesPerView + slidesToScroll - 1 : sliderLength - 1)
      ) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.slide()
        return false
      }
      if (
        this.options.loop &&
        this.data.currentPage + slidesToScroll > sliderLength - 1 &&
        (!$parent || !$parent.config.nested)
      ) {
        this.data.currentPage += this.options.slidesToScroll || 1
        this.config.transitionEnding = true
        this.config.itemTransitionEnding = true
        this.slide()
        return false
      }
      this.slide()
    }
  }
}
