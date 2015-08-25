import React, { Component, PropTypes } from 'react';
import ColorPick from 'react-color';

export default class ColorPicker extends Component {
  render () {
    var popupPosition = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: '99999'
    }; 

    return <ColorPick positionCSS={ popupPosition } display={ true } />
  }
}