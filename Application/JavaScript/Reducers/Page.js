import { randomKey, replaceDataInHTML, getAbsPosition } from '../Common/Common';
import * as Actions from '../Constants/Actions';

const pageInitialState = {
  title: 'Test',

  navigation: {},
  main: [],
  footer: [],
  blocksCount: 0,

  replaceInHTML: [],

  _currentHoverBlock: {
    element: null,
    topX: 10
  }
};

export function page (state = pageInitialState, action) {
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
      let { navigation, footer, blocksCount, main } = state;

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
          footer.push(blockInformation);
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

    case Actions.CURRENT_HOVER_BLOCK:
      let { _currentHoverBlock } = state;
      const { element } = action;
      const { elementReference } = element;

      _currentHoverBlock.element = elementReference;
      _currentHoverBlock.topX = getAbsPosition(elementReference)[0] + 10;

      return Object.assign({}, state, {
        _currentHoverBlock: _currentHoverBlock
      });

    case Actions.REMOVE_CONTENTBLOCK:
      const { blockElement } = action;
      
      blockElement.remove();

      return Object.assing({}, state, {
        _currentHoverBlock: _currentHoverBlock
      });
  }

  return state;
}
