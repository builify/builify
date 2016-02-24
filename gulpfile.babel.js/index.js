import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import createStylesheets from './task.css';
import { browserSync, createServer } from './task.server';
import createJavaScript from './task.javascript';
import createHTML from './task.html';

const gulpConfig = require('./config.json');

// Rewrite gulp.src for better error handling.
var gulpSrc = gulp.src;
gulp.src = function () {
  return gulpSrc.apply(gulp, arguments)
    .pipe(plumber(function (error) {
      const { plugin, message } = error;
      gutil.log(gutil.colors.red(`Error (${plugin}): ${message}`));
      this.emit('end');
    }));
};

gulp.task('default', function () {
  const isDevelopment = true;

  createServer({
    src: path.join(__dirname, '../', gulpConfig.root.development.dest)
  });

  createHTML({
    development: isDevelopment,
    src: path.join(__dirname, '../', gulpConfig.tasks.html.src),
    dest: path.join(__dirname, '../', gulpConfig.root.development.dest)
  });

  createStylesheets({
    development: isDevelopment,
    src: path.join(__dirname, '../', gulpConfig.tasks.css.src),
    canvassrc: path.join(__dirname, '../', gulpConfig.tasks.canvascss.src),
    dest: path.join(__dirname, '../', gulpConfig.root.development.dest)
  });

  createJavaScript({
    development: isDevelopment,
    src: path.join(__dirname, '../', gulpConfig.tasks.js.src),
    dest: path.join(__dirname, '../', gulpConfig.root.development.dest),
    bs: browserSync
  });
});
