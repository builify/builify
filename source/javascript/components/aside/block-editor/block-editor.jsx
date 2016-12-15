import React from 'react';
import classNames from '../../../common/classnames';
import Scrollbar from '../../shared/scrollbar';
import Slider from '../../shared/slider-input';

class OpacitySlider extends React.Component {
  state = {
    value: 100,
    text: '100%'
  };

  onChange (value) {
    this.setState({
      ...this.state,
      value: value,
      text: `${value}%`
    });
  }

  render () {
    const { value, text } = this.state;

    return (
      <div className={classNames('size')}>
        <label>Opacity</label>
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

class BlockEditor extends React.Component {
  render () {
    return (
      <div className={classNames('tab')}>
        <Scrollbar aside innerPadding>
          <div className={classNames('be-block')}>
            <h3 className={classNames('be-block__title')}>Appearance</h3>
            <OpacitySlider />
          </div>
        </Scrollbar>
      </div>
    );
  }
}

export default BlockEditor;
