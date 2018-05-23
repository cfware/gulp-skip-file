import path from 'path';
import test from 'ava';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import through2 from 'through2';

import gulpSkipFile from '.';

function resolvePaths(...paths) {
	const obj = {};

	paths.forEach(p => {
		obj[path.resolve(p)] = true;
	});

	return obj;
}

test('default', t => {
	const allFiles = resolvePaths('fixtures/index.js', 'fixtures/index.ts');
	const afterFiles = resolvePaths('fixtures/index.js');

	function listFiles(objs) {
		return through2.obj((file, encoding, callback) => {
			t.is(objs[file.path], true);
			delete objs[file.path];
			return callback(null, file);
		});
	}

	return new Promise(resolve => {
		function onEnd() {
			setTimeout(() => {
				t.deepEqual(allFiles, {});
				t.deepEqual(afterFiles, {});
				t.deepEqual(allFiles, {});
				resolve();
			}, 1000);
		}

		gulp.src(['fixtures/index.{js,ts}'])
			.pipe(listFiles(allFiles))
			.pipe(gulpIf(/\.ts$/, gulpSkipFile()))
			.pipe(listFiles(afterFiles))
			.pipe(gulpSkipFile())
			.pipe(listFiles({}))
			.pipe(gulp.dest('fixtures/build'))
			.on('end', onEnd);
	});
});
