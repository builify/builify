import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { closeColorPicker, setColorFromColorPicker } from '../../../Actions';
import TTDOM from '../../../Common/TTDOM';
import ColorPick from 'react-color';

class ColorPicker extends React.Component {
  handleClose () {
    return this.props.closeColorPicker();
  }

  handleChange (color) {
    const { hex } = color;

    return this.props.setColorFromColorPicker(hex);
  }

  render () {
    const { template } = this.props;
    const { colorPickerSelectedElementColorElement: targetElement } = template;
    let x = 275, y = 0;
    let defaultColor = '#555';

    if (_.isNull(targetElement)) {
      return null;
    }

    const dataColor = targetElement.getAttribute('data-colortarget');

    if (dataColor) {
      const dataColor = targetElement.getAttribute('data-colortarget');
      const browserSize = TTDOM.browser.size();
      // For some reason the targetElement is not rendered while it is... react 15.0.1 bug?
      const updatedTarget = document.querySelector(`[data-colortarget="${dataColor}"]`);
      const elementOffset = updatedTarget.getBoundingClientRect();
      const { top, left } = elementOffset;
      const { height } = browserSize;
      const estimatedColorPickerHeight = 320; // Why not 420?

      defaultColor = updatedTarget.getAttribute('data-color');

      x = left + 30;
      y = top;

      let bottomXOfColorPicker = estimatedColorPickerHeight + y;

      if (bottomXOfColorPicker > height) {
        let diff = bottomXOfColorPicker - height;

        y = y - diff - 30;
      }
    } else {
      console.log(targetElement);
    }

    x = `${x}px`;
    y = `${y}px`;

    const popupPosition = {
      position: 'fixed',
      top: y,
      left: x,
      marginLeft: '0',
      zIndex: '99999'
    };
    const { isColorPickerOpened: displayColorPicker } = template;

    return (
      <ColorPick
        color={defaultColor}
        onClose={::this.handleClose}
        onChangeComplete={::this.handleChange}
        positionCSS={popupPosition}
        display={displayColorPicker}
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
    setColorFromColorPicker: (color) => {
      dispatch(setColorFromColorPicker(color));
    },

    closeColorPicker: () => {
      dispatch(closeColorPicker());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
