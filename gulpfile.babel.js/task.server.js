import watch from 'gulp-watch';
import browserSync from 'browser-sync';
import { logger, LOGGER } from './logger';

export default function (options) {
  const timeStart = new Date();
  const browserSyncObject = browserSync.create();

  logger(LOGGER.START, LOGGER.TYPE.SERVER);

  browserSyncObject.init({
    logPrefix: 'BrowserSync',
    browser: ['google chrome'],
    open: 'external',
    notify: false,
    server: {
      baseDir: options.src
    }
  });

  watch([
    './DevelopmentBuild/*.html',
    './DevelopmentBuild/*.css',
    './DevelopmentBuild/main.js'
  ]).on('change', browserSyncObject.reload);

  logger(LOGGER.END, LOGGER.TYPE.SERVER, timeStart);
}
