import {
  assign as _assign,
  has as _has,
  findIndex as _findIndex,
  size as _size,
  pick as _pick,
  remove as _remove,
  map as _map,
  isNull as _isNull,
  isElement as _isElement,
  isArray as _isArray,
  isObject as _isObject,
  isUndefined as _isUndefined
} from 'lodash';
import TTStorage from '../modules/tt-storage';
import Random from '../common/random';
import TTDOM from '../common/TTDOM';
import formatPage from '../pages/format';
import exportPage from '../pages/export-page';
import * as Actions from '../actions/constants';
import { TEMPLATE_PAGES_STORAGE_NAME } from '../constants';

function replaceDataInHTML (HTML, arrayOfItemsToReplace) {
  if (!HTML || !arrayOfItemsToReplace || !arrayOfItemsToReplace.length) {
    return HTML;
  }

  if (arrayOfItemsToReplace.length === 0) {
    return HTML;
  }

  map(arrayOfItemsToReplace, (replacer) => {
    const { findWhat, replaceWith } = replacer;

    if (!findWhat || !replaceWith) {
      return;
    }

    const reg = new RegExp(findWhat, 'g');

    HTML = HTML.replace(reg, replaceWith);
  });

  return HTML;
}

function resetBlockParameters (block) {
  if (_isObject(block)) {
    // Better check needed though, but works now.
    if (_size(block) < 5) {
      return {};
    }

    if (_isElement(block.elementReference)) {
      const HTML = block.elementReference.outerHTML;
      block.source = block.elementReference.outerHTML;
    }

    return _assign({}, block, {
      hasBeenRendered: false,
      elementReference: null
    });
  }

  return block;
}

function resetBlocks (blocks) {
  if (_isArray(blocks)) {
    return _map(blocks, (block) => {
      return resetBlockParameters(block);
    });
  } else if (_isObject(blocks)) {
    return resetBlockParameters(blocks);
  }

  return null;
}

function savePage (item) {
  if (_isArray(item)) {
    TTStorage.set(TEMPLATE_PAGES_STORAGE_NAME, item);
  } else {
    throw Error('Pages localstorage data is wrong type.');
  }
}

function removeFirstTag (source) {
  const reg = /(<([^>]+)>)/g;
  const matches = source.match(reg);
  const arr = Array.from(matches);

  arr.shift();
  arr.pop();
}

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

