import { replaceDataInHTML } from '../Common/Common';
import Storage from '../Common/Storage';
import Random from '../Common/Random';
import TTDOM from '../Common/TTDOM';
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
    // Better check needed though, but works now.
    if (_.size(block) < 5) {
      return block = {};
    }

    return _.assign({}, block, {
      hasBeenRendered: false,
      elementReference: null
    });
  }

  return block;
}

function resetBlocks (blocks) {
  if (_.isArray(blocks)) {
    return _.map(blocks, block => {
      return resetBlockParameters(block);
    });
  } else if (_.isObject(blocks)) {
    return resetBlockParameters(blocks);
  }
}

function page (state = pageInitialState, action) {
  switch (action.type) {
    case Actions.CLONE_ITEM: {
      // To update hovering events.
      return _.assign({}, state);
    }

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

      function savePage (item) {
        if (_.isArray(item)) {
          Storage.set(TEMPLATE_PAGES_STORAGE_NAME, item);
        } else {
          throw Error('Pages localstorage data is wrong type.');
        }
      }

      if (pageID) {
        const pagesInStorage = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);
        const queryString = { pageID: pageID };
        const itemIndex = _.findIndex(pagesInStorage, queryString);
        const pageInStorage = pagesInStorage[itemIndex];

        if (pageInStorage) {
          const iFrame = TTDOM.iframe.get('ab-cfrm');
          const iFrameWindow = TTDOM.iframe.getWindow(iFrame);
          const pageFullSource = TTDOM.iframe.getFullHTML(iFrameWindow);
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

          savePage(pagesInStorage);
        }
      }

      return state;
    }

    case Actions.LOAD_PREVIOUS_PAGE: {
      const { idx } = action;
      const pagesInStorage = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);
      var pageToLoad = null;

      if (!idx) {
        if (_.size(pagesInStorage) >= 1) {
          pageToLoad = pagesInStorage[0];
        }
      } else {
        const searchQuery = { pageID: idx };
        const itemIndex = _.findIndex(pagesInStorage, searchQuery);

        if (itemIndex !== -1) {
          pageToLoad = pagesInStorage[itemIndex];
        }
      }

      if (pageToLoad !== null) {
        let { navigation, main, footer } = pageToLoad;

        navigation = resetBlocks(navigation);
        main = resetBlocks(main);
        footer = resetBlocks(footer);

        pageToLoad = _.assign({}, pageToLoad, {
          navigation: navigation,
          main: main,
          footer: footer
        });

        return _.assign({}, state, {
          ...pageToLoad
        });
      }

      return state;
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
        console.log(action);
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
      const { block } = action;

      if (_.isObject(block) && _.has(block, 'elementReference')) {
        const { id, type, elementReference } = block;
        let { navigation, main, footer, blocksCount } = state;

        if (type === 'footer') {
          footer = {};
          blocksCount--;
          elementReference.remove();
        } else if (type === 'navigation') {
          navigation = {};
          blocksCount--;
          elementReference.remove();
        } else {
          const searchQuery = { id: id };
          const index = _.findIndex(main, searchQuery);

          if (index !== -1) {
            main = _.without(main, main[index]);
            blocksCount--;
            elementReference.remove();
          } else {
            throw Error('Could not find block from main to delete.');
          }
        }

        return _.assign({}, state, {
          navigation: navigation,
          footer: footer,
          main: main,
          blocksCount: blocksCount
        });
      } else {
        return state;
      }
    }

    case Actions.BLOCK_WAS_RENDERED_TO_PAGE: {
      const { block, elementReference } = action;
      const { type } = block;
      const { navigation, main, footer } = state;
      let newFooter = _.assign({}, footer);
      let newMain = main;
      let newNavigation = _.assign({}, navigation);

      if (type === 'footer') {
        newFooter.hasBeenRendered = true;
        newFooter.elementReference = elementReference;
      } else if (type === 'navigation') {
        newNavigation.hasBeenRendered = true;
        newNavigation.elementReference = elementReference;
      } else {
        const index = _.findIndex(newMain, _.pick(block, 'id'));

        if (index !== -1) {
          newMain[index].hasBeenRendered = true;
          newMain[index].elementReference = elementReference;
        }
      }

      return _.assign({}, state, {
        navigation: newNavigation,
        main: newMain,
        footer: newFooter
      });
    }

    case Actions.SORT_CONTENTBLOCKS: {
      const { evt } = action;
      const { main } = state;
      const { newIndex, oldIndex } = evt;
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
