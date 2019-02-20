function deepClone (vnodes, createElement) {
  function cloneVNode (vnode) {
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
    cloned.key = vnodes.key || vnodes.key === 0 ? vnodes.key + '-cppy' : RndNums + '-copy'
    return cloned
  }
  const clonedVNodes = cloneVNode(vnodes)
  return clonedVNodes
}
function RndNum (n) {
  var rnd = ''
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10)
  }
  return rnd
}
export default {
  methods: {
    renderDom ($el) {
      if (this.$parent) {
        this.$parent.renderDom($el)
      }
    },
    onItemTransitionEnd (e) {
      if (this.$parent) {
        this.$parent.onItemTransitionEnd(e)
      }
    }
  },
  computed: {
    styleobj () {
      let virtual = this.$parent.config.virtual
      let $sliderItem = this.$parent.$el && this.$parent.$el.querySelectorAll('.slider-item')
      let currentPage = this.$parent.data.currentPage
      let pageWidth = this.$parent.config.pageWidth
      if (!pageWidth || !virtual || !$sliderItem || currentPage < 1) {
        return {}
      }
      let style = {}
      // 默认使用$el的宽度进行计算
      let poswidth = pageWidth * [currentPage - 1]
      style['transform'] = 'translate3D(' + poswidth + 'px' + ',' + 0 + 'px' + ',0)'
      if (this.$parent.config.effect === 'fade') {
        return {}
      }
      if (this.$parent.config.effect === 'coverflow') {
        return {}
      }
      return style
    }
  },
  render (h) {
    let slots = this.$slots.default
    if (!slots) {
      return ''
    }
    let slotsFilter = slots.filter((item) => {
      return item.componentOptions ? item.componentOptions.tag === 'slideritem' : false
    })
    this.$parent.config.slotsFilter = slotsFilter
    let loopedSlides = this.$parent.config.loopedSlides
    let virtual = this.$parent.config.virtual
    let currentPage = this.$parent.data.currentPage
    let copeBefore = []
    let copeAfter = []
    // 虚拟节点
    if (virtual) {
      let lastVirtual = currentPage - 1 < 0 ? null : currentPage - 1
      let nextVirtual = currentPage + 1 >= slotsFilter.length ? null : currentPage + 1
      let newSlots = []
      if (lastVirtual !== null) {
        newSlots.push(slotsFilter[lastVirtual])
      }
      newSlots.push(slotsFilter[currentPage])
      if (nextVirtual !== null) {
        newSlots.push(slotsFilter[nextVirtual])
      }
      slots = newSlots
    }
    if (this.$parent.config.loop && this.$parent.config.effect !== 'fade' && this.$parent.config.effect !== 'coverflow') {
      if (slotsFilter && slotsFilter.length >= 2) {
        let length = slotsFilter ? slotsFilter.length : 0
        for (let j = 0; j < length; j++) {
          if (j + loopedSlides - length >= 0) {
            // 向前添加节点
            copeBefore.push(deepClone(slotsFilter[j], h))
          }
          if (j - loopedSlides < 0) {
            // 向后添加节点
            copeAfter.push(deepClone(slotsFilter[j], h))
          }
        }
      }
    }
    return h('div', {
      class: {
        'slider-wrapper': true,
        'slider-fade': this.$parent.config.effect === 'fade'
      },
      style: this.styleobj,
      scopedSlots: this.$scopedSlots
    }, [...copeBefore, ...slots, ...copeAfter])
  }
}
