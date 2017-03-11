import React from 'react';
import { connect } from 'react-redux';
import { map as _map } from 'lodash';
import Random from '../../../common/random';
import Color from './color';
import { openColorPicker as openColorPickerAction } from '../../../actions';

function renderColors (colors, openColorPicker) {
  return _map(colors, (color, colorTarget) => {
    return (
      <Color
        key={Random.randomKey('color')}
        color={color}
        colorTarget={colorTarget}
        onClick={(element) => {
          return openColorPicker(element);
        }} />
    );
  });
}

function Colors ({
  colors,
  openColorPicker
}) {
  return (
    <div>
      { renderColors(colors, openColorPicker) }
    </div>
  );
}

Colors.propTypes = {
  colors: React.PropTypes.object.isRequired,
  openColorPicker: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const { template } = state;
  const { design } = template;
  const { colors } = design;

  return {
    colors
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openColorPicker: (target) => {
      dispatch(openColorPickerAction(target));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Colors);
