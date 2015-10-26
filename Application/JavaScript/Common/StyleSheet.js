import _ from 'lodash';

export function parseColorTargetSelector (selector) {
  if (selector.indexOf('header') !== -1) {
    selector = selector.replace(/header/gi, 'h');
  } else if (selector.indexOf('anchor') !== -1) {
    if (selector.indexOf('ahchorhover') !== -1) {
      selector = 'a:hover';
    } else if (selector.indexOf('anchorvisited') !== -1) {
      selector = 'a:visited';
    } else {
      selector = 'a';
    }
  } else if (selector.indexOf('paragraph') !== -1) {
    selector = 'p';
  }

  return selector;
}

export function setRules (targetSheet, selector, styles) {
  if (!targetSheet || !selector || !styles) {
    return;
  }

  const currentRules = targetSheet.rules || targetSheet.cssRules;
  let index = 0;

  selector = parseColorTargetSelector(selector);


  if ('insertRule' in targetSheet) {
    if (typeof styles === 'object') {
      let rules = '';

      _.map(styles, (value, property) => {
        property = _.kebabCase(property);

        rules += '' + property + ':' + value + ' !important;';
      });

      targetSheet.insertRule(selector + '{' + rules + '}', currentRules.length);
    }
  }
}
