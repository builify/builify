import React from 'react';
import classNames from '../../../common/classnames';
import Slider from '../../shared/slider-input';
import { getStyleValue, setStyleValue } from './helpers';

export default class OpacitySlider extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };

  state = {
    value: 100,
    text: '100%'
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setOpacityDefaultValue();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setOpacityDefaultValue();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setOpacityDefaultValue () {
    const opacityValue = getStyleValue(this._target, 'opacity');
    const value = parseInt(opacityValue * 100, 10);

    this.setState({
      ...this.state,
      value,
      text: `${value}%`
    });
  }

  onChange (value) {
    setStyleValue(this._target, 'opacity', value / 100);

    this.setState({
      ...this.state,
      value,
      text: `${value}%`
    });
  }

  render () {
    const { value, text } = this.state;

    return (
      <div className={classNames('size')}>
        <label htmlFor="size">Opacity</label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={::this.onChange} />
        <div className={classNames('size__output')}>
          <span>{ text }</span>
        </div>
      </div>
    );
  }
}
