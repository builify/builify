import React from 'react';
import ColorPicker from 'react-color';
import { connect } from 'react-redux';
import { closeColorPicker, setColorFromColorPicker } from '../../../Actions';
import * as Constants from '../../../Constants';
import TTDOM from '../../../Common/TTDOM';

class ColorPick extends React.Component {
  colorTargetType = null;

  onClose () {
    return this.props.closeColorPicker();
  }

  setColor (color) {
    return this.props.setColorFromColorPicker(color, this.colorTargetType);
  }

  render () {
    const { template } = this.props;
    const { isColorPickerOpened, selectedCPElement, sourceCPElement } = template;
    let defaultColor = '#000';
    let xPos = 0;
    let yPos = 0;

    if (selectedCPElement) {
      const browserSize = TTDOM.browser.size();
      const { height: browserHeight } = browserSize;
      const estimatedColorPickerHeight = 320;

      if (selectedCPElement.getAttribute('data-abcolor')) {
        const colorCircleElement = selectedCPElement.querySelector('.ab-color__circle');
        const colorCirclePosition = colorCircleElement.getBoundingClientRect();
        const { left, top } = colorCirclePosition;

        xPos = Math.round(left) + 5; // Adding 5px margin to right.
        yPos = Math.round(top);

        defaultColor = colorCircleElement.getAttribute('data-color');

        this.colorTargetType = Constants.ColorPickerTargetTypes.COLOR;
      } else if (selectedCPElement.getAttribute(Constants.CONTENTBLOCK_ATTR_FIRST_ELEMENT)) {
        const coverColorElement = selectedCPElement.querySelector('.block-background-cover-color');
        const toolboxItemPosition = sourceCPElement.getBoundingClientRect();
        const { top, right } = toolboxItemPosition;
        var coverColor = coverColorElement.style.backgroundColor;
        const coverOpacity = coverColorElement.style.opacity;

        yPos = Math.round(top) + 10;
        xPos = Math.round(right) - 5;

        if (coverColor.indexOf('rgb') !== -1) {
          coverColor = coverColor.replace(')', `, ${+coverOpacity})`).replace('rgb', 'rgba');
        }

        defaultColor = coverColor;

        this.colorTargetType = Constants.ColorPickerTargetTypes.BACKGROUNDCOLOR;
      }

      const bottomX = estimatedColorPickerHeight + yPos;

      if (bottomX > browserHeight) {
        yPos = yPos - (bottomX - browserHeight) - 30;
      }
    } else if (!selectedCPElement || !isColorPickerOpened) {
      return null;
    }

    xPos = `${xPos}px`;
    yPos = `${yPos}px`;

    const colorpickerPosition = {
      'position': 'fixed',
      'top': yPos,
      'left': xPos
    };

    return (
      <ColorPicker
        color={defaultColor}
        positionCSS={colorpickerPosition}
        display={isColorPickerOpened}
        onClose={::this.onClose}
        onChangeComplete={::this.setColor}
        type='sketch' />
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeColorPicker: () => {
      dispatch(closeColorPicker());
    },

    setColorFromColorPicker: (color, colorTargetType) => {
      dispatch(setColorFromColorPicker(color, colorTargetType));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPick);
