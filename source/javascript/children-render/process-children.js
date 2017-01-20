import _ from 'lodash';

const _isArray = _.isArray;
const _map = _.map;
const _isNull = _.isNull;
const _isNumber = _.isNumber;
const _toSafeInteger = _.toSafeInteger;

export default function (children) {
  if (!_isArray(children)) {
    throw new Error('No data defined.');
  }

  let childrenToRender = [];

  _map(children, (child) => {
    const { type } = child;

    if (!type) {
      throw new Error('Tab children does not have type defined.');
    }

    const splitType = type.split('.');
    const typeDefiner = splitType.length !== 0 ? splitType[0] : type.substr(0, type.indexOf('.'));

    switch (typeDefiner) {
      case 'block': {
        const blockType = splitType[1];

        if (!blockType) {
          throw Error('Block type missing.');
        }

        let blockData = null;

        switch (blockType) {
          case 'navigation':
          case 'currentpage':
          case 'contentblocks':
          case 'filter':
          case 'swatches':
          case 'colors':
          case 'logo': {
            blockData = {
              type: blockType
            };

            break;
          }

          case 'sliderinput': {
            const min = _isNumber(min) ? Math.abs(min) : Math.abs(_toSafeInteger(min));

            blockData = {
              type: 'sliderinput',
              min: min,
              max: child.max || 10,
              step: child.step || 1,
              label: child.label || '',
              onChange: child.onChange || function () {}
            };

            break;
          }

          case 'checkbox': {
            blockData = {
              type: 'checkbox',
              state: child.state === 'off' ? false : true,
              label: child.label || '',
              onClick: child.onClick || function () {}
            };

            break;
          }

          case 'title': {
            blockData = {
              type: 'title',
              title: child.title || '',
              className: child.className || ''
            };

            break;
          }

          default:
            break;
        }

        if (!_isNull(blockData)) {
          childrenToRender.push(blockData);
        }

        break;
      }

      case 'open': {
        const openTarget = splitType[1];

        if (!openTarget) {
          throw Error('Target missing.');
        }

        let blockData = null;

        switch (openTarget) {
          case 'sidetab': {
            blockData = {
              type: 'sidetabopener',
              title: child.title || '',
              target: child.target || ''
            };

            break;
          }

          case 'customcssmodal': {
            blockData = {
              type: 'sidetabopener',
              title: child.title,
              target: 'customcss'
            };

            break;
          }

          default:
            break;
        }

        if (!_isNull(blockData)) {
          childrenToRender.push(blockData);
        }

        break;
      }

      default:
        break;
    }
  });

  return childrenToRender;
}
