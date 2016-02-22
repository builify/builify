import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import watchify from 'watchify';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import notify from 'gulp-notify';
import streamify from 'gulp-streamify';
import { logger, LOGGER } from './logger';

var gulpConfig = require('./config.json');
var dependencies = gulpConfig.dependencies;

export default function (options) {
  var appBundler = browserify({
    entries: [options.src],
    extensions: [
      '.jsx',
      '.jsx',
      '.json'
    ],
    transform: [
      'babelify'
    ],
    cache: {},
    packageCache: {},
    debug: options.development,
    fullPaths: options.development
  });

  (options.development ? dependencies : []).forEach(function (dep) {
    appBundler.external(dep);
  });

  var rebundle = function () {
    var start = Date.now();

    logger(LOGGER.START, LOGGER.TYPE.APPLICATION);

    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        logger(LOGGER.END, LOGGER.TYPE.APPLICATION, start);
      }));
  };

  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  rebundle();

  if (!options.development) {
    dependencies.splice(dependencies.indexOf('react-addons'), 1);
  }

  if (options.development) {
    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });

    var start = new Date();

    logger(LOGGER.START, LOGGER.TYPE.VENDORS, start);

    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        logger(LOGGER.END, LOGGER.TYPE.VENDORS, start);
      }));
  }
};
