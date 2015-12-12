import { randomKey, replaceDataInHTML, getAbsPosition, addCSSRule } from '../Common/Common';
import Storage from '../Common/Storage';
import Random from '../Common/Random';
import DOM from '../Common/DOM';
import _ from 'lodash';
import * as Actions from '../Actions/Constants';
import { TEMPLATE_PAGES_STORAGE_NAME } from '../Constants';

const pageInitialState = {
  // Core
  pageID: null,
  pageTitle: 'Page Title',
  pageFileName: 'index.html',
  pageFullSource: null,

  // Blocks
  navigation: {},
  main: [],
  footer: {},
  blocksCount: 0,

  // Misc
  replaceInHTML: []
};

function resetBlockParameters (block) {
  if (_.isObject(block)) {
    if (_.has(block, 'hasBeenRendered')) {
      block.hasBeenRendered = false;
    }

    if (_.has(block, 'elementReference')) {
      block.elementReference = null;
    }
  }

  return block;
}

function resetBlocks (blocks) {
  if (_.isArray(blocks)) {
    return _.map(blocks, block => resetBlockParameters(block));
  } else if (_.isObject(blocks)) {
    return resetBlockParameters(blocks);
  }
}

function page (state = pageInitialState, action) {
  switch (action.type) {
    case Actions.SET_PAGE_TITLE: {
      const { title } = action;

      return _.assign({}, state, {
        pageTitle: title
      });
    }

    case Actions.SET_PAGE_FILENAME: {
      const { filename } = action;

      return _.assign({}, state, {
        pageFileName: filename
      });
    }

    case Actions.RESTART_PAGE:
      return _.assign({}, state, _.omit(pageInitialState, 'replaceInHTML'));

    case Actions.START_NEW_PAGE: {
      const { pageID } = action;

      return _.assign({}, state, {
        pageID: pageID
      });
    }

    case Actions.SAVE_CURRENT_PAGE: {
      const { pageTitle, pageFileName, pageID, navigation, main, footer, blocksCount } = state;
      const mainCopy = _.assign({}, state.main);

      if (pageID) {
        const pagesInStorage = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);
        const queryString = { pageID: pageID };
        const itemIndex = _.findIndex(pagesInStorage, queryString);
        const pageInStorage = pagesInStorage[itemIndex];

        if (pageInStorage) {
          const iFrame = DOM.iframe.get('ab-cfrm');
          const iFrameWindow = DOM.iframe.getWindow(iFrame);
          const pageFullSource = DOM.iframe.getFullHTML(iFrameWindow);
          const newPage = _.assign({}, pageInStorage, {
            pageID: pageID,
            pageTitle: pageTitle,
            pageFileName: pageFileName,
            pageFullSource: pageFullSource,

            navigation: resetBlocks(navigation),
            main: resetBlocks(main),
            footer: resetBlocks(footer),
            blocksCount: blocksCount
          });

          pagesInStorage[itemIndex] = newPage;

          if (_.isArray(pagesInStorage)) {
            Storage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesInStorage);
          } else {
            throw Error('Pages localstorage data is wrong type.');
          }
        }
      }

      return state;
    }

    case Actions.LOAD_PREVIOUS_PAGE: {
      let { idx } = action;
      const pagesInStorage = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);

      if (!idx) {
        if (pagesInStorage.length >= 1) {
          idx = pagesInStorage[0].pageID;
        }
      }

      const itemIndex = _.findIndex(pagesInStorage, 'pageID', idx);
      const pageInStorage = pagesInStorage[itemIndex];
      const pageID = idx;

      console.log(pageInStorage);

      return _.assign({}, state, {
        ...pageInStorage
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
      let { navigation, main, footer, blocksCount } = state;

      if (_.has(action, 'HTML')) {
        let { HTML, blockType, blockName } = action;
        const { replaceInHTML } = state;
        const sourceString = replaceDataInHTML(HTML, replaceInHTML).toString();
        const blockID = Random.randomString(13);
        const blockInformation = {
          id: blockID,
          type: blockType,
          blockName: blockName,
          source: sourceString,

          hasBeenRendered: false,
          elementReference: null,
          updateBlock: false
        };

        function removeFirstTag (source) {
          const reg = /(<([^>]+)>)/g;
          const matches = source.match(reg);
          let arr = Array.from(matches);

          arr.shift();
          arr.pop();
        }

        removeFirstTag(sourceString);

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
      const { type: blockType, id } = block;
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

        main[index] = _.assign({}, main[index], setParameters(news));
      }

      return _.assign({}, state, {
        navigation: navigation,
        main: main,
        footer: footer
      });
    }

    case Actions.GET_CURRENT_PAGE_DATA:
      return state;

    case Actions.SORT_CONTENTBLOCKS: {
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

    case Actions.UPDATE_CONTENTBLOCK_SOURCE: {
      const { block, newSource } = action;
      const { type } = block;
      let { navigation: nav, main: mai, footer: ftr } = state;

      if (type === 'navigation') {
        nav.source = newSource;
        mainBlock.updateBlock = true;
      } else if (type === 'footer') {
        ftr.source = newSource;
        mainBlock.updateBlock = true;
      } else {
        const blockID = block.id;
        const indexSearchQuery = { id: blockID };
        const itemIndex = _.findIndex(mai, indexSearchQuery);

        if (itemIndex >= 0) {
          const mainBlock = mai[itemIndex];

          mainBlock.source = newSource;
          mainBlock.updateBlock = true;
        } else {
          throw Error('Could not find block from state main blocks. ' + block);
        }
      }

      return _.assign({}, state, {
        navigation: nav,
        main: mai,
        footer: ftr
      });
    }
  }

  return state;
}

export default page;
