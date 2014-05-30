'use strict';
var path = require('path');

module.exports = function bower(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-symlink');

	// Options
	return {
		options: {
			overwrite: true
		},
		expanded: {
			files: [{
				expand: true,
				overwrite: true,
				flatten: false,
				cwd: 'public/components',
				src: ['*/*/*.dust'],
				rename: function rename(_dest, src) {
					var dest = src.replace(/(.+)(\/templates)(\/.+dust)/g, 'public/templates/components/$1$3');
					return dest;
				}
			}, {
				expand: true,
				overwrite: true,
				flatten: false,
				cwd: 'public/components/',
				src: ['*/*/*/*/*.properties'],
				rename: function rename(_dest, src) {
					var dest = src.replace(/(.+)(\/locales)(\/[A-Z]{2}\/[a-z]{2})(\/.+properties)/g, 'locales$3/components/$1$4');
					return dest;
				}
			}]
		}
	};
};