const path = require('path');
const {test} = require('tap');
const vinylFS = require('vinyl-fs');
const gulpIf = require('gulp-if');
const through2 = require('through2');

const gulpSkipFile = require('.');

function resolvePaths(...paths) {
	const obj = {};

	for (const p of paths) {
		obj[path.resolve(p)] = true;
	}

	return obj;
}

test('default', t => {
	const allFiles = resolvePaths('fixtures/index.js', 'fixtures/index.ts');
	const afterFiles = resolvePaths('fixtures/index.js');

	function listFiles(objs) {
		return through2.obj((file, encoding, callback) => {
			t.equal(objs[file.path], true);
			delete objs[file.path];
			return callback(null, file);
		});
	}

	return new Promise(resolve => {
		function onEnd() {
			setTimeout(() => {
				t.same(allFiles, {});
				t.same(afterFiles, {});
				t.same(allFiles, {});
				resolve();
			}, 1000);
		}

		vinylFS.src(['fixtures/index.{js,ts}'])
			.pipe(listFiles(allFiles))
			.pipe(gulpIf(/\.ts$/, gulpSkipFile()))
			.pipe(listFiles(afterFiles))
			.pipe(gulpSkipFile())
			.pipe(listFiles({}))
			.pipe(vinylFS.dest('fixtures/build'))
			.on('end', onEnd);
	});
});
