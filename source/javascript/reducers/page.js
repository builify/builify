import _pick from 'lodash/pick';
import _without from 'lodash/without';
import _assign from 'lodash/assign';
import _isUndefined from 'lodash/isundefined';
import _has from 'lodash/has';
import _isObject from 'lodash/isobject';
import _size from 'lodash/size';
import _isArray from 'lodash/isarray';
import _map from 'lodash/map';
import _findIndex from 'lodash/findindex';
import _isElement from 'lodash/iselement';
import _isNull from 'lodash/isnull';
import TTStorage from '../modules/tt-storage';
import Random from '../common/random';
import TTDOM from '../common/TTDOM';
import * as Actions from '../actions/constants';
import { replaceDataInHTML } from '../common/common';
import { TEMPLATE_PAGES_STORAGE_NAME } from '../constants';

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
  if (_isObject(block)) {
    // Better check needed though, but works now.
    if (_size(block) < 5) {
      return block = {};
    }

    if (_isElement(block.elementReference)) {
      const HTML = block.elementReference.outerHTML;

      block.source = HTML;
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
    return _map(blocks, block => {
      return resetBlockParameters(block);
    });
  } else if (_isObject(blocks)) {
    return resetBlockParameters(blocks);
  }
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
  let arr = Array.from(matches);

  arr.shift();
  arr.pop();
}

export default function page (state = pageInitialState, action) {
  switch (action.type) {
    case Actions.CLONE_ITEM: {
      // To update hovering events.
      return _assign({}, state);
    }

    case Actions.FLUSH_PAGES_IN_STORAGE: {
      if (TTStorage.flush()) {
        window.location.reload(false);
        return _assign({}, state);
      }

      return state;
    }

    case Actions.SAVE_CURRENT_PAGE: {
      const { pageTitle, pageFileName, pageID, navigation, main, footer, blocksCount } = state;

      if (pageID) {
        const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);
        const queryString = { pageID: pageID };
        const itemIndex = _findIndex(pagesInStorage, queryString);
        const pageInStorage = pagesInStorage[itemIndex];

        if (!_isUndefined(pageInStorage)) {
          const iFrame = TTDOM.iframe.get('ab-cfrm');
          const iFrameWindow = TTDOM.iframe.getWindow(iFrame);
          const pageFullSource = TTDOM.iframe.getFullHTML(iFrameWindow);
          const newPage = _assign({}, pageInStorage, {
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
        const { id, type } = block;

        if (type === 'footer') {
          if (_has(block, 'elementReference') && _isElement(block.elementReference)) {
            block.elementReference.remove();
          } else {
            if (_isElement(state.footer.elementReference)) {
              state.footer.elementReference.remove();
            }
          }

          return _assign({}, state, {
            footer: {},
            blocksCount: state.blocksCount - 1
          });
        } else if (type === 'navigation') {
          if (_has(block, 'elementReference') && _isElement(block.elementReference)) {
            block.elementReference.remove();
          } else {
            if (_isElement(state.navigation.elementReference)) {
              state.navigation.elementReference.remove();
            }
          }

          return _assign({}, state, {
            navigation: {},
            blocksCount: state.blocksCount - 1
          });
        } else {
          if (_has(block, 'elementReference') && _isElement(block.elementReference)) {
            block.elementReference.remove();
          } else {
            const searchQuery = { id: id };
            const index = _findIndex(state.main, searchQuery);

            if (index !== -1) {
              if (_isElement(state.main[index].elementReference)) {
                state.main[index].elementReference.remove();
              }

              return _assign({}, state, {
                main: _without(state.main, state.main[index]),
                blocksCount: state.blocksCount - 1
              });
            }
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

      return state;
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
