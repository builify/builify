import { isNull as _isNull } from 'lodash';

export function hex (x) {
  return ('0' + parseInt(x, 10).toString(16)).slice(-2);
}

export function rgbToHex (rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb;
  }

  if (rgb === 'transparent' || rgb === '') {
    return rgb;
  }

  const values = rgb.match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);

  if (_isNull(values)) {
    return rgb;
  }

  return `#${hex(values[1]) + hex(values[2]) + hex(values[3])}`;
}
