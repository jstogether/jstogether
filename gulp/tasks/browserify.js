
import gulp from 'gulp';
import browserify from 'browserify';
import {browserify as config} from '../config';
import errorHandler from './errorHandler';
import stream from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('browserify', () => {
	let b = browserify(config);

	let bundle = () => {
		return b.bundle()
			.on('error', errorHandler)
			.pipe(stream(config.outputName))
			.pipe(gulp.dest('./public'));
	};

	b.on('update', bundle);
	return bundle();
});