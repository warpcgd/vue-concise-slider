export default function() {
  if (this.config.sliderLength) {
    // let sliderItem = slideDom.getElementsByClassName('slider-item')
    // let sliderActiveCopy = slideDom.getElementsByClassName('slider-active-copy')
    let sliderLength = this.config.sliderLength
    let loopedSlides = this.options.loopedSlides || 1
    let children = this.$children[0].$children
    let currentPage = this.data.currentPage
    let realChildren = children.filter(item => {
      let isCloned = item.$vnode.isCloned
      return (
        (item.$options._componentTag === 'slideritem' ||
          item.$options._componentTag === 'SliderItem') &&
        !isCloned
      )
    })
    children.forEach(element => {
      element.removeActive()
      element.removeCopyActive()
    })
    // 取消嵌套轮播active标签
    if (this.config.effect === 'nest') {
      return
    }
    if (realChildren[currentPage]) {
      realChildren[currentPage].addActive()
    }
    // loop模式下优化
    if (currentPage < 0 || currentPage >= sliderLength) {
      if (children[currentPage + loopedSlides]) {
        children[currentPage + loopedSlides].addCopyActive()
      }
      let lastPage = currentPage < 0 ? sliderLength + currentPage : 0 + currentPage - sliderLength
      if (realChildren[lastPage]) {
        realChildren[lastPage].addActive()
      }
    }
  }
  if (this.data.currentPage < 0 || this.data.currentPage >= this.config.sliderLength) {
    return false
  }
}
