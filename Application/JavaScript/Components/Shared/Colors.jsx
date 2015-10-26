import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { openColorPicker } from '../../Actions/ActionCreators';
import { randomKey, findUpClassName } from '../../Common/Common';
import { getString } from '../../Common/Localization';
import _ from 'lodash';

class Color extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    colorTarget: PropTypes.string.isRequired,
    clickFunction: PropTypes.func.isRequired
  }

  clickColor (e) {
    const { clickFunction } = this.props;

    return clickFunction(e);
  }

  render () {
    const { color, colorTarget } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };
    const colorName = getString('design.colors.' + colorTarget);

    return (
      <div className='ab-color'>
        <div
          className='ab-color__name'
          title={colorName}>
          {colorName}
        </div>
        <div
          className='ab-color__circle'
          title={color}>
          <span
            data-colortarget={colorTarget}
            data-color={color}
            onClick={::this.clickColor}
            className='ab-color__colorHolder'
            style={colorHolderStyle} />
        </div>
      </div>
    )
  }
}

class Colors extends Component {
  clickColor (e) {
    const { onColorClick } = this.props;

    return onColorClick(findUpClassName(e.target, 'ab-color'));
  }

  render () {
    const { template } = this.props;
    const { design } = template;
    const { colors } = design;

    return (
      <div>
        {_.map(colors, (color, colorTarget) => {
          const key = randomKey('color');

          return (
            <Color
             key={key}
             color={color}
             colorTarget={colorTarget}
             clickFunction={::this.clickColor} />
          )
        })}
      </div>
    )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Colors);
