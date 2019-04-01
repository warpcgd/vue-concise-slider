export function getTranformMaxWidth ($el) {
  let slideDom = $el.getElementsByClassName('slider-wrapper')[0]
  let childrens = Array.prototype.slice.call(slideDom.children)
  let sliderItem = childrens.filter((item) => {
    return item.className.indexOf('slider-item') !== -1
  })
  let width = 0
  sliderItem.length && sliderItem.forEach((element, index) => {
    if (index === sliderItem.length - 1) {
      width = element.offsetLeft
    }
  })
  return width
}

export function getTranformMaxHeight ($el) {
  let slideDom = $el.getElementsByClassName('slider-wrapper')[0]
  let childrens = Array.prototype.slice.call(slideDom.children)
  let sliderItem = childrens.filter((item) => {
    return item.className.indexOf('slider-item') !== -1
  })
  let width = 0
  sliderItem.length && sliderItem.forEach((element, index) => {
    if (index === sliderItem.length - 1) {
      width = element.offsetTop
    }
  })
  return width
}
