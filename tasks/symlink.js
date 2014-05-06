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
				regex: /(public\/components)(\/.+)(\/templates)(\/.+dust)/g,
				backreference: 'public/templates/components$2$4'
			}, {
				expand: true,
				overwrite: true,
				flatten: false,
				cwd: 'public/components/',
				src: ['*/*/*/*/*.properties'],
				regex: /(public\/components)(\/.+)(\/locales)(\/[A-Z]{2}\/[a-z]{2})(\/.+properties)/g,
				backreference: 'locales$4/components$2$5'
			}]
		}
	};
};