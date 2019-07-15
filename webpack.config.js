const Encore = require('@symfony/webpack-encore');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const Defineplugin = require('webpack/lib/DefinePlugin');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    // will create web/build/app.js and web/build/global.css
    .addEntry('app', './assets/vue/main.js')
    .addEntry('svg', './assets/js/icons.js')

    .addStyleEntry('global', './assets/scss/main.scss')

    // allow sass/scss files to be processed
    .enableSassLoader()

    // add vue loader
    .enableVueLoader()

    .addPlugin(new SpriteLoaderPlugin())

    .addPlugin(new Defineplugin({
        "process.env.NODE_ENV": JSON.stringify(Encore.isProduction() ? "production" : "development")
    }))

    // Create a SVG sprites
    .addLoader({
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'icons.svg',
                    symbolId: 'icon-[name]'
                }
            },
            {loader: 'svgo-loader'}
        ]
    })

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

const webpackConfig = Encore.getWebpackConfig();

// webpackConfig.optimization.minimize = true;

// export the final configuration
module.exports = webpackConfig;