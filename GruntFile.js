/*!
 * 1000Things Gruntfile
 * @author Emanuele Spies
 */
 
'use strict';
 
/**
 * Grunt Module
 */
module.exports = function(grunt) {
		/**
		 * Configuration
		 */
		grunt.initConfig({
				/**
				 * Get package meta data
				 */
				pkg: grunt.file.readJSON('package.json'),

				/**
				 * Set project object
				 */
				project: {
					assets: 'public/assets',
					src: '<%= project.assets %>/dev',
					dist: '<%= project.assets %>/dist',
					css: [
						'<%= project.src %>/scss/project.scss',
					],
					js: [
						'<%= project.src %>/js/*.js'
					]
				},
				projectIe: {
					assets: 'public/assets',
					src: '<%= project.assets %>/dev',
					dist: '<%= project.assets %>/dist',
					css: [
						'<%= project.src %>/scss/ie.scss',
					]
				},

				/**
				* Project banner
				*/
				tag: {
					banner: '/*\n' +
									' * <%= pkg.name %>\n' +
									' * <%= pkg.title %>\n' +
									' * <%= pkg.url %>\n' +
									' * @author <%= pkg.author %>\n' +
									' * @version <%= pkg.version %>\n' +
									' */\n'
				},
				concat: {
					jsBuilt: {
							src:  '<%= project.src %>/js/*.js',
							dest: '<%= project.dist %>/js/built.js'
					},
					cssBuilt: {
							src: '<%= project.src %>/css/*.css',
							dest: '<%= project.dist %>/css/built.css'
					} 
				},
				cssmin: {
					combine: {
						files: {
							'<%= project.dist %>/css/built.min.css': ['<%= project.dist %>/css/built.css']
						}
					}
				},
				uglify: {
					options: {
						compress: {
							drop_console: true
						}
					},
					js: {
						files: {
								'<%= project.dist %>/js/built.min.js': ['<%= project.dist %>/js/built.js']
						}
					}
				},

				/**
				* Sass
				*/
				sass: {
					dev: {
						options: {
							style: '',
							banner: '<%= tag.banner %>',
							compass: true,
							sourcemap: 'none'
						},
						files: {
							'<%= project.src %>/css/project.css': '<%= project.css %>'
						}
					},
					devIe: {
						options: {
							style: '',
							banner: '<%= tag.banner %>',
							compass: true,
							sourcemap: 'none'
						},
						files: {
							'<%= projectIe.dist %>/css/ie.css': '<%= projectIe.css %>'
						}
					}
				},

				/**
				* Watch
				*/
				watch: {
					sass: {
						files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
						tasks: ['sass:dev', 'sass:devIe', 'concat:jsBuilt', 'concat:cssBuilt', 'cssmin', 'uglify:js']
					}
				}

		}); 
		/**
		 * Load Grunt plugins
		 */
		require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

		/**
		* Default task
		* Run `grunt` on the command line
		*/
		grunt.registerTask('default', [
			'sass:dev',
			'sass:devIe',
			'concat:cssBuilt', 
			'concat:jsBuilt', 
			'uglify:js',
			'cssmin',
			'watch'
		]);
		
};
