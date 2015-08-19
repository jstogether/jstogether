import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

import {sass as config} from '../config';
import errorHandler from './errorHandler';


let sassTask = () => {
  return gulp.src(config.watch)
  	.pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', errorHandler)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.dest));
};

gulp.task('sass', sassTask);

export default sassTask;