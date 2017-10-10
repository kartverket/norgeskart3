module.exports = function ( grunt ) {

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-appcache');

    //var fs = require('fs');
    var _ = require('lodash');
    var readDir = require('fs-readdir-recursive');

    /**
     * Load in our build configuration file.
     */
    var userConfig = require( './build.config.js' );


    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner:
            '/**\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                /*' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +*/
            ' */\n'
        },

        /**
         * Creates a changelog on a new version.
         */
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                template: 'changelog.tpl'
            }
        },

        /**
         * Increments the version number, etc.
         */
        bump: {
            options: {
                files: [
                    "package.json",
                    "bower.json"
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    "package.json",
                    "client/bower.json"
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',//'origin',
                prereleaseName: 'rc'
            }
        },

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: [
            '<%= build_dir %>',
            '<%= compile_dir %>',
            '<%= nuget_dir %>'
        ],

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            build_app_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: 'src/assets',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_external_assets: {
                files: [
                    {
                        src: [ '<%= external_files.assets %>' ],
                        dest: '<%= build_dir %>/external/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_vendor_fonts: {
                files: [
                    {
                        src: [ '<%= vendor_files.fonts %>' ],
                        dest: '<%= build_dir %>/fonts/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_externaljs: {
                files: [
                    {
                        src: [ '<%= external_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: [ 'fonts/**', '**/*.json', '**/*.ico', '**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.ttf', '**/*.eot', '**/*.woff', '**/*.woff2', 'config.json' ],
                        dest: '<%= compile_dir %>',
                        cwd: '<%= build_dir %>',
                        expand: true
                    }
                ]
            },
            nuget: {
                files: [
                    //source files
                    {
                        src: ['<%= pkg.name %>-<%= pkg.version %>.js'],
                        dest: '<%= nuget_dir %>/Scripts/<%= pkg.name %>',
                        cwd: '<%= compile_dir %>',
                        expand: true
                    },
                    {
                        src: ['<%= pkg.name %>-<%= pkg.version %>.js'],
                        dest: '<%= nuget_dir %>/Scripts/mapAdminTool',
                        cwd: '<%= compile_dir %>',
                        expand: true
                    },
                    //Sass generated css
                    {
                        src: ['css/<%= pkg.name %>-<%= pkg.version %>.css'],
                        dest: '<%= nuget_dir %>/Style/<%= pkg.name %>',
                        cwd: '<%= build_dir %>',
                        expand: true
                    },
                    //Sass generated css, mapAdminTool
                    {
                        src: ['css/<%= pkg.name %>-<%= pkg.version %>.css'],
                        dest: '<%= nuget_dir %>/Style/mapAdminTool',
                        cwd: '<%= build_dir %>',
                        expand: true
                    }

                ]
            }
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/css/dev.css'
                ],
                dest: '<%= build_dir %>/css/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            compile_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/css/dist.css'
                ],
                dest: '<%= compile_dir %>/css/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    '<%= external_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>'
                ],
                dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        /**
         * `ng-min` annotates the sources before minifying. That is, it allows us
         * to code without the array syntax.
         */
        ngmin: {
            compile: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            }
        },

        /**
         * Minify the sources!
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        compass: {
            dist: {
              options: {
                outputStyle: 'compressed',
                sassDir: 'src/assets/sass/',
                cssDir: '<%= build_dir %>/css/',
                raw: "preferred_syntax = :scss\n"
             }
            },
            dev: {
                options: {
                    outputStyle: 'compact',
                    sassDir: 'src/assets/sass/',
                    cssDir: '<%= build_dir %>/css/',
                    raw: "preferred_syntax = :scss\n"
                }
            }
        },

        /**
         * `jshint` defines the rules of our linter as well as which files we
         * should check. This file, all javascript sources, and all our unit tests
         * are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside `src/`.
         */
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: { // http://www.jshint.com/docs/options/
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                noempty: true,
                sub: true,
                boss: false,
                eqnull: true,
                bitwise: true,
                strict: false,
                undef: false,
                unused: true,
                esversion: 5
            },
            globals: {}
        },

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: [ '<%= app_files.atpl %>' ],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },

        /**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: '<%= build_dir %>/karma-unit.js'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= external_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= build_dir %>/css/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= build_dir %>/assets/img/**',
                    '<%= concat.compile_js.dest %>',
                    '<%= build_dir %>/css/<%= pkg.name %>-<%= pkg.version %>.css'
                ]
            }
        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= external_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= test_files.js %>'
                ]
            }
        },

        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [ 'jshint:gruntfile' ],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: [ 'jshint:src', 'karma:unit:run', 'copy:build_appjs' ]
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: [ 'copy:build_app_assets', 'copy:build_vendor_assets', 'copy:build_external_assets', 'copy:build_vendor_fonts' ]
            },

            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'index:build' ]
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                    '<%= app_files.atpl %>',
                    '<%= app_files.ctpl %>'
                ],
                tasks: [ 'html2js' ]
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            sass: {
                files: [ 'src/assets/**/*.scss' ],
                tasks: [ 'compass:dev', 'concat:build_css' ]
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: [ 'jshint:test', 'karma:unit:run' ],
                options: {
                    livereload: false
                }
            }
        },
        //the nuget package structure
        nuspec: {
            build: {

            }
        },
        nugetidx: {
            build: {
            }
        },
        nugetadminidx: {
            build: {
            }
        },
        nugetcontroller: {
            build: {
                cwd: '<%= compile_dir %>',
                dir: '<%= compile_dir %>',
                src: [
                    '<%= pkg.name %>-<%= pkg.version %>.js',
                    '<%= source_css %>'
                ]
            }
        },
        nugetAdminController: {
            build: {
                cwd: '<%= build_dir %>',
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= source_css %>'
                ]
            }
        },
        appcache: {   // See chrome://appcache-internals/ for appcache status in chrome!
            options: {
                basePath: 'dist'
            },
            all: {
                dest: 'geoinnsyn3.appcache',
                cache: {
                    patterns: [
                        '<%= compile_dir %>/**/*',  // all the resources in 'compile dir/'
                        '!<%= compile_dir %>/**/*.appcache' // except appcache-files
                    ]
                },
                network: '*',
                fallback: 'offline.html'
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ));

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );

    /**
     * The default task is to build and compile.
     */
    grunt.registerTask( 'default', [ 'build', 'compile' ] );

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask( 'build', [
        'clean',
        'html2js',
        'jshint',
        'compass:dist',
        'concat:build_css',
        //'appcache',
        'copy:build_app_assets',
        'copy:build_vendor_assets',
        'copy:build_external_assets',
        'copy:build_vendor_fonts',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'copy:build_externaljs',
        'ngmin',
        'index:build',
        'karmaconfig',
        'karma:continuous'
    ]);

    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask( 'compile', [
        'concat:compile_css',
        'copy:compile_assets',
        'ngmin',
        'concat:compile_js',
        'uglify',
        'appcache',
        'index:compile'
    ]);

    grunt.registerTask('nuget', [
        'build',
        'compile',
        'copy:nuget',
        'nugetidx',
        'nugetadminidx',
        'nugetcontroller',
        'nugetAdminController',
        'nuspec'
    ]);

    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    function noAngularDependenciesFile(file){
        return file.indexOf('ISY.Dist.Angular.js') < 0;
    }

    function mapDirectoriesToTargetEnvironment(file){
        var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
        return file.replace( dirRE, '' );
    }

    //utility for getting just the filenames of a full path
    function getfilenames(files) {
        return files.map(function (file) {
            return file.split('/').pop();
        });
    }

    function ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var jsFiles = filterForJS(this.filesSrc)
            .filter(noAngularDependenciesFile)
            .map(mapDirectoriesToTargetEnvironment);
        var cssFiles = filterForCSS(this.filesSrc)
            .map(mapDirectoriesToTargetEnvironment);
        //var markup = grunt.file.read("src/html/indexMarkup.html");
        //var configMarkup = grunt.file.read("src/html/configMarkup.html");
        var copyOptions = {
            process: function ( contents ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        };

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', copyOptions);
        grunt.file.copy('src/elevationProfile.xml', this.data.dir + '/elevationProfile.xml', copyOptions);
    });

    //build Index.cshtml for NuGet package
    grunt.registerMultiTask('nugetadminidx', 'Process index.cshtml template for nuget', function () {
        //var markup = grunt.file.read("src/html/configMarkup.html");
        var packageName = 'mapAdminTool';
        var packageNameUcfirst = ucFirst(packageName);
        var copyOptions = {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        packageName: packageName,
                        packageNameUcfirst: packageNameUcfirst
                    }
                });
            }
        };
        var dest = grunt.config('nuget_dir') + '/Views/' + packageNameUcfirst + 'Page/';

        grunt.file.copy('internal_templates/config.cshtml', dest + 'Index.cshtml', copyOptions);
        //grunt.file.copy('html/jstemplates.html', dest + 'JsTemplates.cshtml');
    });


    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy( 'karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', {
            process: function ( contents ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });

        grunt.file.copy( 'karma/karma-ci.tpl.js', grunt.config( 'build_dir' ) + '/karma-ci.js', {
            process: function ( contents ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

    //build .nuspec file
    grunt.registerMultiTask('nuspec', 'create .nuspec file', function () {
        var files = readDir(grunt.config('nuget_dir'));

        var fileList = files.map(function (file) {
            file = file.replace(/\//g, "\\");
            return {
                src: file,
                dest: 'Content\\' + file
            };
        });

        var copyOptions = {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        packageName: grunt.config('pkg.name'),
                        description: grunt.config('pkg.description'),
                        version: grunt.config('pkg.version'),
                        fileList: fileList
                    }
                });
            }
        };
        var dest = grunt.config('nuget_dir') + '/';

        grunt.file.copy('internal_templates/nuspec.tmpl', dest + '.nuspec', copyOptions);
    });

    //create nugetcontroller file for NuGet package
    grunt.registerMultiTask('nugetcontroller', 'Create controller', function () {
        var excludes = grunt.config('vendor_nuget_excludes');
        var files = _.filter(this.filesSrc, function (file) {
            return (excludes.indexOf(file) === -1);
        });

        var jsFiles = getfilenames(filterForJS(files));
        var cssFiles = getfilenames(filterForCSS(files));
        //cssFiles = cssFiles.concat(fs.readdirSync('sass/css'));
        var packageName = grunt.config('pkg.name');
        var copyOptions = {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        packageNameUcfirst: ucFirst(packageName),
                        packageName: packageName,
                        scripts: jsFiles,
                        styles: cssFiles
                    }
                });
            }
        };
        var dest = grunt.config('nuget_dir') + '/Controllers/' + ucFirst(packageName) + 'PageController.cs';
        grunt.file.copy('internal_templates/controller.tmpl', dest, copyOptions);
    });

    //create nugetcontroller file for NuGet package
    grunt.registerMultiTask('nugetAdminController', 'Create controller for MapAdminTool', function () {
        var excludes = grunt.config('vendor_nuget_excludes');
        var files = _.filter(this.filesSrc, function (file) {
            return (excludes.indexOf(file) === -1);
        });

        var jsFiles = getfilenames(filterForJS(files));
        var cssFiles = getfilenames(filterForCSS(files));
        //cssFiles = cssFiles.concat(fs.readdirSync('sass/css'));
        var packageName = 'mapAdminTool';
        var copyOptions = {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        packageNameUcfirst: ucFirst(packageName),
                        packageName: packageName,
                        scripts: jsFiles,
                        styles: cssFiles
                    }
                });
            }
        };
        var dest = grunt.config('nuget_dir') + '/Controllers/' + ucFirst(packageName) + 'PageController.cs';
        grunt.file.copy('internal_templates/MapAdminToolController.tmpl', dest, copyOptions);
    });
};

