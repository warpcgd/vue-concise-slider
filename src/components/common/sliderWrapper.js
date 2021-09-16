function deepClone(vnodes, createElement, key) {
  function cloneVNode(vnode) {
    let RndNums = RndNum(5)
    const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
    cloned.text = vnode.text
    cloned.isComment = vnode.isComment
    cloned.componentOptions = vnode.componentOptions
    cloned.isCloned = true
    cloned.isOnce = false
    cloned.elm = vnode.elm
    cloned.context = vnode.context
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnodes.key || vnodes.key === 0 ? vnodes.key + key + '-copy' : RndNums + '-copy'
    return cloned
  }

  const clonedVNodes = cloneVNode(vnodes)
  return clonedVNodes
}

function RndNum(n) {
  var rnd = ''
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10)
  }
  return rnd
}

export default {
  methods: {
    renderDom($el) {
      if (this.$parent) {
        this.$parent.renderDom($el)
      }
    },
    onItemTransitionEnd(e) {
      if (this.$parent) {
        this.$parent.onItemTransitionEnd(e)
      }
    }
  },
  render(h) {
    let slots = this.$slots.default
    if (!slots) {
      return ''
    }
    // debugger
    let loopedSlides = this.$parent.config.loopedSlides
    let copeBefore = []
    let copeAfter = []

    let slotsFilter = slots.filter(item => {
      return item.componentOptions
        ? item.componentOptions.tag === 'slideritem' || item.componentOptions.tag === 'SliderItem'
        : false
    })
    this.$parent.config.sliderLength = slotsFilter.length || 0

    if (
      this.$parent.config.loop &&
      this.$parent.config.effect !== 'fade' &&
      this.$parent.config.effect !== 'coverflow'
    ) {
      if (slotsFilter && slotsFilter.length >= 2) {
        let length = slotsFilter ? slotsFilter.length : 0
        for (let j = 0; j < length; j++) {
          if (j + loopedSlides - length >= 0) {
            // 向前添加节点
            copeBefore.push(deepClone(slotsFilter[j], h, '-pre'))
          }
          if (j - loopedSlides < 0) {
            // 向后添加节点
            copeAfter.push(deepClone(slotsFilter[j], h, '-after'))
          }
        }
      }
    }
    return h(
      'div',
      {
        class: {
          'slider-wrapper': true,
          'slider-fade': this.$parent.config.effect === 'fade'
        },
        scopedSlots: this.$scopedSlots
      },
      [...copeBefore, ...slots, ...copeAfter]
    )
  }
}
