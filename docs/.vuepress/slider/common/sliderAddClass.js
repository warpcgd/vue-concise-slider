export default function () {
  if (this.config.sliderLength) {
    let slideDom = this.$el.getElementsByClassName('slider-wrapper')[0]
    let childrens = Array.prototype.slice.call(slideDom.children)
    let sliderItem = childrens.filter((item) => {
      return item.className.indexOf('slider-item') !== -1
    })
    let sliderActiveCopy = childrens.filter((item) => {
      return item.className.indexOf('slider-active-copy') !== -1
    })
    // let sliderItem = slideDom.getElementsByClassName('slider-item')
    // let sliderActiveCopy = slideDom.getElementsByClassName('slider-active-copy')
    let loopedSlides = this.options.loopedSlides || 1
    let sliderLength = this.config.sliderLength
    let children = this.$children
    let currentPage = this.data.currentPage
    children = children.filter((item) => {
      return item.$options._componentTag === 'slideritem'
    })
    children.forEach(element => {
      element.removeActive()
    })
    // 取消嵌套轮播active标签
    if (this.config.effect === 'nest') {
      return
    }
    if (children[currentPage]) {
      children[currentPage].addActive()
    }
    if (currentPage < 0 || currentPage >= sliderLength) {
      if (sliderItem[currentPage + loopedSlides] && sliderItem[currentPage + loopedSlides].classList) {
        sliderItem[currentPage + loopedSlides].classList.add('slider-active-copy')
      }
      let lastPage = currentPage < 0 ? sliderLength + currentPage : 0 + currentPage - sliderLength
      children[lastPage].addActive()
    } else {
      for (let index = 0; index < sliderActiveCopy.length; index++) {
        const item = sliderActiveCopy[index]
        item.classList.remove('slider-active-copy')
      }
    }
  }
  if (this.data.currentPage < 0 || this.data.currentPage >= this.config.sliderLength) {
    return false
  }
}
