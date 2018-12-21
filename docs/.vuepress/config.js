module.exports = {
  base: '/vue-concise-slider/',
  title: 'vue-concise-slider',
  description: 'vue-concise-slider,A simple sliding component,has easy configuration,support self-adaption / fullscreen / button / page,and is compatible with mobile and PC terminal',
  themeConfig: {
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
    }
}