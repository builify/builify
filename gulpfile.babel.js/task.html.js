import gulp from 'gulp';
import watch from 'gulp-watch';
import jade from 'gulp-jade';
import notify from 'gulp-notify';
import { logger, LOGGER } from './logger';

export default function (options) {
  if (options.development) {
    function developmentHTMLBuild () {
      const timeStart = new Date();

      logger(LOGGER.START, LOGGER.TYPE.HTML);

      gulp.src(options.src)
        .pipe(jade())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          logger(LOGGER.END, LOGGER.TYPE.HTML, timeStart);
        }));
    };

    developmentHTMLBuild();

    watch('./Application/Jade/**/*.jade', developmentHTMLBuild);
  }
}
