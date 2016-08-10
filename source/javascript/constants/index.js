export const IS_DEMO_VERSION = process.env.DEMO;
export const BUY_LINK = 'http://genert.github.io';

export const MAXIMUM_NOTIFICATIONS = 7;

export const TEMPLATE_ASSETS_STORAGE_NAME = 'builify-assets';
export const TEMPLATE_PAGES_STORAGE_NAME = 'builify-pages';

export const TEMPLATE_PACKAGE_FILENAME = 'template';
export const TEMPLATE_PACKAGE_EXTENSION = 'zip';

export const MAXIUMUM_PAGES_IN_STORAGE_DEMO = 3;
export const MAXIUMUM_PAGES_IN_STORAGE_FULL = 15;
export const MAXIUMUM_PAGES_IN_STORAGE = IS_DEMO_VERSION ?
  MAXIUMUM_PAGES_IN_STORAGE_DEMO : MAXIUMUM_PAGES_IN_STORAGE_FULL;

export const CONTENTBLOCK_ATTR_ID = 'data-abcid';
export const CONTENTBLOCK_ATTR_FIRST_ELEMENT = 'data-abccorent';
export const CONTENTBLOCK_ATTR_TYPE = 'data-abctype';

export const JUNK_ATTR = 'data-abcjunk';

export const ATTR_CORE_ELEMENT = 'data-abccorent';
export const EMPTY_STRING = '';

export const CurrentLocations = {
  STARTSCREEN: 0,
  CANVAS: 1,
  PREVIEW: 2
};

export const PreviewModes = {
  INITIAL: 0,
  TABLET: 1,
  PHONE: 2
};

export const DialogTypes = {
  CLASSIC: 0,
  IMAGECHANGE: 1,
  ICONCHANGE: 2,
  PREVIOUSPAGES: 3,
  CONTENTBLOCKSOURCE: 4,
  DOWNLOADPAGES: 5,
  RESTART: 6,
  COUNTDOWN: 7,
  VIDEOEDIT: 8,
  FEEDBACK: 9
};

export const ColorPickerTargetTypes = {
  COLOR: 0,
  BACKGROUNDCOLOR: 1
};

// For tracking elements.
export const TRACK_MODAL_CURENT_IMAGE_INPUT_ID = 'swagmodeon';
