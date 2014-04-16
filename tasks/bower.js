'use strict';
var path = require('path');

module.exports = function bower(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-bower-task');

	// Options
	return {
		install: {
			//just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
			options: {
				targetDir: './lib',
				layout: function(type, component, src) {
					var loc, newpath;
					console.log("type, component, src ::: ", type, component, src);
					if (type === "properties") {
						//what is the {CC}/{lc} ?
						loc = src.match(/[A-Z]{2}\/[a-z]{2}/g);
						newpath = "../locales/" + loc + "/components/" + component + "/";
					} else if (type === "dust") {
						newpath = "../public/templates/components/" + component + "/";
					}
					return path.join(newpath);
				},
				install: true,
				verbose: true,
				cleanTargetDir: false,
				cleanBowerDir: false,
				bowerOptions: {}
			}
		}
	};
};
