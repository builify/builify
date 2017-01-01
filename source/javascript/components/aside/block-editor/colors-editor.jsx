import React from 'react';
import classNames from '../../../common/classnames';
import { openColorPicker, closeColorPicker } from '../../../actions';
import { connect } from 'react-redux';
import { rgbToHex } from '../../../common/colors';
import { getStyleValue, setStyleValue } from './helpers';

class ColorsEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired,
    openColorPicker: React.PropTypes.func.isRequired
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
      backgroundColor: rgbToHex(backgroundColorValue)
    });
  }

  onColorClick (element) {
    return this.props.openColorPicker(element);
  }
  
  render () {
    const { display, color, backgroundColor } = this.state;

    if (!display) {
      return null;
    }

    return (
      <div className={classNames('be-block__colors')}>
        <Color
          title='Color'
          color={color}
          onClick={::this.onColorClick} />
        <Color
          title='Background Color'
          color={backgroundColor}
          onClick={::this.onColorClick} />
      </div>
    );
  }
}

class Color extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    onClick: function () {}
  };

  _colorElement = null;

  clickEvent (e) {
    e.preventDefault();
    return this.props.onClick(this._colorElement);
  }

  render () {
    const { color, title } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };

    return (
      <div
        ref={(ref) => this._colorElement = ref}
        title={title}
        data-abcolor={color}
        className={classNames(['color', 'be-block__colors__item'])}
        onClick={::this.clickEvent}>
        <div className={classNames(['color__name', 'be-block__colors__name'])}>
          <span>{ title }</span>
        </div>
        <div
          className={classNames('color__circle')}
          title={color}
          data-color={color}
          style={colorHolderStyle} />
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openColorPicker: function (target, sourceElement) {
      dispatch(openColorPicker(target, sourceElement));
    },

    closeColorPicker: function () {
      dispatch(closeColorPicker());
    }
  };
}

export default connect(null, mapDispatchToProps)(ColorsEditor);
