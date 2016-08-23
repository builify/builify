import path from 'path';
import { env as $env } from 'gulp-util';

// Common paths used throughout the Gulp pipeline.
const currentDir = __dirname;
const sourceDir = path.join(currentDir, 'source');
const buildDir = path.join(currentDir, 'public');
const modulesDir = path.join(currentDir, 'node_modules');

// Supported CLI options.
const env = {
  debug: !!($env.env === 'debug' || process.env.NODE_ENV === 'development'),
  demo: !!($env.env === 'demo')
};

export default {
  env: env,
  cdn: ((process.env.CIRCLE_BRANCH === 'master') && process.env.CDN_PATH) || '',

  buildDir: buildDir,
  sourceDir: sourceDir,
  modulesDir: modulesDir,

  server: {
    logPrefix: 'BrowserSync',
    browser: ['google chrome'],
    open: 'external',
    notify: false,
    reloadDebounce: 1000,
    server: {
      baseDir: buildDir
    }
  },

  images: {
    entry: path.join(sourceDir, 'images', '**', '*.{png,jpg,icon,svg,jpeg}'),
    output: path.join(buildDir, 'assets', 'static')
  },

  files: {
    entry: path.join(sourceDir, 'files', '**/*.*'),
    output: path.join(buildDir, 'assets', 'static'),

    template: {
      entry: path.join(currentDir, 'data', 'template', 'assets', '**/*.*'),
      output: path.join(buildDir, 'assets', 'template')
    }
  },

  html: {
    entry: path.join(sourceDir, 'html', '*.{jade,html}'),
    output: path.join(buildDir)
  },

  javascripts: {
    vendor: {
      output: path.join(buildDir, 'assets', 'static')
    },
    main: {
      entry: path.join(sourceDir, 'javascript', 'main.jsx'),
      output: path.join(buildDir, 'assets', 'static')
    }
  },

  stylesheets: {
    main: {
      entry: path.join(sourceDir, 'stylesheets', 'main', 'stylesheet.scss'),
      output: path.join(buildDir, 'assets', 'static')
    },

    canvas: {
      entry: path.join(sourceDir, 'stylesheets', 'canvas', 'canvas-stylesheet.scss'),
      output: path.join(buildDir, 'assets', 'static')
    },

    sass: {
      outputStyle: env.debug ? 'nested' : 'compressed',
      precision: 3,
      includePaths: [
        path.join(sourceDir, 'stylesheets', 'main')
      ]
    },

    autoprefixer: [
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24', // Firefox 24 is the latest ESR
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6'
    ]
  },

  rev: {
    entry: path.join(buildDir, '**', '*.{css,js,eot,ttf,woff,woff2,ogv,mp4}'),
    output: buildDir,
    manifestFile: 'rev-manifest.json',
    replace: path.join(buildDir, '**', '*.{css,scss,sass,js,html}')
  },

  watch: {
    entries: [{
      files: path.join('images', '**', '*.*'),
      tasks: ['images']
    }, {
      files: path.join('stylesheets', 'main', '**', '*.{css,scss,sass}'),
      tasks: ['stylesheet:main']
    }, {
      files: path.join('stylesheets', 'canvas', '**', '*.{css,scss,sass}'),
      tasks: ['stylesheet:canvas']
    },{
      files: path.join('html', '**', '*.{jade,html}'),
      tasks: ['html']
    }]
  },

  vendors: [
    'react',
    'react-dom',
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
    'querystring',
    'file-saver',
    'mime',
    'moment',
    'sortablejs',
    'tt-event-emitter',
    'tt-classnames',
    'tt-stylesheet',
    'ttkeymirror'
  ]
};
