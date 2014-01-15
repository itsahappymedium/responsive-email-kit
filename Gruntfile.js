module.exports = function(grunt) {
	'use strict';

	var path = require('path');

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
         * Project Paths
         */
        paths: {
        	// Store the finished files here
            dist: 'dist',

            // Temporary folder to build things
            tmp: 'tmp',

            // Where our images are located
            images: 'img',
            
            // Where the email templates are located
            templates: 'templates',

            // Where the Sass files are located
            sass: 'sass',
            
            // Where are CSS is located
            css: 'css',

            // Where data files are living
            data: 'data',

            // Where partials are living
            partials: 'partials'
        },

        /**
         * Before generating any new files, clean the /dist/ directory.
         */
        clean: {
            dist: ['<%= paths.dist %>', '<%= paths.tmp %>']
        },

        /**
         * Compile the Sass files using Compass
         */
        compass: {
            dist: {
                options: {
                    sassDir: '<%= paths.sass %>',
                    cssDir: '<%= paths.css %>',
                    environment: 'production'
                }
            }
        },

	    /**
	     * Task to copy images to the dist directory
         *
         * This doesn't minify them, but you can run grunt dist to minify them and copy them over.
	     */
	    copy: {
            dist: {
                images: [{
                    expand: true,
                    cwd: '<%= paths.images %>',
                    src: ['**/*.{gif,png,jpg}'],
                    dest: '<%= paths.dist %>/img'
                }]
            }
        },

        /**
         * Insert the media query css into the document manually.
         */
        htmlbuild: {
            dist: {
                src: ['<%= paths.dist %>/*.html'],
                dest: '<%= paths.dist %>',
                options: {
                    relative: true,
                    styles: {
                        mq: '<%= paths.css %>/mq.css'
                    }
                }
            }
        },

        /**
         * Image optimization
         */
        imagemin: {
            options: {
                progressive: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.images %>',
                    src: ['**/*.{gif,png,jpg}'],
                    dest: '<%= paths.dist %>/img'
                }]
            }
        },

        /**
         * Inline the CSS from the external file into the document
         * This also copies the templates into the /dist/ folder
         */
        premailer: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp %>',
                    src: ['**/*.html'],
                    dest: '<%= paths.dist %>/'
                }]
            }
        },

        /**
         * Render EJS templates and data into HTML documents
         */
        render: {
            options: {
                data: ['<%= paths.data %>/*.json'],
                partialPaths: ['<%= paths.partials %>']
            },

            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.templates %>',
                    src: ['**/*.html'],
                    dest: '<%= paths.dist %>'
                }]
            },

            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.templates %>',
                    src: ['**/*.html'],
                    dest: '<%= paths.tmp %>'
                }]
            }
        },

        /**
         * This helps us watch changes to the files and reloads/recompiles when necessary
         */
        watch : {
        	// Watch the .SCSS files for changes and recompile them
            sass: {
                files: ['<%= paths.sass %>/*.scss'],
                tasks: ['dev']
            },

            // Watch the template files for changes, inline their css files again, and recompile them
            templates: {
            	files: ['<%= paths.templates %>/*.html', '<%= paths.partials %>/*.html', '<%= paths.data %>/*.json %>'],
            	tasks: ['dev']
            },
            
            // Watch our files for changes and reload the browser
            livereload: {
                files: ['<%= paths.dist %>/*.html', '<%= paths.dist %>/img/*'],
                options: {
                    livereload: true
                }
            }
        }
	});

    // In development, do everything but premailer and imagemin
    grunt.registerTask('dev', ['compass', 'clean', 'render:dev', 'htmlbuild']);

    // To distribute, do the other two steps
    grunt.registerTask('dist', ['compass', 'clean', 'imagemin', 'render:dist', 'premailer', 'htmlbuild']);

    // By default, do the dev version
	grunt.registerTask('default', ['dev']);
}