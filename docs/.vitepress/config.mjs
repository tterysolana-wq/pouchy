import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PouchyAI',
  description: 'AI-Powered Wallet Intelligence for Solana DEX',
  base: '/pouchy-docs/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Features', link: '/features' },
      { text: 'Usage', link: '/usage' },
      { text: 'API', link: '/api' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Core Features', link: '/features' },
          { text: 'Why PouchyAI?', link: '/why-pouchyai' }
        ]
      },
      {
        text: 'Usage Guide',
        items: [
          { text: 'Usage Examples', link: '/usage' },
          { text: 'Token Discovery', link: '/token-discovery' },
          { text: 'Wallet Intersection', link: '/wallet-intersection' },
          { text: 'CTO Tracker', link: '/cto-tracker' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'API Reference', link: '/api' },
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'License', link: '/license' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tterysolana-wq/pouchy' }
    ],

    footer: {
      message: 'Released under the Proprietary License.',
      copyright: 'Copyright © 2024 PouchyAI'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ]
})
