import React from 'react';
import classNames from '../../../common/classnames';
import Scrollbar from '../../shared/scrollbar';
import Slider from '../../shared/slider-input';
import Input from '../../shared/input';
import Icon from '../../shared/icon';
import BackButton from '../back-button';

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
         <BackButton />
          <h1 className={classNames('tab__title')}>
            <span>Design</span>
            <span>Block</span>
          </h1>
          <div className={classNames(['be-block', 'be-block--first'])}>
            <div className={classNames('be-block__inputs')}>
              <div className={classNames('be-block__input')}>
                <span className={classNames('be-block__input__text')}>W</span>
                <Input
                  className={classNames('be-block__input__type')}
                  value='32' />
              </div>
              <div className={classNames('be-block__input')}>
                <span className={classNames('be-block__input__text')}>H</span>
                <Input
                  className={classNames('be-block__input__type')}
                  value='32' />
              </div>
            </div>
            <div className={classNames('be-block__inputs')}>
              <div className={classNames('be-block__input')}>
                <span className={classNames('be-block__input__text')}>X</span>
                <Input
                  className={classNames('be-block__input__type')}
                  value='323' />
              </div>
              <div className={classNames('be-block__input')}>
                <span className={classNames('be-block__input__text')}>Y</span>
                <Input
                  className={classNames('be-block__input__type')}
                  value='1323' />
              </div>
            </div>
            <div className={classNames('be-block__inputs')}>
             <div className={classNames('be-block__input')}>
                <Icon className={classNames('be-block__input__icon')} icon='rotate-right' size='18' />
                <Input
                  className={classNames('be-block__input__type')}
                  value='323&deg;' />
              </div>
            </div>
          </div>
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
