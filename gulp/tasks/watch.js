import gulp from 'gulp';
import config from '../config';

let watchTask = () => {
	gulp.watch(config.sass.watch, ['sass']);
	gulp.watch(config.server.watch, ['server']);
	gulp.watch(config.browserify.watch, ['browserify']);
};

gulp.task('watch', ['server', 'browserify'], watchTask);

export default watchTask;