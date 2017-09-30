export default {
  findUpToAttr (el, attr) {
    const breakingPoint = 'HTML';

    if (el.getAttribute(attr)) {
      return el;
    }

    while (el && el.parentNode) {
      el = el.parentNode;

      if (el.getAttribute(attr)) {
        return el;
      }

      if (el.tagName === breakingPoint) {
        break;
      }
    }

    return null;
  },

  assign (...args) {
    return Object.assign(...args);
  }
};
