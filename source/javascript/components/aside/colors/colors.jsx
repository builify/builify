import React from 'react';
import _map from 'lodash/map';
import Random from '../../../common/random';
import Color from './color';
import { connect } from 'react-redux';
import { openColorPicker } from '../../../actions';

class Colors extends React.Component {
  static propTypes = {
    colors: React.PropTypes.array.isRequired,
    openColorPicker: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  clickColor (element) {
    return this.props.openColorPicker(element);
  }

  renderColors () {
    const { colors } = this.props;

    return _map(colors, (color, colorTarget) => {
      const key = Random.randomKey('color');

      return (
        <Color
         key={key}
         color={color}
         colorTarget={colorTarget}
         onClick={::this.clickColor} />
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
  const { template } = state;
  const { design } = template;
  const { colors } = design;

  return {
    colors
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openColorPicker: function (target) {
      dispatch(openColorPicker(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Colors);
