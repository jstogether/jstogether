import gulp from 'gulp';
import browserifyTask from './browserify';

let watchifyTask = () => {
	return browserifyTask();
};

gulp.task('watchify', watchifyTask);

export default watchifyTask;