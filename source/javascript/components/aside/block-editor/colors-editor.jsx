import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Color from './color';
import { openColorPicker, closeColorPicker } from '../../../actions';
import { rgbToHex } from '../../../common/colors';
import { getStyleValue } from './helpers';

class ColorsEditor extends React.Component {
  static propTypes = {
    target: PropTypes.any.isRequired,
    openColorPicker: PropTypes.func.isRequired
  };

  state = {
    display: true,
    color: '#ffffff',
    backgroundColor: '#ffffff'
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setColorsDefaultValues();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setColorsDefaultValues();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setColorsDefaultValues () {
    const tagName = this._target.tagName.toLowerCase();

    if (tagName === 'img') {
      this.setState({
        ...this.state,
        display: false
      });

      return;
    }

    const colorValue = getStyleValue(this._target, 'color');
    const backgroundColorValue = getStyleValue(this._target, 'background-color');

    this.setState({
      ...this.state,
      color: rgbToHex(colorValue),
      backgroundColor: rgbToHex(backgroundColorValue),
      display: true
    });
  }

  onColorClick (element) {
    return this.props.openColorPicker(element, this._target);
  }

  render () {
    const { display, color } = this.state;

    if (!display) {
      return null;
    }

    return (
      <div className={classNames('be-block__colors')}>
        <Color
          type="color"
          title={localization('color')}
          color={color}
          onClick={::this.onColorClick} />
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openColorPicker: (target, sourceElement) => {
      dispatch(openColorPicker(target, sourceElement));
    },

    closeColorPicker: () => {
      dispatch(closeColorPicker());
    }
  };
}

export default connect(null, mapDispatchToProps)(ColorsEditor);
