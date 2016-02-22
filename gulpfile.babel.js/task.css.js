import gulp from 'gulp';
import watch from 'gulp-watch';
import sass from 'gulp-sass';
import notify from 'gulp-notify';
import { logger, LOGGER } from './logger';

export default function (options) {
  if (options.development) {
    function developmentStylesheetBuild () {
      const timeStart = new Date();

      logger(LOGGER.START, LOGGER.TYPE.CSS);

      gulp.src(options.src)
        .pipe(sass())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          logger(LOGGER.END, LOGGER.TYPE.CSS, timeStart);
        }));
    }

    developmentStylesheetBuild();

    watch('./Application/Styles/**/*.scss', developmentStylesheetBuild);
  }
}
