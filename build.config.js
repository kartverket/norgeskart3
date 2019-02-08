/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'dist',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: [  'src/**/*.js',  '!src/**/*.spec.js', '!src/assets/**/*.js', '!src/lib/log4javascript/log4javascript.js' ],
        jsunit: [ 'src/**/*.spec.js' ],

        atpl: [ 'src/app/**/*.html', ],

        html: [ 'src/index.html'],
        sass: 'src/assets/sass/main.scss'
        // sass: 'src/sass/main.scss'
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    external_files:{
        js:[
            // 'external/maplib/dist/maplib-min.js'
        ],
        assets:[

        ]
    },

    vendor_files: {
        js: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular-translate/dist/angular-translate.min.js',
            'node_modules/proj4/dist/proj4.js',
            'node_modules/pouchdb/dist/pouchdb.min.js',
            'node_modules/ol/dist/ol.js',
            'node_modules/blob-util/dist/blob-util.min.js',
            'node_modules/maplib/dist/maplib.js',
            'node_modules/xml-to-json/xml.min.js',
            'node_modules/xml-to-json/json2xml.min.js',
            'node_modules/angular-utils-pagination/dirPagination.js',
            'node_modules/featherlight/release/featherlight.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/featherlight/release/featherlight.min.css'
        ],
        assets: [
            'src/assets/fonts/'
        ],
        fonts: [
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
            'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot'
        ]
    },
    jssource_mapclient: [
        '!src/**/*.spec.js',
        'src/app/shared/isyTranslate/**/*.js',
        'src/app/shared/localStorage/**/*.js',
        'src/app/shared/mapLayout/**/*.js',
        'src/app/shared/mapOverlaysLayout/**/*.js',
        'src/app/apiController/**/*.js',
        'src/app/zISY.Angular/**/*.js',
        'src/app/components/overlays/mapOverlays/**/*.js',
        'src/app/components/overlays/changeBaseMapOverlay/**/*.js',
        'src/app/components/overlays/changeBaseLayerOverlay/**/*.js',
        'src/app/components/overlays/moveableOverlay/**/*.js',
        'src/app/components/overlays/mainMenuOverlay/**/*.js',
        'src/app/components/overlays/searchBarOverlay/**/*.js',
        'src/app/components/transclusions/mainMenuPanel/**/*.js',
        'src/app/components/transclusions/changeBaseLayerPanel/**/*.js',
        'src/app/components/transclusions/menuDraw/**/*.js',
        'src/app/components/transclusions/menuShareMap/**/*.js',
        'src/app/components/transclusions/menuElevationProfile/**/*.js',
        'src/app/components/transclusions/searchPanel/**/*.js',
        'src/app/components/transclusions/tools/**/*.js'
    ],
    source_css: [
        '*.css'
    ]

};
