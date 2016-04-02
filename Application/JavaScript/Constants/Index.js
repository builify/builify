export const IS_DEMO_VERSION = false;

export const TEMPLATE_PAGES_STORAGE_NAME = 'ab-pages';

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

export const CurrentLocations = {
  STARTSCREEN: 0,
  CANVAS: 1,
  PREVIEW: 2
};

export const PreviewModes = {
  DESKTOP: 0,
  TABLET: 1,
  PHONE: 2
};

export const DialogTypes = {
  CLASSIC: 0,
  LINKCHANGE: 1,
  IMAGECHANGE: 2,
  ICONCHANGE: 3,
  PREVIOUSPAGES: 4,
  CONTENTBLOCKSOURCE: 5,
  DOWNLOADPAGES: 6,
  RESTART: 7,
  COUNTDOWN: 8,
  VIDEOEDIT: 9
};

export const ColorPickerTargetTypes = {
  COLOR: 0,
  BACKGROUNDCOLOR: 1
};

// For tracking elements.
export const TRACK_MODAL_CURENT_IMAGE_INPUT_ID = 'swagmodeon';
