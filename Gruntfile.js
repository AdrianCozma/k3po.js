/*
 * k3po.js
 * https://github.com/kaazing/k3po.js
 *
 * Copyright (c) 2014 Kaazing
 * Licensed under the APACHE 2 license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'test/**/*.js',
                'lib/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            dist: {
                src: ['build/']
            }
        },

        k3po: {
            start: {
                options: {
                    goal: "start",
                    scripts: "test/scripts"
                }
            },
            stop: {
                options: {
                    goal: "stop"
                }
            },
            daemon: {
                options: {
                    goal: "start",
                    scripts: "test/scripts",
                    daemon: false
                }
            }
        },

        mochaTest: {
            testBase: {
                options: {
                    reporter: 'spec',
                    require: 'lib/testFrameworks/mocha-k3po.js',
                    captureFile: "build/mochaTest.txt",
                    quiet: false
                },
                src: ['test/base/*spec.js']
            },
            testMochaK3po: {
                options: {
                    reporter: 'spec',
                    ui: 'mocha-k3po',
                    require: 'lib/testFrameworks/mocha-k3po.js',
                    captureFile: "build/testMochaK3po.txt"
                },
                src: ['test/testFrameworks/mocha-k3po*.js']
            },
            testMochaK3poFirefoxBrowserSupport: {
                options: {
                    reporter: 'spec',
                    ui: 'mocha-k3po',
                    require: 'lib/testFrameworks/mocha-k3po.js',
                    captureFile: "build/testMochaK3po.txt",
                    browser: {
                        desiredCapabilities: {
                            browserName: 'firefox',
                            platform: 'linux'
                        },
                    host: '127.0.0.1',
                    port: '4445',
                    user: 'kaazing-build',
                    key: 'f350bbbb-376e-4c0e-b7b6-ae78f58f67f2'
                    }
                },
                src: ['test/testFrameworks/mocha-k3po*.js']
            },
            testMochaK3poChromeBrowserSupport: {
                options: {
                    reporter: 'spec',
                    ui: 'mocha-k3po',
                    require: 'lib/testFrameworks/mocha-k3po.js',
                    captureFile: "build/testMochaK3po.txt",
                    browser: {
                        desiredCapabilities: {
                            browserName: 'chrome',
                            platform: 'linux'
                        },
                    host: '127.0.0.1',
                    port: '4445',
                    user: 'kaazing-build',
                    key: 'f350bbbb-376e-4c0e-b7b6-ae78f58f67f2'
                    }
                },
                src: ['test/testFrameworks/mocha-k3po*.js']
            },
            testMochaK3poSafariBrowserSupport: {
                options: {
                    reporter: 'spec',
                    ui: 'mocha-k3po',
                    require: 'lib/testFrameworks/mocha-k3po.js',
                    captureFile: "build/testMochaK3po.txt",
                    browser: {
                        desiredCapabilities: {
                            browserName: 'safari',
                            platform: 'mac'
                        },
                    host: '127.0.0.1',
                    port: '4445',
                    user: 'kaazing-build',
                    key: 'f350bbbb-376e-4c0e-b7b6-ae78f58f67f2'
                    }
                },
                src: ['test/testFrameworks/mocha-k3po*.js']
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-k3po');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('runRobot', ['k3po:daemon']);

    grunt.registerTask('default', ['clean', 'jshint', 'mochaTest:testBase', 'k3po:start', 'mochaTest:testMochaK3po']);
    grunt.registerTask('firefox', ['clean', 'jshint', 'mochaTest:testBase', 'k3po:start', 'mochaTest:testMochaK3poFirefoxBrowserSupport']);
    grunt.registerTask('chrome', ['clean', 'jshint', 'mochaTest:testBase', 'k3po:start', 'mochaTest:testMochaK3poChromeBrowserSupport']);
    grunt.registerTask('safari', ['clean', 'jshint', 'mochaTest:testBase', 'k3po:start', 'mochaTest:testMochaK3poSafariBrowserSupport']);
};
