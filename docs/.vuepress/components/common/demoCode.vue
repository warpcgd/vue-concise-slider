<template>
  <div class="code">
    <div class="code-demo">
      <div class="code-content">
        <slot></slot>
      </div>
    </div>
    <common-collapse>
      <div v-show="isShow" class="code-segment collapse-wrap">
        <slot name="codeText"></slot>
      </div>
    </common-collapse>
    <div v-if="$slots.codeText" class="code-button" @click="handleToggleShow">{{codeTextBtn}}</div>
  </div>
</template>

<script>
// import collapse from './collapse.vue'
export default {
  name: 'code',
  data() {
    return {
      isShow: false,
      codeTextBtn: 'code-show ▾'
    }
  },
  component: {
    // collapse
  },
  methods: {
    handleToggleShow() {
      this.isShow = !this.isShow
      this.codeTextBtn = this.isShow ? 'code-hide ▴' : 'code-show ▾'
    }
  }
}
</script>

<style lang="scss">
.code-segment pre {
  margin: 0
}
.code {
  width: 100%;
  .code--title {
    h2 {
      padding: 0;
      margin: 0;
      border-bottom: none;
      font-size: 18px;
    }
    small {
      font-size: 14px;
      display: inline-block;
      margin: 10px 0;
      color: #5e6d82;
    }
  }
  .code-demo {
    // border: 1px solid #ebebeb;
    // border-bottom: none;
    // border-radius: 3px;
    // box-shadow: 0 0 2px 0 rgba(232, 237, 250, 0.6),
    //   0 1px 2px 0 rgba(232, 237, 250, 0.5);
    .code-content {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      // padding: 4%;
      // border-bottom: 1px solid #ddd;
    }
  }
  .code-button {
    background: #fafbfc;
    color: #2c3e50;
    font-weight: 400;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    margin-top: 10px;
    // box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    //   0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
}
</style>