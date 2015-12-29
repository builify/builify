const TYPE_ARRAY = '[object Array]';
const TYPE_STRING = '[object String]';
const TYPE_OBJECT = '[object Object]';
const TYPE_BOOLEAN = '[object Boolean]';
const TYPE_NUMBER = '[object Number]';
const PREFIXES = '-webkit-,-ms-,-moz-,-o-'.split(',');
const PREFIXES_LEN = PREFIXES.length;
const COMPUTED_STYLES = window.getComputedStyle(document.documentElement);
const NON_UNIT_PROPERTIES = {
  'animation-iteration-count': true,
  'box-ordinal-group': true,
  'column-count': true,
  'fill-opacity': true,
  'flex': true,
  'flex-grow': true,
  'flex-order': true,
  'flex-shrink': true,
  'font-weight': true,
  'line-height': true,
  'opacity': true,
  'order': true,
  'orphans': true,
  'stop-opacity': true,
  'tab-size': 1,
  'widows': true,
  'z-index': true,
  'zoom': true
};

export default class {
  constructor(target) {
    this._styleSheetEnabled = false;
    this._stylesheet = this._initializeStyleElement(target);
    this._CACHED_STYLES = {};
    this._CACHED_PROPERTIES = {};
    this._BROWSER_STYLES = [].slice.call(COMPUTED_STYLES);
  }

  _getType(type) {
    return Object.prototype.toString.call(type);
  }

  _isNumber(value) {
    return !!(this._getType(value) === TYPE_NUMBER);
  }

  _isString(value) {
    return !!(this._getType(value) === TYPE_STRING);
  }

  _isObject(value) {
    return !!(this._getType(value) === TYPE_OBJECT);
  }

  _isArray(value) {
    return !!(this._getType(value) === TYPE_ARRAY);
  }

  _isBoolean(value) {
    return !!(this._getType(value) === TYPE_BOOLEAN);
  }

  _isElement(node) {
    return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
  }

  _initializeStyleElement(target) {
    var style = document.createElement('style');

    style.setAttribute('type', 'text/css');
    style.setAttribute('data-ttstylesheet', 'true');
    style.appendChild(document.createTextNode(''));

    ((!target && !this._isElement(target)) ? document.head : target).appendChild(style);

    this._styleSheetEnabled = true;

    return (style.styleSheet || style.sheet);
  }

  _dasherize(property) {
    return property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  _normalizeProperty(property) {
    if (this._CACHED_PROPERTIES.hasOwnProperty(property)) {
      return this._CACHED_PROPERTIES[property];
    }

    var dasherizedProperty = this._dasherize(property);

    if (this._BROWSER_STYLES.indexOf(dasherizedProperty) !== -1) {
      this._CACHED_PROPERTIES[property] = dasherizedProperty;
      return dasherizedProperty;
    } else {
      let i = PREFIXES_LEN - 1,
        prefixed = null;

      while (i >= 0) {
        prefixed = `${PREFIXES[i]}${dasherizedProperty}`;

        if (this._BROWSER_STYLES.indexOf(prefixed) !== -1) {
          this._CACHED_PROPERTIES[property] = prefixed;
          return prefixed;
        }

        i--;
      }
    }

    this._CACHED_PROPERTIES[property] = dasherizedProperty;

    return dasherizedProperty;
  }

  _insertRule(selector, styles, index) {
    const sheet = this._stylesheet;

    if (!index) {
      index = sheet.cssRules.length;
    }

    styles = this._parseStyles(styles);

    sheet.insertRule(`${selector} { ${styles} }`, index);
  }

  _isValidForUnit (property) {
    if (NON_UNIT_PROPERTIES.hasOwnProperty(property)) {
      return false;
    }

    return true;
  }

  _parseStyles(styles) {
    const stylesToText = Object.keys(styles).map((key) => {
      const property = this._normalizeProperty(key);
      const value = styles[key];
      const validForUnit = this._isValidForUnit(property) && this._isNumber(value);
      const parsedValue = validForUnit ? `${value}px` : value;
      const declaration = `${property}: ${parsedValue} !important`;

      return declaration;
    }).join(';') + ';';

    return stylesToText;
  }

  _flattenToOneLevel(data) {
    for (let key in data) {
      const styles = data[key];

      for (let _key in styles) {
        if (this._isObject(styles[_key])) {
          data[_key.replace('&', key)] = styles[_key];
          delete data[key][_key];
        }
      }
    }

    return data;
  }

  _insertRules(selector, objectStyles) {
    let cachedStyle = null;

    if (this._CACHED_STYLES.hasOwnProperty(selector)) {
      cachedStyle = this._CACHED_STYLES[selector];

      const { obj } = cachedStyle;

      this._CACHED_STYLES[selector] = Object.assign(cachedStyle, {
        obj: Object.assign(obj, objectStyles)
      });
    } else {
      this._CACHED_STYLES[selector] = {
        slctor: selector,
        obj: objectStyles,
        index : Object.keys(this._CACHED_STYLES).length
      };

      cachedStyle = this._CACHED_STYLES[selector];
    }

    const { slctor, obj, index } = cachedStyle;

    this._insertRule(slctor, obj, index);
  }

  _insertJSONRules(rules) {
    rules = this._flattenToOneLevel(rules);

    for (let rule in rules) {
      if (rules.hasOwnProperty(rule)) {
        const selector = rule;
        const selectorRules = rules[rule];
        this._insertRules(selector, selectorRules);
      }
    }
  }

  _disableStylesheet() {
    if (this._styleSheetEnabled) {
      const sheet = this._stylesheet;

      sheet.disabled = true;
      this._styleSheetEnabled = false;
    }
  }

  _enableStylesheet() {
    if (!this._styleSheetEnabled) {
      const sheet = this._stylesheet;

      sheet.disabled = false;
      this._styleSheetEnabled = true;
    }
  }

  add(styles) {
    if (styles && this._isObject(styles)) {
      this._insertJSONRules(styles);
    }

    return this;
  }

  disable() {
    this._disableStylesheet();
    return this;
  }

  enable() {
    this._enableStylesheet();
    return this;
  }
}
