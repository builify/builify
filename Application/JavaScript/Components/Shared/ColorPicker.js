import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeColorPicker, setColorFromColorPicker } from '../../Actions/ActionCreators';
import ABuilder from '../../Common/ABuilder';
import ColorPick from 'react-color';

class ColorPicker extends Component {
  handleClose () {
    const { dispatch } = this.props;

    dispatch(closeColorPicker());
  }

  handleChange (color) {
    const { dispatch } = this.props;
    const { hex } = color;

    dispatch(setColorFromColorPicker(hex));
  }

  render () {
    const { builder } = this.props;
    const { colorPickerTarget } = builder;
    let x = 275, y = 0;

    if (colorPickerTarget) {
      let browserSize = ABuilder.getBrowserSize();
      let elementOffset = ABuilder.getOffset(colorPickerTarget);
      const { left, top } = elementOffset;
      const { width, height } = browserSize;
      const estimatedColorPickerHeight = 320; // Why not 420?

      x = left + 30;
      y = top;

      let bottomXOfColorPicker = estimatedColorPickerHeight + y;

      if (bottomXOfColorPicker > height) {
        let diff = bottomXOfColorPicker - height;

        y = y - diff - 30;
      }
    }

    x = x + 'px';
    y = y + 'px';

    const popupPosition = {
      position: 'fixed',
      top: y,
      left: x,
      marginLeft: '0',
      zIndex: '99999'
    };
    let displayColorPicker = builder.isColorPickerOpened;

    return (
      <ColorPick
        onClose={::this.handleClose}
        onChange={::this.handleChange}
        positionCSS={popupPosition}
        display={displayColorPicker}
        type='sketch'
        />
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(ColorPicker);