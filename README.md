# gulp-skip-file

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

Gulp plugin to skip files.

### Install gulp-skip-file

This module requires node.js 6 or above.

```sh
npm i --save-dev gulp-skip-file
```

## Usage

This is a pointless example as you can simply use `!` patterns on `gulp.src`.
The purpose of this module is to skip files added to a stream by an outside
module, where you do not control the call to `gulp.src`.

```js
'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpSkipFile = require('gulp-skip-file');

gulp.task('default', function() {
	return gulp.src('src/**')
		.pipe(gulpIf(/\.ts/, gulpSkipFile()))
		.pipe(gulp.dest('build'));
});
```

As shown gulpIf or another similar function should be used to restrict which
files are skipped.

## Running tests

Tests are provided by xo and ava.

```sh
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/gulp-skip-file.svg
[npm-url]: https://npmjs.org/package/gulp-skip-file
[travis-image]: https://travis-ci.org/cfware/gulp-skip-file.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/gulp-skip-file
[gk-image]: https://badges.greenkeeper.io/cfware/gulp-skip-file.svg
[downloads-image]: https://img.shields.io/npm/dm/gulp-skip-file.svg
[downloads-url]: https://npmjs.org/package/gulp-skip-file
[license-image]: https://img.shields.io/github/license/cfware/gulp-skip-file.svg
