var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

var tasks = {};

var dependencies = [
  'react',
  'react-dom',
  'react/addons',
  'react-color',
  'react-select',
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
  'js-search'
];

// Rewrite gulp.src for better error handling.
var gulp_src = gulp.src;
gulp.src = function () {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function (error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }));
};

function createJavaScript (options) {
  var appBundler = browserify({
    entries: [options.src],
    extensions: ['.jsx', '.jsx', '.json'],
    transform: [
      babelify.configure({externalHelpers: true, stage: 0})
    ],
    debug: options.development,
    cache: {},
    packageCache: {},
    fullPaths: options.development
  });

  (options.development ? dependencies : []).forEach(function (dep) {
    appBundler.external(dep);
  });

  var rebundle = function () {
    var start = Date.now();

    gutil.log(gutil.colors.bgGreen('[APPLICATION]Building bundle.'));
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        gutil.log(gutil.colors.bgGreen('[APPLICATION]Bundle built in ' + (Date.now() - start) + 'ms'));
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
      var start = new Date();
      gutil.log(gutil.colors.bgGreen('[STYLEHSEET]Building bundle.'));

      gulp.src(options.src)
        .pipe(sass())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          gutil.log(gutil.colors.bgGreen('[STYLEHSEET]Bundle built in ' + (Date.now() - start) + 'ms'));
        }))
        .pipe(browserSync.stream({ match: '**/*.css' }));
    };

    tasks.stylesheet();
    watch('./Application/Styles/**/*.scss', tasks.stylesheet);

  } else {
    gulp.src(options.src)
      .pipe(sass())
      .pipe(cssmin())
      .pipe(gulp.dest(options.dest));
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
          gutil.log(gutil.colors.bgGreen('[IFRAME STYLEHSEET]Bundle built in ' + (Date.now() - start) + 'ms'));
        }))
        .pipe(browserSync.stream({ match: '**/*.css' }));
    };

    tasks.stylesheet();
    watch('./Application/IFrameStyles/**/*.scss', tasks.stylesheet);

  } else {
    gulp.src(options.src)
      .pipe(sass())
      .pipe(cssmin())
      .pipe(gulp.dest(options.dest));
  }
}

function createHTML (options) {
  if (options.development) {
    tasks.html = function () {
      var start = new Date();
      gutil.log(gutil.colors.bgGreen('[HTML]Building bundle.'));

      gulp.src(options.src)
        .pipe(jade())
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          gutil.log(gutil.colors.bgGreen('[HTML]Bundle built in ' + (Date.now() - start) + 'ms'));
        }));
    };

    tasks.html();
    watch('./Application/Jade/**/*.jade', tasks.html);
  }
}

function createServer (options) {
  browserSync.init({
    logPrefix: 'BrowserSync',
    browser: ['google chrome'],
    open: 'external',
    notify: false,
    server: {
      baseDir: options.src
    }
  });

  watch('./DevelopmentBuild/*.html').on('change', browserSync.reload);
}

gulp.task('default', function () {
  process.env.NODE_ENV = 'development';

  createServer({
    src: './DevelopmentBuild'
  });

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
  })

  createJavaScript({
    development: true,
    src: './Application/JavaScript/Main.jsx',
    dest: './DevelopmentBuild'
  });
});
