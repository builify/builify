export const IS_DEMO_VERSION = process.env.DEMO;
export const IS_DEV_VERSION = !!(process.env.NODE_ENV === 'development');
export const BUY_LINK = 'http://genert.github.io';
export const MAXIMUM_NOTIFICATIONS = 5;

export const TEMPLATE_ASSETS_STORAGE_NAME = 'builify-assets';
export const TEMPLATE_PAGES_STORAGE_NAME = 'builify-pages';
export const TEMPLATE_PACKAGE_FILENAME = 'template';
export const TEMPLATE_PACKAGE_EXTENSION = 'zip';

export const TEMPLATE_FILE_EXTENSION = 'builify';

export const MAXIUMUM_PAGES_IN_STORAGE_DEMO = 3;
export const MAXIUMUM_PAGES_IN_STORAGE_FULL = 15;
export const MAXIUMUM_PAGES_IN_STORAGE = IS_DEMO_VERSION ?
  MAXIUMUM_PAGES_IN_STORAGE_DEMO : MAXIUMUM_PAGES_IN_STORAGE_FULL;

export const CONTENTBLOCK_ATTR_ID = 'data-abcid';
export const CONTENTBLOCK_ATTR_FIRST_ELEMENT = 'data-abccorent';
export const CONTENTBLOCK_ATTR_TYPE = 'data-abctype';
export const JUNK_ATTR = 'data-abcjunk';
export const ATTR_CORE_ELEMENT = 'data-abccorent';

// Classnames
export const BLOCK_BACKGROUND_COLOR_ELEMENT_CLASSNAME = '.background-cover-color';
export const BLOCK_BACKGROUND_IMAGE_ELEMENT_CLASSNAME = '.background-image-holder';

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

export const ModalTypes = {
  NONE: -1,
  CLASSIC: 0,
  IMAGECHANGE: 1,
  ICONCHANGE: 2,
  PREVIOUSPAGES: 3,
  CONTENTBLOCKSOURCE: 4,
  DOWNLOADPAGES: 5,
  RESTART: 6,
  COUNTDOWN: 7,
  VIDEOEDIT: 8,
  FEEDBACK: 9,
  MAPS: 10,
  CUSTOMCSS: 11,
  LINKCHANGE: 12
};

export const ColorPickerTargetTypes = {
  COLOR: 0,
  BACKGROUNDCOLOR: 1
};

// For tracking elements.
export const TRACK_MODAL_CURENT_IMAGE_INPUT_ID = 'swagmodeon';

// Default colors
export const COLORPICKER_DEFAULT_COLORS = [
  '#1abc9c',
  '#16a085',
  '#2ecc71',
  '#27ae60',
  '#3498db',
  '#2980b9',
  '#9b59b6',
  '#8e44ad',
  '#34495e',
  '#2c3e50',
  '#f1c40f',
  '#f39c12',
  '#e67e22',
  '#d35400',
  '#e74c3c',
  '#c0392b',
  '#ecf0f1',
  '#bdc3c7',
  '#95a5a6',
  '#7f8c8d'
];
