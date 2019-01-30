const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
    mode: 'universal',

    /*
  ** Headers of the page
  */
    head: {
        title: 'vue-three-wrap Examples',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                href:
                    'https://fonts.googleapis.com/css?family=Major+Mono+Display|Montserrat',
                rel: 'stylesheet'
            }
        ]
    },

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: ['./plugins/main'],

    /*
  ** Nuxt.js modules
  */
    modules: [['nuxt-sass-resources-loader', ['assets/_base.scss']]],

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.md$/,
                use: [{ loader: 'html-loader' }, { loader: 'markdown-loader' }]
            })
            config.plugins.push(
                new webpack.ProvidePlugin({
                    _get: ['lodash/get']
                })
            )
        }
    }
}
