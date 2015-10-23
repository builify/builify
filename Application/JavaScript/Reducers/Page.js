import { randomKey, replaceDataInHTML, getAbsPosition } from '../Common/Common';
import _ from 'lodash';
import * as Actions from '../Constants/Actions';

const pageInitialState = {
  title: 'Test',

  navigation: {},
  main: [],
  footer: {},
  blocksCount: 0,

  replaceInHTML: []
};

export function page (state = pageInitialState, action) {
  let { navigation, main, footer, blocksCount } = state;

  switch (action.type) {
    case Actions.GET_SELECTED_TEMPLATE_DATA:
      let replacer = state.replacer;

      if (action.hasOwnProperty('data')) {
        if (action.data.hasOwnProperty('replacer')) {
          replacer = action.data.replacer;
        }
      }

      return Object.assign({}, state, {
        replaceInHTML: replacer
      });

    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
      if (action.hasOwnProperty('HTML')) {
        let { HTML, blockType, blockName } = action;
        const { replaceInHTML } = state;
        const blockID = randomKey();
        const blockInformation = {
          id: blockID,
          type: blockType,
          blockName: blockName,
          source: replaceDataInHTML(HTML, replaceInHTML),

          hasBeenRendered: false,
          elementReference: null
        };

        if (blockType === 'navigation') {
          navigation = blockInformation;
        } else if (blockType === 'footer') {
          footer = blockInformation;
        } else {
          main.push(blockInformation);
        }

        blocksCount++;
      }

      return Object.assign({}, state, {
        navigation: navigation,
        footer: footer,
        main: main,
        blocksCount: blocksCount
      });

    case Actions.REMOVE_CONTENTBLOCK:
      const { blockElement } = action;

      if (!blockElement) {
        return state;
      }

      const attr = blockElement.getAttribute('data-abcblocktype');

      if (attr) {
        const blockNumber = blockElement.getAttribute('data-abcblocknr');

        if (blockNumber) {
          if (attr == 'footer') {
            if (footer.id === blockNumber) {
              footer = {};
              blocksCount--;
            } else {
              throw Error('Footer item mismatches with requested block deletion.');
            }
          } else if (attr == 'navigation') {
            // It must equal. I really do not know when it would not be equal
            // because there is only 1 navigation element and nothing more.
            if (navigation.id === blockNumber) {
              navigation = {};
              blocksCount--;
            } else {
              throw Error('Navigation item mismatches with requested block deletion.');
            }
          } else {
            for (let i = main.length - 1; i >= 0; i--) {
              let curItem = main[i];

              if (curItem.id === blockNumber) {
                main.splice(i, 1);
                blocksCount--;
                break;
              }
            }
          }
        }
      }

      blockElement.remove();

      return Object.assign({}, state, {
        navigation: navigation,
        footer: footer,
        main: main,
        blocksCount: blocksCount
      });

    case Actions.GET_CURRENT_PAGE_DATA:
      return state;

    case Actions.SORT_CONTENTBLOCKS:
      const { evt } = action;
      const { newIndex, oldIndex, item } = evt;
      const blockIdElement = item.querySelector('[data-blockid]');
      const blockId = blockIdElement ? blockIdElement.getAttribute('data-blockid') : null;

      if (blockId !== null) {
        let temp = main[newIndex];

        main[newIndex] = main[oldIndex];
        main[oldIndex] = temp;

        _.assign(main[newIndex], {
          updatePosition: true,
          oldPos: oldIndex,
          newPos: newIndex
        });

        _.assign(main[oldIndex], {
          updatePosition: true,
          oldPos: newIndex,
          newPos: oldIndex
        });
      }

      return Object.assign({}, state, {
        main: main
      });
  }

  return state;
}
