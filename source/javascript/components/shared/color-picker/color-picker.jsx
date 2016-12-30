import React from 'react';
import { SketchPicker } from 'react-color';
import _isElement from 'lodash/iselement';
import TTDOM from '../../../common/TTDOM';
import * as Constants from '../../../constants';
import { connect } from 'react-redux';
import { closeColorPicker, setColorFromColorPicker } from '../../../actions';

class ColorPick extends React.Component {
  static propTypes = {
    isColorPickerOpened: React.PropTypes.bool.isRequired,
    selectedCPElement: React.PropTypes.any,
    sourceCPElement: React.PropTypes.any,
    closeColorPicker: React.PropTypes.func.isRequired,
    setColorFromColorPicker: React.PropTypes.func.isRequired
  };

  _colorTargetType = null;

  onClose () {
    return this.props.closeColorPicker();
  }

  setColor (color) {
    return this.props.setColorFromColorPicker(color, this._colorTargetType);
  }

  render () {
    const { isColorPickerOpened, sourceCPElement, selectedCPElement } = this.props;

    if (!isColorPickerOpened) {
      return null;
    }

    let defaultColor = '#000';
    let xPos = 0;
    let yPos = 0;

    if (_isElement(selectedCPElement)) {
      const browserSize = TTDOM.browser.size();
      const { height: browserHeight } = browserSize;
      const estimatedColorPickerHeight = 320;

      if (selectedCPElement.getAttribute('data-abcolor')) {
        const colorCircleElement = selectedCPElement.querySelector('.ab-color__circle');

        if (!_isElement(colorCircleElement)) {
          return null;
        }

        const colorCirclePosition = colorCircleElement.getBoundingClientRect();
        const { left, top } = colorCirclePosition;

        xPos = Math.round(left) + 15;
        yPos = Math.round(top) + 15;

        defaultColor = colorCircleElement.getAttribute('data-color');

        this._colorTargetType = Constants.ColorPickerTargetTypes.COLOR;
      } else if (selectedCPElement.getAttribute(Constants.CONTENTBLOCK_ATTR_FIRST_ELEMENT)) {
        const coverColorElement = selectedCPElement.querySelector('.background-cover-color');

        if (!_isElement(coverColorElement)) {
          return null;
        }
  
        const toolboxItemPosition = sourceCPElement.getBoundingClientRect();
        const { top, right } = toolboxItemPosition;
        var coverColor = coverColorElement.style.backgroundColor;
        const coverOpacity = coverColorElement.style.opacity;

        yPos = Math.round(top) + 10 + 60;
        xPos = Math.round(right) + 10;

        if (coverColor.indexOf('rgb') !== -1) {
          coverColor = coverColor.replace(')', `, ${+coverOpacity})`).replace('rgb', 'rgba');
        }

        defaultColor = coverColor;

        this._colorTargetType = Constants.ColorPickerTargetTypes.BACKGROUNDCOLOR;
      }

      const bottomX = estimatedColorPickerHeight + yPos;

      if (bottomX > browserHeight) {
        yPos = yPos - (bottomX - browserHeight) - 30;
      }
    }

    const colorpickerPosition = {
      'position': 'fixed',
      'zIndex': '9999',
      'top': `${yPos}px`,
      'left': `${xPos}px`
    };
    const coverStyle = {
      'position': 'fixed',
      'top': '0px',
      'right': '0px',
      'bottom': '0px',
      'left': '0px'
    };

    return (
      <div style={colorpickerPosition}>
        <div style={coverStyle} onClick={::this.onClose} />
        <SketchPicker
          color={defaultColor}
          onChange={::this.setColor} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { template } = state;
  const { isColorPickerOpened, selectedCPElement, sourceCPElement } = template;

  return {
    isColorPickerOpened,
    selectedCPElement,
    sourceCPElement
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeColorPicker: function () {
      dispatch(closeColorPicker());
    },

    setColorFromColorPicker: function (color, colorTargetType) {
      dispatch(setColorFromColorPicker(color, colorTargetType));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPick);