export default function (state = pageInitialState, action) {
  switch (action.type) {
    case Actions.CLONE_ITEM: {
      // To update hovering events.
      return _assign({}, state);
    }

    case Actions.CLEAR_PAGE_BLOCKS_COUNT: {
      return _assign({}, state, {
        blocksCount: 0
      });
    }

    case Actions.EXPORT_PAGE: {
      const { pageTitle, pageFileName, pageID, navigation, main, footer, blocksCount } = state;
      const iFrame = TTDOM.iframe.get('ab-cfrm');
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);
      const pageFullSource = formatPage(iFrameWindow);
      const pageObject = _assign({}, state, {
        pageID,
        pageTitle,
        pageFileName,
        pageFullSource,

        navigation: resetBlocks(navigation),
        main: resetBlocks(main),
        footer: resetBlocks(footer),
        blocksCount
      });

      exportPage(pageObject);

      return state;
    }

    case Actions.IMPORT_PAGE: {
      return _assign({}, state, action.page);
    }

    case Actions.FLUSH_PAGES_IN_STORAGE: {
      TTStorage.deleteKey(TEMPLATE_PAGES_STORAGE_NAME);

      window.location.reload(false);

      // Unreachable code.
      return state;
    }

    case Actions.SAVE_CURRENT_PAGE: {
      const { pageTitle, pageFileName, pageID, navigation, main, footer, blocksCount } = state;

      if (pageID) {
        const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);
        const queryString = { pageID };
        const itemIndex = _findIndex(pagesInStorage, queryString);
        const pageInStorage = pagesInStorage[itemIndex];

        if (!_isUndefined(pageInStorage)) {
          const iFrame = TTDOM.iframe.get('ab-cfrm');
          const iFrameWindow = TTDOM.iframe.getWindow(iFrame);
          const pageFullSource = formatPage(iFrameWindow);
          const newPage = _assign({}, pageInStorage, {
            pageID,
            pageTitle,
            pageFileName,
            pageFullSource,

            navigation: resetBlocks(navigation),
            main: resetBlocks(main),
            footer: resetBlocks(footer),
            blocksCount
          });

          pagesInStorage[itemIndex] = newPage;

          savePage(pagesInStorage);
        }
      }

      return state;
    }

    case Actions.SET_PAGE_TITLE: {
      return _assign({}, state, {
        pageTitle: action.title
      });
    }

    case Actions.SET_PAGE_FILENAME: {
      return _assign({}, state, {
        pageFileName: action.filename
      });
    }

    case Actions.RESTART_PAGE:
      return _assign({}, state, {
        pageID: null,
        pageTitle: 'Page Title',
        pageFileName: 'index.html',
        pageFullSource: null,
        navigation: {},
        main: [],
        footer: {},
        blocksCount: 0
      });

    case Actions.START_NEW_PAGE: {
      return _assign({}, state, {
        pageID: action.pageID
      });
    }

    case Actions.LOAD_PREVIOUS_PAGE: {
      const { idx } = action;
      const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);
      var pageToLoad = null;

      if (!idx) {
        if (_size(pagesInStorage) >= 1) {
          pageToLoad = pagesInStorage[0];
        }
      } else {
        const searchQuery = { pageID: idx };
        const itemIndex = _findIndex(pagesInStorage, searchQuery);

        if (itemIndex !== -1) {
          pageToLoad = pagesInStorage[itemIndex];
        }
      }

      if (!_isNull(pageToLoad)) {
        let { navigation, main, footer } = pageToLoad;

        navigation = resetBlocks(navigation);
        main = resetBlocks(main);
        footer = resetBlocks(footer);

        pageToLoad = _assign({}, pageToLoad, {
          navigation: navigation,
          main: main,
          footer: footer
        });

        return _assign({}, state, {
          ...pageToLoad
        });
      }

      return state;
    }

    case Actions.GET_TEMPLATE_DATA: {
      let {  replaceInHTML } = state;

      if (_has(action, 'data.replacer')) {
        replaceInHTML = action.data.replacer;
      }

      return _assign({}, state, {
        replaceInHTML: replaceInHTML
      });
    }

    case Actions.LOAD_CONTENTBLOCK_TO_PAGE: {
      let { navigation, main, footer, blocksCount } = state;

      if (_has(action, 'HTML')) {
        let { HTML, blockType, blockName, features } = action;
        const { replaceInHTML } = state;
        const sourceString = replaceDataInHTML(HTML, replaceInHTML).toString();
        const blockID = Random.randomString(13);
        const blockInformation = {
          id: blockID,
          type: blockType,
          blockName: blockName,
          source: sourceString,
          features: features,

          hasBeenRendered: false,
          elementReference: null,
          updateBlock: false
        };

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

      return _assign({}, state, {
        navigation: navigation,
        footer: footer,
        main: main,
        blocksCount: blocksCount
      });
    }

    case Actions.REMOVE_CONTENTBLOCK: {
      const { block } = action;

      if (_isObject(block)) {
        const { type } = block;

        if (type === 'footer') {
          if (_has(block, 'elementReference') && _isElement(block.elementReference)) {
            TTDOM.element.remove(block.elementReference);
          } else {
            if (_isElement(state.footer.elementReference)) {
              TTDOM.element.remove(state.footer.elementReference);
            }
          }

          return _assign({}, state, {
            footer: {},
            blocksCount: state.blocksCount - 1
          });
        } else if (type === 'navigation') {
          if (_has(block, 'elementReference') && _isElement(block.elementReference)) {
            TTDOM.element.remove(block.elementReference);
          } else {
            if (_isElement(state.navigation.elementReference)) {
              TTDOM.element.remove(state.navigation.elementReference);
            }
          }

          return _assign({}, state, {
            navigation: {},
            blocksCount: state.blocksCount - 1
          });
        } else {
          const { id } = block;
          const searchQuery = { id: id };
          const index = _findIndex(state.main, searchQuery);

          if (index !== -1) {
            if (_isElement(state.main[index].elementReference)) {
              TTDOM.element.remove(state.main[index].elementReference);
              state.main[index].hasBeenRendered = false;
            }

            return _assign({}, state, {
              main: _remove(state.main, (obj) => {
                return obj.id !== block.id;
              }),
              blocksCount: state.blocksCount - 1
            });
          }
        }
      }

      return state;
    }

    case Actions.BLOCK_WAS_RENDERED_TO_PAGE: {
      const { block, elementReference } = action;
      const { type } = block;

      if (type === 'footer') {
        return _assign({}, state, {
          footer: _assign({}, state.footer, {
            hasBeenRendered: true,
            elementReference: elementReference
          })
        });
      } else if (type === 'navigation') {
        return _assign({}, state, {
          navigation: _assign({}, state.navigation, {
            hasBeenRendered: true,
            elementReference: elementReference
          })
        });
      } else {
        var { main } = state;
        const index = _findIndex(main, _pick(block, 'id'));

        if (index !== -1) {
          main[index] = _assign({}, main[index], {
            hasBeenRendered: true,
            elementReference: elementReference
          });

          return _assign({}, state, {
            main: main
          });
        }
      }

      break;
    }

    case Actions.SORT_CONTENTBLOCKS: {
      const { evt } = action;
      const { main } = state;
      const { newIndex, oldIndex } = evt;
      let temp = main[newIndex];

      main[newIndex] = main[oldIndex];
      _assign(main[newIndex], {
        updatePosition: true,
        oldPos: oldIndex,
        newPos: newIndex
      });

      main[oldIndex] = temp;
      _assign(main[oldIndex], {
        updatePosition: true,
        oldPos: newIndex,
        newPos: oldIndex
      });

      return _assign({}, state, {
        main: main
      });
    }
  }

  return state;
}
