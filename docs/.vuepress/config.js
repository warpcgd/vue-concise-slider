module.exports = {
  base: '/vue-concise-slider/',
  title: 'vue-concise-slider',
  description: 'vue-concise-slider,A simple sliding component,has easy configuration,support self-adaption / fullscreen / button / page,and is compatible with mobile and PC terminal',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'vue-concise-slider'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vue-concise-slider'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        nav: [{
          text: 'Home',
          link: '/'
        },
        {
          text: 'Demos',
          link: '/demos/'
        },
        {
          text: 'Docs',
          link: '/docs'
        },
        {
          text: 'Guide',
          link: '/guide'
        }
        ],
        sidebar: {
          '/demos/': [
            '',     /* /foo/ */
            'Basic',  /* /foo/one.html */
            'Center',  /* /foo/one.html */
            'CoverFlow',  /* /foo/one.html */
            'Fade',  /* /foo/one.html */
            'Loop',  /* /foo/one.html */
            'Multiple',  /* /foo/one.html */
            'Nest',  /* /foo/one.html */
            'RenderPagination',  /* /foo/one.html */
            'VariableWidth',  /* /foo/one.html */
            'Vertical',  /* /foo/one.html */
          ]
        }
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        nav: [{
            text: '首页',
            link: '/zh/'
          },
          {
            text: '示例',
            link: '/zh/demos/'
          },
          {
            text: '文档',
            link: '/zh/docs'
          },
          {
            text: '教程',
            link: '/zh/guide'
          }
        ],
        sidebar: {
          '/zh/demos/': [
            '', /* /foo/ */
            'Basic', /* /foo/one.html */
            'Center', /* /foo/one.html */
            'CoverFlow', /* /foo/one.html */
            'Fade', /* /foo/one.html */
            'Loop', /* /foo/one.html */
            'Multiple', /* /foo/one.html */
            'Nest', /* /foo/one.html */
            'RenderPagination', /* /foo/one.html */
            'VariableWidth', /* /foo/one.html */
            'Vertical', /* /foo/one.html */
          ]
        }
      }
    }
  }
}