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

    function canvasStylesheetBuild () {
      const timeStart = new Date();

      logger(LOGGER.START, LOGGER.TYPE.CANVASCSS);

      gulp.src(options.canvassrc)
        .pipe(sass())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          logger(LOGGER.END, LOGGER.TYPE.CANVASCSS, timeStart);
        }));
    }

    developmentStylesheetBuild();
    canvasStylesheetBuild();

    watch('./Application/Styles/**/*.scss', developmentStylesheetBuild);
    watch('./Application/StylesCanvas/**/*.scss', canvasStylesheetBuild);
  }
}
