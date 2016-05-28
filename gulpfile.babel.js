import config from './config';
import has from 'lodash/has';
import gulp from 'gulp';
import sequence from 'run-sequence';
import rimraf from 'rimraf-promise';
import browserify from 'browserify';
import envify from 'loose-envify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import server from 'browser-sync';
import w3cjs from 'w3cjs';
import mapStream from 'map-stream';
import $jade from 'gulp-jade';
import $size from 'gulp-size';
import $util from 'gulp-util';
import $plumber from 'gulp-plumber';
import $sass from 'gulp-sass';
import $sourcemaps from 'gulp-sourcemaps';
import $uglify from 'gulp-uglify';
import $cleanCSS from 'gulp-clean-css';

// Set environment variable.
if (config.env.debug) {
  process.env.NODE_ENV = 'development';
} else {
  process.env.NODE_ENV = 'production';
}

// HTML validation with W3C standards.
function validate (file){
  const validationFeedback = (file) => {
    return result => {
      var messages = result.messages;
      //exclude the info messages
      messages = messages.filter(message => message.type !== 'info');
      if (messages && messages.length) {
        $util.log($util.colors.red(file.path));
        messages.forEach(message => {
          $util.log($util.colors.red(message.message));
          $util.log(message.extract);
        });
      } else {
        $util.log(file.path + $util.colors.green(' [  OK  ]'));
      }
    };
  };

  w3cjs.validate({
    input: file.contents,
    callback: validationFeedback(file)
  });
}

// Create browserSync.
const browserSync = server.create();

// Rewrite gulp.src for better error handling.
var gulpSrc = gulp.src;
gulp.src = function () {
  return gulpSrc(...arguments)
    .pipe($plumber((error) => {
      const { plugin, message } = error;
      $util.log($util.colors.red(`Error (${plugin}): ${message}`));
      this.emit('end');
    }));
};

// Create server.
gulp.task('server', () => {
  browserSync.init(config.server);
});

// Compiles and deploys main stylesheet.
gulp.task('stylesheet:main', () => {
  if (config.env.debug) {
    return gulp.src(config.stylesheets.main.entry)
      .pipe($sourcemaps.init())
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
      .pipe($sourcemaps.write('/'))
      .pipe($size({ title: '[stylesheet:main]', gzip: true }))
      .pipe(gulp.dest(config.stylesheets.main.output))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  } else {
    return gulp.src(config.stylesheets.main.entry)
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
      .pipe($cleanCSS({ compatibility: 'ie8' }))
      .pipe($size({ title: '[stylesheet:main]', gzip: true }))
      .pipe(gulp.dest(config.stylesheets.main.output));
  }
});

// Compiles and deploys canvas stylesheet.
gulp.task('stylesheet:canvas', () => {
  if (config.env.debug) {
    return gulp.src(config.stylesheets.canvas.entry)
      .pipe($sourcemaps.init())
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
      .pipe($sourcemaps.write('/'))
      .pipe($size({ title: '[stylesheet:canvas]', gzip: true }))
      .pipe(gulp.dest(config.stylesheets.canvas.output))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  } else {
    return gulp.src(config.stylesheets.canvas.entry)
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
      .pipe($cleanCSS({ compatibility: 'ie8' }))
      .pipe($size({ title: '[stylesheet:canvas]', gzip: true }))
      .pipe(gulp.dest(config.stylesheets.canvas.output));
  }
});

// Compiles and deploys files.
gulp.task('files', () => {
  return gulp.src(config.files.entry)
    .pipe($size({ title: '[files]', gzip: true }))
    .pipe(gulp.dest(config.files.output));
});

// Compiles and deploys template files.
gulp.task('files:template', () => {
  return gulp.src(config.files.template.entry)
    .pipe($size({ title: '[files:template]', gzip: true }))
    .pipe(gulp.dest(config.files.template.output));
});

// Compiles and deploys HTML files.
gulp.task('html', () => {
  if (config.env.debug) {
    return gulp.src(config.html.entry)
      .pipe($jade())
      .pipe($size({ title: '[html]', gzip: true }))
      .pipe(gulp.dest(config.html.output));
  } else {
    return gulp.src(config.html.entry)
      .pipe($jade())
      .pipe($size({ title: '[html]', gzip: true }))
      .pipe(gulp.dest(config.html.output));
  }
});

// Compiles and deploys vendor javascript file.
gulp.task('javascript:vendor', () => {
  const b = browserify({
    debug: config.env.debug,
    transform: envify
  });

  config.vendors.forEach(lib => {
    b.require(lib);
  });

  if (config.env.debug) {
    b.bundle()
      .on('error', $util.log)
      .pipe(source('vendors.js'))
      .pipe(buffer())
      .pipe($size({ title: '[javascript:vendor]', gzip: true }))
      .pipe(gulp.dest(config.javascripts.vendor.output))
      .pipe(browserSync.stream({ match: '**/*.js' }));
  } else {
    b.bundle()
      .on('error', $util.log)
      .pipe(source('vendors.js'))
      .pipe(buffer())
      .pipe($uglify())
      .pipe($size({ title: '[javascript:vendor]', gzip: true }))
      .pipe(gulp.dest(config.javascripts.vendor.output));
  }
});

// Compiles and deploys main javascript file.
gulp.task('javascript:main', () => {
  var appBundler = browserify({
    entries: [
      config.javascripts.main.entry
    ],
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ],
    cache: {},
    packageCache: {},
    debug: config.env.debug,
    fullPaths: config.env.debug
  })
  .transform(babelify)
  .transform(envify)
  .external(config.vendors); // Specify all vendors as external source

  const rebundle = () => {
    appBundler.bundle()
      .on('error', $util.log)
      .pipe(source('application.js'))
      .pipe(buffer())
      .pipe($size({ title: '[javascript:main]', gzip: true }))
      .pipe(gulp.dest(config.javascripts.main.output))
      .pipe(browserSync.stream({ match: '**/*.js' }));
  };

  if (config.env.debug) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);

    rebundle();
  } else {
    appBundler.bundle()
      .on('error', $util.log)
      .pipe(source('application.js'))
      .pipe(buffer())
      .pipe($uglify())
      .pipe($size({ title: '[javascript:main]', gzip: true }))
      .pipe(gulp.dest(config.javascripts.main.output))
      .pipe(browserSync.stream({ match: '**/*.js' }));
  }
});

// Watch for file changes.
gulp.task('watch', () => {
  if (has(config, 'watch.entries')) {
    config.watch.entries.map((entry) => {
      gulp.watch(entry.files, { cwd: config.sourceDir }, entry.tasks);
    });
  }

  gulp.watch(['public/**/*.html', 'public/**/*.js']).on('change', () => {
    browserSync.reload('*.html');
  });
});

gulp.task('default', () => {
  let seq = [
    'html',
    'files',
    'files:template',
    'stylesheet:main',
    'stylesheet:canvas',
    'javascript:vendor',
    'javascript:main'
  ];

  if (config.env.debug) {
    seq.push('watch');
    seq.push('server');
  }

  rimraf(config.buildDir)
    .then(() => {
      sequence(...seq);
    }, (error) => {
      throw error;
    });
});
