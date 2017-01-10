function hex(x) {
  return ('0' + parseInt(x).toString(16)).slice(-2);
}

export function rgbToHex (rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb;
  }

  if (rgb === 'transparent' || rgb === '') {
    return rgb;
  }

  rgb = rgb.match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);
  
  return `#${hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])}`;
}
