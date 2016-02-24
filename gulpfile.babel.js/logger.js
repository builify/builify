import gutil from 'gulp-util';

export const LOGGER = {
  START: 0,
  END: 1,

  TYPE: {
    APPLICATION: 'Application',
    VENDORS: 'Vendors',
    SERVER: 'Server',
    HTML: 'HTML',
    CSS: 'Stylesheet',
    CANVASCSS: 'Canvas Stylesheet'
  }
};

export function logger (type, target, timeStart = 0) {
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
