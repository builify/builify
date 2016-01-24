import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import watchify from 'watchify';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import streamify from 'gulp-streamify';
import notify from 'gulp-notify';
import cssmin from 'gulp-cssmin';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import jade from 'gulp-jade';
import plumber from 'gulp-plumber';
import watch from 'gulp-watch';
import browserSync from 'browser-sync';

const LOGGER = {
  START: 0,
  END: 1,

  TYPE: {
    APPLICATION: 'Application',
    SERVER: 'Server',
    HTML: 'HTML',
    CSS: 'Stylesheet'
  }
};

function logger (type, target, timeStart = 0) {
  let text = null;
  let startMessageString = null;
  let endMessageString = null;

  switch (target) {
    case LOGGER.TYPE.SERVER:
      startMessageString = 'Starting server';
      endMessageString = 'Server started in';
      break;

    default:
      startMessageString = 'Building bundle';
      endMessageString = 'Bundle built in';
      break;
  }

  if (type === LOGGER.START) {
    text = gutil.colors.bgBlue(`[${target}]${startMessageString}`);
  } else if (type === LOGGER.END) {
    text = gutil.colors.bgGreen(`[${target}]${endMessageString} ${(Date.now() - timeStart)}ms`);
  }

  if (text !== null) {
    gutil.log(text);
  }
}

var tasks = {};

var dependencies = [
  'react',
  'react-dom',
  'react/addons',
  'react-color',
  'react-select',
  'react-selectize',
  'react-redux',
  'react-custom-scrollbars',
  'react-dropzone-component',
  'redux',
  'redux-thunk',
  'strip-json-comments',
  'classnames',
  'lodash',
  'jszip',
  'sortablejs',
  'js-search',
  'ttstylesheet',
  'ttkeymirror'
];

// Rewrite gulp.src for better error handling.
var gulpSrc = gulp.src;
gulp.src = function () {
  return gulpSrc.apply(gulp, arguments)
    .pipe(plumber(function (error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }));
};

function createJavaScript (options) {
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
      }))
      .pipe(browserSync.stream({ match: '**/*.js' }));
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
    gutil.log(gutil.colors.bgGreen('[VENDORS]Building bundle.'));

    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        gutil.log(gutil.colors.bgGreen('[VENDORS]Bundle built in ' + (Date.now() - start) + 'ms'));
      }));
  }
};

function createStylesheets (options) {
  if (options.development) {
    tasks.stylesheet = function () {
      const timeStart = new Date();

      logger(LOGGER.START, LOGGER.TYPE.CSS);

      gulp.src(options.src)
        .pipe(sass())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          logger(LOGGER.END, LOGGER.TYPE.CSS, timeStart);
        }))
        .pipe(browserSync.stream({ match: '**/*.css' }));
    };

    tasks.stylesheet();
    watch('./Application/Styles/**/*.scss', tasks.stylesheet);
  }
}

function createIFrameStylesheet (options) {
  if (options.development) {
    tasks.stylesheet = function () {
      var start = new Date();
      gutil.log(gutil.colors.bgGreen('[IFRAME STYLEHSEET]Building bundle.'));

      gulp.src(options.src)
        .pipe(sass())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          gutil.log(
            gutil.colors.bgGreen('[IFRAME STYLEHSEET]Bundle built in ' + (Date.now() - start) + 'ms')
          );
        }))
        .pipe(browserSync.stream({ match: '**/*.css' }));
    };

    tasks.stylesheet();
    watch('./Application/IFrameStyles/**/*.scss', tasks.stylesheet);
  }
}

function createHTML (options) {
  if (options.development) {
    tasks.html = function () {
      const timeStart = new Date();

      logger(LOGGER.START, LOGGER.TYPE.HTML);

      gulp.src(options.src)
        .pipe(jade())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          logger(LOGGER.END, LOGGER.TYPE.HTML, timeStart);
        }));
    };

    tasks.html();
    watch('./Application/Jade/**/*.jade', tasks.html);
  }
}

function createServer (options) {
  const timeStart = new Date();

  logger(LOGGER.START, LOGGER.TYPE.SERVER);

  browserSync.create().init({
    logPrefix: 'BrowserSync',
    browser: ['google chrome'],
    open: 'external',
    notify: false,
    server: {
      baseDir: options.src
    }
  });

  watch('./DevelopmentBuild/*.html').on('change', browserSync.reload);

  logger(LOGGER.END, LOGGER.TYPE.SERVER, timeStart);
}

gulp.task('default', function () {
  createHTML({
    development: true,
    src: './Application/Jade/*.jade',
    dest: './DevelopmentBuild'
  });

  createStylesheets({
    development: true,
    src: './Application/Styles/Stylesheet.scss',
    dest: './DevelopmentBuild'
  });

  createIFrameStylesheet({
    development: true,
    src: './Application/IFrameStyles/IFrameStylesheet.scss',
    dest: './DevelopmentBuild'
  });

  createJavaScript({
    development: true,
    src: './Application/JavaScript/Main.jsx',
    dest: './DevelopmentBuild'
  });

  createServer({
    src: './DevelopmentBuild'
  });
});
