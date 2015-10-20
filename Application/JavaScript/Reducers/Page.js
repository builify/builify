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
    topX: 0
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
          state.navigation = blockInformation;
          state.blocksCount++;
        } else if (blockType === 'footer') {
          state.footer.push(blockInformation);
          state.blocksCount++;
        } else {
          state.main.push(blockInformation);
          state.blocksCount++;
        }
      }

      return Object.assign({}, state, {});

    case Actions.CURRENT_HOVER_BLOCK:
      let { _currentHoverBlock } = state;
      const { element } = action;

      _currentHoverBlock.element = element;
      _currentHoverBlock.topX = getAbsPosition(element)[0];

      return Object.assign({}, state, {
        _currentHoverBlock: _currentHoverBlock
      });
  }

  return state;
}
