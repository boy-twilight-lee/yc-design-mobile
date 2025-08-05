import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Varco',
  description: '一个基于 Vue 3 的移动端组件库',

  themeConfig: {
    outline: [2, 3],

    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '开始', link: '/guide/getting-started' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/boy-twilight-lee/yc-design-mobile' }
    ]
  }
})