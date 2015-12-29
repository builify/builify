import React from 'react';
import { connect } from 'react-redux';
import { closeColorPicker, setColorFromColorPicker } from '../../Actions';
import { getBrowserSize, getOffset } from '../../Common/Common';
import ColorPick from 'react-color';

class ColorPicker extends React.Component {
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
    const { colorPickerSelectedElementColorElement } = builder;
    let x = 275, y = 0;
    let defaultColor = '#555';

    if (colorPickerSelectedElementColorElement !== null) {
      let browserSize = getBrowserSize();
      let elementOffset = getOffset(colorPickerSelectedElementColorElement);
      const { left, top } = elementOffset;
      const { height } = browserSize;
      const estimatedColorPickerHeight = 320; // Why not 420?

      defaultColor = colorPickerSelectedElementColorElement.getAttribute('data-color');

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
    builder: state.builder
  };
}

export default connect(mapStateToProps)(ColorPicker);
