export default function () {
  if (this.config.sliderLength) {
    // let sliderItem = slideDom.getElementsByClassName('slider-item')
    // let sliderActiveCopy = slideDom.getElementsByClassName('slider-active-copy')
    let sliderLength = this.config.sliderLength
    let loopedSlides = this.options.loopedSlides || 1
    let children = this.$children[0].$children
    let currentPage = this.data.currentPage
    let realChildren = this.config.slotsFilter
    let virtual = this.config.virtual
    let slidesPerView = this.config.slidesPerView || 1
    children.forEach(element => {
      element.removeActive()
      element.removeCopyActive()
    })
    // 取消嵌套轮播active标签
    if (this.config.effect === 'nest') {
      return
    }
    if (realChildren[currentPage]) {
      realChildren[currentPage] && realChildren[currentPage]['componentInstance'] && realChildren[currentPage]['componentInstance'].addActive()
    }
    // loop模式下优化
    if (currentPage < 0 || currentPage >= sliderLength) {
      // debugger
      if (children[currentPage + loopedSlides] && !virtual) {
        children[currentPage + loopedSlides].addCopyActive()
      }
      if (children[currentPage + loopedSlides - slidesPerView - 2] && virtual) {
        children[currentPage + loopedSlides - slidesPerView - 2].addCopyActive()
      }
      let lastPage = currentPage < 0 ? sliderLength + currentPage : 0 + currentPage - sliderLength
      realChildren[lastPage] && realChildren[lastPage]['componentInstance'] && realChildren[lastPage]['componentInstance'].addActive()
    }
  }
  if (this.data.currentPage < 0 || this.data.currentPage >= this.config.sliderLength) {
    return false
  }
}
