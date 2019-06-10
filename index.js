'use strict';

const {Transform} = require('stream');

function gulpSkipFile() {
	return new Transform({
		objectMode: true,
		transform(chunk, encoding, callback) {
			/* Skip everything given to this module. */
			callback();
		}
	});
}

module.exports = gulpSkipFile;
