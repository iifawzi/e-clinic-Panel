
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head() {
    return {
    title: process.env.npm_package_name || 'Control Panel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
  },
  server:{
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
 css: [
  '~/assets/scss/main.scss',
  '~/assets/css/all.css',
],
styleResources: {
  scss: ['./assets/scss/*.scss']
},
  /*
  ** Plugins to load before mounting the App
  */
 router: {
  middleware: ['language'],
},
 plugins: [
   '~/plugins/i18n.js',
   '~/plugins/vuelidate'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
