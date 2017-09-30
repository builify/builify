import path from 'path';
import { env as $env } from 'gulp-util';

// Common paths used throughout the Gulp pipeline.
const currentDir = path.join(__dirname.toLowerCase(), '..');
const sourceDir = path.join(currentDir, 'src');
const buildDir = path.join(currentDir, 'public');
const modulesDir = path.join(currentDir, 'node_modules');
const assetsPath = path.join(buildDir, 'assets');

// Supported CLI options.
const env = {
  debug: ($env.env === 'debug' || process.env.NODE_ENV === 'development'),
  demo: ($env.env === 'demo')
};

export default {
  env,
  cdn: ((process.env.CIRCLE_BRANCH === 'master') && process.env.CDN_PATH) || '',

  buildDir,
  sourceDir,
  modulesDir,

  server: {
    logPrefix: 'BrowserSync',
    open: 'local',
    notify: false,
    reloadDebounce: 1000,
    server: {
      baseDir: buildDir
    }
  },

  images: {
    entry: path.join(sourceDir, 'images', '**', '*.{png,jpg,ico,svg,jpeg,xml,json}'),
    output: path.join(assetsPath, 'static')
  },

  files: {
    entry: path.join(sourceDir, 'files', '**/*.*'),
    output: path.join(assetsPath, 'static'),

    template: {
      entry: path.join(sourceDir, 'template', 'assets', '/*.{js,css,png,jpg,jpeg}'),
      output: path.join(assetsPath, 'template'),

      thumbnail: {
        entry: path.join(sourceDir, 'template', 'thumbnails', '*.{jpg,jpeg,png}'),
        output: path.join(assetsPath, 'template', 'thumbnails')
      }
    }
  },

  html: {
    entry: path.join(sourceDir, 'html', '*.html'),
    output: path.join(buildDir)
  },

  javascripts: {
    vendor: {
      output: path.join(assetsPath, 'static')
    },
    main: {
      entry: path.join(sourceDir, 'javascript', 'main.jsx'),
      output: path.join(assetsPath, 'static')
    }
  },

  stylesheets: {
    main: {
      entry: path.join(sourceDir, 'stylesheets', 'main', 'stylesheet.scss'),
      output: path.join(assetsPath, 'static')
    },

    canvas: {
      entry: path.join(sourceDir, 'stylesheets', 'canvas', 'canvas-stylesheet.scss'),
      output: path.join(assetsPath, 'static')
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
    entry: [
      path.join(buildDir, '**', '{stylesheet,favicon,vendors,application,arkio.builify}.{ico,css,js,eot,ttf,woff,woff2,ogv,mp4}')
    ],
    output: buildDir,
    manifestFile: 'rev-manifest.json',
    replace: path.join(buildDir, '**', '*.{css,js,html}')
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
    }, {
      files: path.join('html', '**', '*.html'),
      tasks: ['html']
    }]
  },

  vendors: [
    // React
    'react',
    'react-dom',
    'react-color',
    'react-redux',
    'react-custom-scrollbars',
    'react-dropzone-component',
    'react-addons-css-transition-group',

    // Redux
    'redux',
    'redux-thunk',

    // Core
    'classnames',
    'lodash',

    // Trip-Trax
    'tt-event-emitter',
    'tt-classnames',
    'tt-stylesheet',
    'ttkeymirror',

    // Misc
    'jszip',
    'querystring',
    'file-saver',
    'mime',
    'moment',
    'sortablejs',
    'url',
    'combokeys'
  ]
};
