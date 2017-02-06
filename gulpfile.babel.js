import config from './config';
import pckg from './package';
import gulp from 'gulp';
import path from 'path';
import browserify from 'browserify';
import envify from 'loose-envify/custom';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sequence from 'run-sequence';
import rimraf from 'rimraf-promise';
import server from 'browser-sync';
import $rev from 'gulp-rev';
import $replace from 'gulp-replace';
import $size from 'gulp-size';
import $util from 'gulp-util';
import $plumber from 'gulp-plumber';
import $sass from 'gulp-sass';
import $hint from 'gulp-htmlhint';
import $cleanCSS from 'gulp-clean-css';
import $autoprefixer from 'gulp-autoprefixer';
import $uglify from 'gulp-uglify';
import $imagemin from 'gulp-imagemin';
import $changed from 'gulp-changed';
import {
  has as _has,
  keys as _keys,
  isEmpty as _isEmpty,
  endsWith as _endsWith
} from 'lodash';

// Set environment variable.
process.env.NODE_ENV = config.env.debug ? 'development' : 'production';

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

// Images task.
gulp.task('images', () => {
  return gulp.src(config.images.entry)
    .pipe($changed(config.images.output))
    .pipe($imagemin())
    .pipe($size({ title: '[files:template]', gzip: true }))
    .pipe(gulp.dest(config.images.output));
});

// Compiles and deploys main stylesheet.
gulp.task('stylesheet:main', () => {
  if (config.env.debug) {
    return gulp.src(config.stylesheets.main.entry)
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
      .pipe($size({ title: '[stylesheet:main]', gzip: true }))
      .pipe(gulp.dest(config.stylesheets.main.output))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  } else {
    return gulp.src(config.stylesheets.main.entry)
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
      .pipe($cleanCSS({ compatibility: 'ie8' }))
      .pipe($autoprefixer(config.stylesheets.autoprefixer))
      .pipe($size({ title: '[stylesheet:main]', gzip: true }))
      .pipe(gulp.dest(config.stylesheets.main.output));
  }
});

// Compiles and deploys canvas stylesheet.
gulp.task('stylesheet:canvas', () => {
  if (config.env.debug) {
    return gulp.src(config.stylesheets.canvas.entry)
      .pipe($sass(config.stylesheets.sass).on('error', $sass.logError))
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

// Compiles and deploys template thumbnail files.
gulp.task('files:template:thumbnail', () => {
  return gulp.src(config.files.template.thumbnail.entry)
    .pipe($changed(config.images.output))
    .pipe($imagemin())
    .pipe($size({ title: '[files:template:thumbnail]', gzip: true }))
    .pipe(gulp.dest(config.files.template.thumbnail.output));
});

// Compiles and deploys HTML files.
gulp.task('html', () => {
  if (config.env.debug) {
    return gulp.src(config.html.entry)
      .pipe($hint())
      .pipe($size({ title: '[html]', gzip: true }))
      .pipe(gulp.dest(config.html.output));
  } else {
    return gulp.src(config.html.entry)
      .pipe($size({ title: '[html]', gzip: true }))
      .pipe(gulp.dest(config.html.output));
  }
});

// Revision
gulp.task('rev', (callback) => {
  gulp.src(config.rev.entry)
    .pipe($rev())
    .pipe(gulp.dest(config.rev.output))
    .pipe($rev.manifest(config.rev.manifestFile))
    .pipe(gulp.dest(config.rev.output))
    .on('end', () => {
      const manifestFile = path.join(config.rev.output, config.rev.manifestFile);
      const manifest = require(manifestFile);
      let removables = [];
      let pattern = (_keys(manifest)).join('|');

      for (let v in manifest) {
        if (v !== manifest[v]) {
          removables.push(path.join(config.rev.output, v));
        }
      }

      removables.push(manifestFile);

      rimraf(`{${removables.join(',')}}`)
        .then(() => {
          if (!_isEmpty(config.cdn)) {
            gulp.src(config.rev.replace)
              .pipe($replace(new RegExp(`((?:\\.?\\.\\/?)+)?([\\/\\da-z\\.-]+)(${pattern})`, 'gi'), (m) => {
                let k = m.match(new RegExp(pattern, 'i'))[0];
                let v = manifest[k];
                return m.replace(k, v).replace(/^((?:\.?\.?\/?)+)?/, _endsWith(config.cdn, '/') ? config.cdn : `${config.cdn}/`);
              }))
              .pipe(gulp.dest(config.rev.output))
              .on('end', callback)
              .on('error', callback);
          } else {
            gulp.src(config.rev.replace)
              .pipe($replace(new RegExp(`${pattern}`, 'gi'), (m) => (manifest[m])))
              .pipe(gulp.dest(config.rev.output))
              .on('end', callback)
              .on('error', callback);
          }
        });
    })
    .on('error', callback);
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
  .transform('babelify', {
    babelrc: false,
    presets: ["latest", "stage-0", "react"],
    plugins: ["add-module-exports"]
  })
  .transform(envify({
    _: 'purge',
    NODE_ENV: config.env.debug ? 'development' : 'production',
    DEMO: config.env.demo ? true : false,
    VERSION: pckg.version
  }))
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
      .pipe(gulp.dest(config.javascripts.main.output));
  }
});

// Watch for file changes.
gulp.task('watch', () => {
  if (_has(config, 'watch.entries')) {
    config.watch.entries.map((entry) => {
      gulp.watch(entry.files, { cwd: config.sourceDir }, entry.tasks);
    });
  }

  gulp.watch(['public/**/*.html', 'public/**/*.js']).on('change', () => {
    browserSync.reload('*.html');
  });
});

gulp.task('revision', () => {
  const seq = ['rev'];
  sequence(...seq);
});

gulp.task('default', () => {
  let seq = [
    'html',
    'images',
    'files',
    'files:template',
    'files:template:thumbnail',
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
