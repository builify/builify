import React from 'react';
import { connect } from 'react-redux';
import { openColorPicker } from '../../../Actions';
import Random from '../../../Common/Random';
import _ from 'lodash';
import Color from './Color';

class Colors extends React.Component {
  clickColor (element) {
    const { onColorClick } = this.props;

    return onColorClick(element);
  }

  renderColors () {
    const { template } = this.props;
    const { design } = template;
    const { colors } = design;

    return _.map(colors, (color, colorTarget) => {
      const key = Random.randomKey('color');

      return (
        <Color
         key={key}
         color={color}
         colorTarget={colorTarget}
         clickFunction={::this.clickColor} />
      );
    });
  }

  render () {
    return (
      <div>
        { this.renderColors() }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onColorClick: (target) => {
      dispatch(openColorPicker(target));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Colors);
