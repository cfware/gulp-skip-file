'use strict';

const through2 = require('through2');

function gulpSkipFile() {
	return through2.obj((file, encoding, callback) => {
		/* Skip everything given to this module. */
		return callback();
	});
}

module.exports = gulpSkipFile;
