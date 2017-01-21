import React from 'react';
import Random from '../../../common/random';
import Color from './color';
import { connect } from 'react-redux';
import { openColorPicker } from '../../../actions';
import {
  map as _map
} from 'lodash';

class Colors extends React.Component {
  static propTypes = {
    colors: React.PropTypes.object.isRequired,
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
    let key = null;

    return _map(colors, (color, colorTarget) => {
      key = Random.randomKey('color');

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
    colors: colors
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
