import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Aneka UI',
  description: 'Framework-agnostic component library with Material Design, Apple HIG, and Samsung One UI patterns',
  base: '/aneka-ui/',

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/components/button' },
      { text: 'CLI', link: '/cli/overview' },
      { text: 'Demo', link: 'https://aneka-ui-demo.vercel.app' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Aneka UI?', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Philosophy', link: '/guide/philosophy' }
          ]
        },
        {
          text: 'Design Systems',
          items: [
            { text: 'Material Design', link: '/guide/material-design' },
            { text: 'Apple HIG', link: '/guide/apple-hig' },
            { text: 'Samsung One UI', link: '/guide/samsung-oneui' },
            { text: 'Comparison', link: '/guide/comparison' }
          ]
        },
        {
          text: 'Frameworks',
          items: [
            { text: 'React', link: '/guide/react' },
            { text: 'Vue', link: '/guide/vue' },
            { text: 'Angular', link: '/guide/angular' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Tooltip', link: '/components/tooltip' }
          ]
        }
      ],
      '/cli/': [
        {
          text: 'CLI Reference',
          items: [
            { text: 'Overview', link: '/cli/overview' },
            { text: 'init', link: '/cli/init' },
            { text: 'add', link: '/cli/add' },
            { text: 'list', link: '/cli/list' },
            { text: 'diff', link: '/cli/diff' },
            { text: 'update', link: '/cli/update' },
            { text: 'doctor', link: '/cli/doctor' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AmitGurbani/aneka-ui' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Aneka UI'
    },

    search: {
      provider: 'local'
    }
  }
})
