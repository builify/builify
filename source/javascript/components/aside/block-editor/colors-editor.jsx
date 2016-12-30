import React from 'react';
import classNames from '../../../common/classnames';
import { openColorPicker, closeColorPicker } from '../../../actions';
import { connect } from 'react-redux';
import { getStyleValue, setStyleValue } from './helpers';

class ColorsEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
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

    console.log(colorValue, backgroundColorValue);
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
            color={color} />
        <Color
          title='Background Color'
          color={backgroundColor} />
      </div>
    );
  }
}

class Color extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  };

  render () {
    const { color, title } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };

    return (
      <div
        title={title}
        data-abcolor={color}
        className={classNames(['color', 'be-block__colors__item'])}>
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
