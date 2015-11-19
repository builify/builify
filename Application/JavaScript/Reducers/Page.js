import { randomKey, replaceDataInHTML, getAbsPosition, addCSSRule } from '../Common/Common';
import Storage from '../Common/Storage';
import _ from 'lodash';
import * as Actions from '../Actions/Constants';

const pageInitialState = {
  pageID: null,
  pageTitle: 'Test',

  navigation: {},
  main: [],
  footer: {},
  blocksCount: 0,
  mainBlocksCount: 0,

  replaceInHTML: []
};

function page (state = pageInitialState, action) {
  switch (action.type) {
    case Actions.RESTART_PAGE:
      return _.assign({}, state, {
        pageID: null,
        pageTitle: 'Test',

        navigation: {},
        main: [],
        footer: {},
        blocksCount: 0,
        mainBlocksCount: 0,
      });

    case Actions.START_NEW_PAGE:
      const { pageID } = action;

      return Object.assign({}, state, {
        pageID: pageID
      });

    case Actions.SAVE_CURRENT_PAGE: {
      const { pageID, blocksCount } = state;
      let stateNavigation = state.navigation;
      let stateMain = state.main;
      let stateFooter = state.footer;

      const resetBlockParameters = (block) => {
        if (_.has(block, 'hasBeenRendered')) {
          block.hasBeenRendered = false;
        }

        if (_.has(block, 'elementReference')) {
          block.elementReference = null;
        }

        return block;
      };

      /*if (pageID) {
        let pagesInStorage = Storage.get('ab-pages');
        const itemIndex = _.findIndex(pagesInStorage, 'id', pageID);
        let pageInStorage = pagesInStorage[itemIndex];

        if (pagesInStorage) {
          stateMain = _.map(stateMain, block => {
            block = resetBlockParameters(block);
          });

          stateNavigation = resetBlockParameters(stateNavigation);
          stateFooter = resetBlockParameters(stateFooter);

          pageInStorage = _.assign({}, pageInStorage, {
            navigation: stateNavigation,
            main: stateMain,
            footer: stateFooter,
            blocksCount: blocksCount
          });

          pagesInStorage[itemIndex] = pageInStorage;

          Storage.set('ab-pages', pagesInStorage);
        }
      }*/

      console.log(state);

      return state;
    }

    case Actions.LOAD_PREVIOUS_PAGE: {
      const { idx } = action;
      let { pageID, navigation, main, footer, blocksCount } = state;
      const pagesInStorage = Storage.get('ab-pages');
      let pageInStorage = null;

      if (!idx) {
        pageInStorage = pagesInStorage[0];
      } else {
        const itemIndex = _.findIndex(pagesInStorage, 'id', idx);
        pageInStorage = pagesInStorage[itemIndex];
        pageID = idx;
      }

      if (pageInStorage) {
        const {
          navigation: pageNavigation,
          main: pageMain,
          footer: pageFooter,
          blocksCount: pageBlocksCount
        } = pageInStorage;

        navigation = pageNavigation;
        main = pageMain;
        footer = pageFooter;
        blocksCount = pageBlocksCount;
      }

      return _.assign({}, state, {
        pageID: pageID,

        navigation: navigation,
        main: main,
        footer: footer,
        blocksCount: blocksCount
      });
    }

    case Actions.GET_TEMPLATE_DATA: {
      let {  replaceInHTML } = state;

      if (_.has(action, 'data.replacer')) {
        replaceInHTML = action.data.replacer;
      }

      return _.assign({}, state, {
        replaceInHTML: replaceInHTML
      });
    }

    case Actions.LOAD_CONTENTBLOCK_TO_PAGE: {
      let { navigation, main, footer, blocksCount, mainBlocksCount } = state;

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
          mainBlocksCount++;
        }

        blocksCount++;
      }

      return _.assign({}, state, {
        navigation: navigation,
        footer: footer,
        main: main,
        blocksCount: blocksCount,
        mainBlocksCount: mainBlocksCount
      });
    }

    case Actions.REMOVE_CONTENTBLOCK: {
      const { blockElement } = action;
      let { navigation, main, footer, blocksCount } = state;

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
    }

    case Actions.BLOCK_WAS_RENDERED_TO_PAGE: {
      const { block, elementReference } = action;
      const { blockType, id } = block;
      let { navigation, main, footer } = state;

      function setParameters (block) {
        block.hasBeenRendered = true;
        block.elementReference = elementReference;
      }

      if (blockType === 'navigation') {
        setParameters(navigation);
      } else if (blockType === 'footer') {
        setParameters(footer);
      } else {
        const indexSearchQuery = { id: id };
        const index = _.findKey(main, indexSearchQuery);

        let news = main[index];

        news.hasBeenRendered = true;
        news.elementReference = elementReference;

        main[index] = _.assign({}, main[index], news);
      }

      console.log(main);

      return _.assign({}, state, {
        navigation: navigation,
        main: main,
        footer: footer
      });
    }

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
