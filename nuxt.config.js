const axios = require('axios')
const API_BASE_URL = 'http://localhost:8000'
const SITE_BASE_URL = 'http://localhost:3000'
//const API_BASE_URL = 'http://185.92.148.221:8000'
//const SITE_BASE_URL = 'http://185.92.148.221'

export default {

  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
  },

  env: {
    //img_url: 'http://185.92.148.221:8000',
    img_url: API_BASE_URL,
  },

  serverMiddleware: [
    '~/middleware/seo.js'
  ],

  head: {
    title: 'docs_uniform',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'yandex-verification', content: '39d10bc86d0d53aa' },
      { name: 'facebook-domain-verification', content: 'lcp31n2ylzh970zya2xcqck7au6wgj' },
      { name: 'google-site-verification', content: 'n7bysP5Hprd2S8QF9s2dq6Wq1-IFWSRgfFgJtKD7_OU' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav.png' },
      { rel: 'preconnect',  href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/style.css',
    '@/assets/add.css',
    '@/assets/main.sass',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/scroll',
    '@/plugins/mask',
    '@/plugins/lodash',

    { src: '@/plugins/swiper', mode: 'client' },
    {src:'@/plugins/ymapPlugin',mode: 'client'},
  ],
  // router: {
  //   middleware: ['auth']
  // },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    ['nuxt-facebook-pixel-module', {
      track: 'PageView',
      pixelId: '624286744704947',
      autoPageView: true,
      disabled: false
    }],
    '@nuxtjs/gtm',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '52699993',
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      }
    ]
    // 'nuxt-lazy-load'
  ],
  gtm: {
    id: 'GTM-NXMCR8D'
  },
  robots: [
    {
      UserAgent: '*',
      Disallow: () => '/*?'
    },
    {Disallow: () => '/undefined/'  },
    {Disallow: () => '/cart'    },
    {Disallow: () => '/lk/'    },
    {Disallow: () => '/register/'    },
    {Disallow: () => '/*login*' },
    {Disallow: () => '/password/' },
    {Disallow: () => '/admin' },
    {Disallow: () => '*/api' },
    {Allow: () => '/*/*.js' },
    { Allow: () => '/*/*.css' },

    {
      UserAgent: 'GoogleBot',
      Disallow: () => '/*?'
    },
    {Disallow: () => '/undefined/'  },
    {Disallow: () => '/cart'    },
    {Disallow: () => '/lk/'    },
    {Disallow: () => '/register/'    },
    {Disallow: () => '/*login*' },
    {Disallow: () => '/password/' },
    {Disallow: () => '/admin' },
    {Disallow: () => '*/api' },
    {Allow: () => '/*/*.js' },
    { Allow: () => '/*/*.css' },

    {
      UserAgent: 'Yandex',
      Disallow: () => '/*?'
    },
    {Disallow: () => '/undefined/'  },
    {Disallow: () => '/cart'    },
    {Disallow: () => '/lk/'    },
    {Disallow: () => '/register/'    },
    {Disallow: () => '/*login*' },
    {Disallow: () => '/password/' },
    {Disallow: () => '/admin' },
    {Disallow: () => '*/api' },

    { Allow: () => '/*/*.js' },
    { Allow: () => '/*/*.css' },
    { 'Clean-Param': () => 'utm_source&utm_medium&utm_campaign' },

    {
      Sitemap: () => 'https://docsuniform.ru/sitemap.xml'
    },
  ],
  sitemap: {
    routes:
      async () => {
        const { data } = await axios.get(`${API_BASE_URL}/api/get_items`)
        return data.map((item) => item.url ? item.url : '')
      },

  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: API_BASE_URL
    // baseURL:'http://185.51.246.40:8000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/token/login/', method: 'post', propertyName: 'auth_token' },
          logout: { url: '/auth/token/logout/', method: 'post' },
          user: { url: '/api/user/me', method: 'get', propertyName: false }
        },
        // tokenRequired: true,
        tokenType: 'Token',
        // globalToken: true,
        //autoFetchUser: false
      }
    }
  }
}
