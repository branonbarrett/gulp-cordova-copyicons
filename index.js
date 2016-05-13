'use strict';

/**
 * Copies contents of a directory to the .cordova/platforms/<platform-name>/res directory
 * Ideally used to copy all res icons to be packaged in a cordova build
 *
 * @author Branon Barrett	  <branonbarrett@gmail.com>
 * @since  13 May 2016
 */

// module dependencies
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var through = require('through2');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var Q = require('q');
var cordovaLib = require('cordova-lib').cordova;
var cordova = cordovaLib.raw;



// export the module
module.exports = function (src, options) {
	options = options || { platform: 'android' };

	return through.obj(function (file, enc, cb) {
		// Change the working directory
		process.env.PWD = file.path;
		cb();
	}, function (cb) {
		var self = this;
		var platformPath = path.join(cordovaLib.findProjectRoot(), 'platforms', options.platform);
		var resPath = platformPath + '/res';

		Q.fcall(function () {
			return fs.existsSync(platformPath);
		}).then(function (exists) {
			if (!exists) {
				// Add the android platform if it does not exist
				gutil.log('gulp-cordova-copyicons', 'adding ' +  options.platform + ' platform');
				return cordova.platforms('add', options.platform + (options.version ? ('@' + options.version) : ''));
			}
		}).then(function () {
			// copy the res files
			ncp(src, resPath, function (err) {
				gutil.log('gulp-cordova-copyicons', 'copying res directory contents');
				if (err) {
					throw err;
				}
				cb();
			});
		}).catch(function (err) {
			console.log(err);
			// Return an error if something happened
			cb(new gutil.PluginError('gulp-cordova-copyicons', err.message));
		});
	});

};
