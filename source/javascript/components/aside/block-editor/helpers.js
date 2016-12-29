export const prefixedProperties = [
  'transform'
];

export const prefix = (function () {
  const styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

export function normalizeAngle (angle) {
  return (angle % 360) + (angle < 0 ? 360 : 0);
}

export function getAngleFromMatrix (value) {
  // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
  const values = value.split('(')[1].split(')')[0].split(',');
  const a = values[0];
  const b = values[1];
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  return angle;
}

export function setStyleValue (el, styleProp, value) {
  if (prefixedProperties.includes(styleProp)) {
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    styleProp = `${prefix.css}${styleProp}`;
  }

  el.style[styleProp] = value;
}

export function getStyleValue (el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;

  if (prefixedProperties.includes(styleProp)) {
    styleProp = `${prefix.css}${styleProp}`;
  }

  if (defaultView && defaultView.getComputedStyle) {
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }

    return value;
  }
}

