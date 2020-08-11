module.exports = {
  markdown: {
    // lineNumbers: true
  },
  plugins: {
    mermaidjs: true,
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: 'New content is available',
        buttonText: 'Refresh',
      },
    },
    '@vuepress/back-to-top': true,
    '@vuepress/medium-zoom': {
      selector: 'img',
    },
    autometa: {
      site: {
        name: 'ABC API',
      },
      canonical_base: 'https://abc.firemodel.info',
      author: {
        name: 'Ken Snyder',
        twitter: 'yankeeinlondon',
      },
    },
    '@vuepress/container': [
      {
        type: 'align',
        before: alignment => `<div class="align-${alignment}" style="text-align: ${alignment}">`,
        after: '</div',
      },
    ],
  },
  title: 'ABC API',
  description: 'A cache forward API which brings together local state management, IndexedDB, and Firebase',
  head: [
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'application-name', content: 'FireModel Vuex Plugin' }],
    [
      ('link',
      {
        rel: 'favicon',
        href: '/icon/icon-16.png',
        type: 'image/png',
        sizes: '16x16',
      }),
    ],
    [
      'link',
      {
        rel: 'favicon',
        href: '/icon/icon-32.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    [
      'link',
      {
        rel: 'favicon',
        href: '/icon/icon-48.png',
        type: 'image/png',
        sizes: '48x48',
      },
    ],
    [('link', { rel: 'icon', href: '/icon/icon-rounded-32.png', sizes: '32x32' })],
    ['link', { rel: 'icon', href: '/icon/icon-rounded-48.png', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/icon/icon-rounded-192.png', sizes: '192x192' }],
    ['link', { rel: 'icon', href: '/icon/icon-rounded-225.png', sizes: '225x225' }],
    ['link', { rel: 'icon', href: '/icon/icon-rounded-512.png', sizes: '512x512' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'link',
      {
        rel: 'apple-touch-icon-precomposed',
        href: '/icons/icon-rounded-192.png',
        sizes: '192x192',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_2048.png',
        sizes: '2048x2732',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_1668.png',
        sizes: '1668x2224',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_1536.png',
        sizes: '1536x2048',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_1125.png',
        sizes: '1125x2436',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_1242.png',
        sizes: '1242x2208',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_750.png',
        sizes: '750x1334',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-startup-image',
        href: '/icons/apple_splash_640.png',
        sizes: '640x1136',
      },
    ],

    ['link', { rel: 'apple-touch-icon', href: 'touch-icon-iphone', sizes: '120x120' }],
    ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: 'touch-icon-ipad' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'touch-icon-iphone-retina',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '167x167',
        href: 'touch-icon-ipad-retina',
      },
    ],
  ],
  themeConfig: {
    repo: 'forest-fire/abc',
    repoLabel: 'github',
    docsDir: 'docs',
    smoothScroll: true,
    nextLinks: true,
    nav: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
      },
      {
        text: 'API',
        link: '/api/',
      },
      {
        text: 'Other Topics',
        link: '/topics/',
      },
      {
        text: 'Examples',
        link: '/examples/',
      },
    ],
    sidebar: {
      '/examples/': [
        {
          title: 'Vegemite',
          collapsable: true,
          children: ['vegemite-isolated', 'vegemite-modules'],
        },
        {
          title: 'Vuex',
          collapsable: true,
          children: ['vuex-modules'],
        },
        {
          title: 'Advanced',
          collapsable: true,
          childen: ['adding-custom-events'],
        },
      ],
      '/api/': [
        '/api/',
        {
          title: 'Core API',
          collapsable: true,
          children: ['get', 'load', 'add', 'update', 'remove', 'purge', 'sync'],
        },
        'store-connect',
        'db-connect',
      ],
      '/topics/': [
        {
          title: 'Topics',
          collapsable: false,
          children: ['app-returns-versus-state', 'state-mgmt-conventions', 'store', 'localDb'],
        },
      ],
    },
  },
};
