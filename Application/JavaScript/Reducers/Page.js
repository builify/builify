import { randomKey, replaceDataInHTML, getAbsPosition, addCSSRule } from '../Common/Common';
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

function page (state = pageInitialState, action) {
  let { navigation, main, footer, blocksCount } = state;

  switch (action.type) {
    case Actions.GET_TEMPLATE_DATA:
      let {  replaceInHTML } = state;

      if (_.has(action, 'data.replacer')) {
        replaceInHTML = action.data.replacer;
      }

      return _.assign({}, state, {
        replaceInHTML: replaceInHTML
      });

    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
      if (_.has(action, 'HTML')) {
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

      return _.assign({}, state, {
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
            footer = {};
            blocksCount--;
          } else if (attr == 'navigation') {
            navigation = {};
            blocksCount--;
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

      return _.assign({}, state, {
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
      let temp = main[newIndex];

      main[newIndex] = main[oldIndex];
      _.assign(main[newIndex], {
        updatePosition: true,
        oldPos: oldIndex,
        newPos: newIndex
      });

      main[oldIndex] = temp;
      _.assign(main[oldIndex], {
        updatePosition: true,
        oldPos: newIndex,
        newPos: oldIndex
      });

      return _.assign({}, state, {
        main: main
      });
  }

  return state;
}

export default page;
