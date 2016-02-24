import watch from 'gulp-watch';
import _browserSync from 'browser-sync';
import { logger, LOGGER } from './logger';

export const browserSync = _browserSync.create();

export function createServer (options) {
  const timeStart = new Date();
  logger(LOGGER.START, LOGGER.TYPE.SERVER);

  _browserSync.init({
    logPrefix: 'BrowserSync',
    browser: ['google chrome'],
    open: 'external',
    notify: false,
    reloadDebounce: 1000,
    server: {
      baseDir: options.src
    }
  });

  watch([
    './DevelopmentBuild/*.html',
    './DevelopmentBuild/*.css'
  ], {
    readDelay: 500
  }).on('change', _browserSync.reload);

  logger(LOGGER.END, LOGGER.TYPE.SERVER, timeStart);
}
