function deepClone (vnodes, createElement) {
  function cloneVNode (vnode) {
    const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
    cloned.text = vnode.text
    cloned.isComment = vnode.isComment
    cloned.componentOptions = vnode.componentOptions
    cloned.elm = vnode.elm
    cloned.context = vnode.context
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key + '-copy'
    return cloned
  }

  const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
  return clonedVNodes
}
export default {
  methods: {
    renderDom ($el) {
      if (this.$parent) {
        this.$parent.renderDom($el)
      }
    }
  },
  render (h) {
    let slots = this.$slots.default
    if (!slots) {
      return ''
    }
    let slotsFilter = deepClone(slots, h)
    slotsFilter = slotsFilter.filter((item) => {
      return item.componentOptions ? item.componentOptions.tag === 'slideritem' : false
    })
    let loopedSlides = this.$parent.config.loopedSlides
    let length = slotsFilter ? slotsFilter.length : 0
    let copeBefore = []
    let copeAfter = []
    if (slotsFilter && this.$parent.config.loop && this.$parent.config.effect !== 'fade' && this.$parent.config.effect !== 'coverflow') {
      for (let j = 0; j < length; j++) {
        if (j + loopedSlides - length >= 0) {
          // 向前添加节点
          let node = slotsFilter[j]
          copeBefore.push(node)
        }
        if (j - loopedSlides < 0) {
          // 向后添加节点
          let node = slotsFilter[j]
          copeAfter.push(node)
        }
      }
    }
    this.$parent.config.sliderLength = slotsFilter.length
    return h('div', {
      class: {
        'slider-wrapper': true,
        'slider-fade': this.$parent.config.effect === 'fade'
      }
    }, [...copeBefore, ...slots, ...copeAfter])
  }
}
