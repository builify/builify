import * as Actions from '../Constants/Actions';
import Builder from '../Common/Builder';

const modularScales = {
  minorSecond: {
    name: 'Minor second - 16/15'
  }
}

const initialState = {
  _colorPickerTarget: null,

  _currentPage: {
    navigation: {},
    main: [],
    footer: [],
    blocksCount: 0
  },

  design: {
    swatches: [],
    currentSwatch: '',

    colors: {},

    typography: {
      fonts: {
        header: '',
        body: ''
      },
      size: {
        basefont: 16,
        baseline: 24 
      }
    }
  }
};

function proccessHTML (HTML, arrayOfItemsToReplace) {
  if (!HTML || !arrayOfItemsToReplace || !arrayOfItemsToReplace.length) {
    return;
  }

  arrayOfItemsToReplace.map((replacer, i) => {
    const { findWhat, replaceWith } = replacer;

    if (!findWhat || !replaceWith) {
      return;
    }

    let reg = new RegExp(findWhat, "g");

    HTML = HTML.replace(reg, replaceWith);
  });

  return HTML;
}
 
export function theme (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SELECTED_TEMPLATE_DATA:
      let data = {};

      if (action.hasOwnProperty('data')) {
        data = action.data;
      }

      return Object.assign({}, state, data);

    case Actions.LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS:
      if (action.hasOwnProperty('HTMLData')) {
        let { HTMLData, blockType, blockName } = action;
        const blockID = Builder.randomKey();

        HTMLData = proccessHTML(HTMLData, state.replacer);

        if (blockType === 'navigation') {
          let navigationBlockInformation = {
            id: blockID,
            type: blockType,
            blockName: blockName,
            source: HTMLData
          };

          state._currentPage.navigation = navigationBlockInformation;
          state._currentPage.blocksCount++;
        } else if (blockType === 'footer') {
          let footerBlockInformation = {
            id: blockID,
            type: blockType,
            blockName: blockName,
            source: HTMLData
          };

          state._currentPage.footer.push(footerBlockInformation);
          state._currentPage.blocksCount++;
        } else {
          let blockInformation = {
            id: blockID,
            type: blockType,
            blockName: blockName,
            source: HTMLData
          };

          state._currentPage.main.push(blockInformation);
          state._currentPage.blocksCount++;
        }
      }

      return Object.assign({}, state, {});

    case Actions.OPEN_COLORPICKER:
      return Object.assign({}, state, {
        _colorPickerTarget: action.target
      });

    case Actions.SET_COLOR_FROM_COLORPICKER:
      const { color } = action;
      let dataColor = state._colorPickerTarget.getAttribute('data-color');

      if (dataColor) {
        if (state.design.colors.hasOwnProperty(dataColor)) {
          state.design.colors[dataColor] = '#' + color + '';
        }
      }

      return state; 

    case Actions.CLOSE_COLORPICKER:
      return Object.assign({}, state, {
        _colorPickerTarget: null
      });

    case Actions.SET_SWATCH:
      let selectedSwatch = state.currentSwatch;
      
      if (action.hasOwnProperty('swatch')) {
        selectedSwatch = String(action.swatch);
      }

      return Object.assign({}, state, {
        currentSwatch: selectedSwatch
      });
  }

  return state;
}