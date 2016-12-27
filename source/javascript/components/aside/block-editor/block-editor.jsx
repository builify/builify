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

class BorderRadiusEditor extends React.Component {
  render () {
    return (
      <div>
        <div className={classNames('be-block__radius')}>
          <div title='Same radius for all corners' className={classNames(['be-block__radius__item' ,'be-block__radius__item--first'])}>
            <div className={classNames('be-block__radius__icon')}>
              <Icon icon='crop-din' />
            </div>
            <div title='Different radius for each corner' className={classNames(['be-block__radius__icon', 'be-block__radius__icon--active'])}>
              <Icon icon='crop-free' />
            </div>
          </div>
          <div className={classNames('be-block__radius__item')}>
            <Input
              className={classNames('be-block__radius__input')}
              value='0' />
          </div>
          <div className={classNames('be-block__radius__item')}>
            <Input
              className={classNames('be-block__radius__input')}
              value='0' />
          </div>
          <div className={classNames('be-block__radius__item')}>
            <Input
              className={classNames('be-block__radius__input')}
              value='0' />
          </div>
          <div className={classNames('be-block__radius__item')}>
            <Input
              className={classNames('be-block__radius__input')}
              value='0' />
          </div>
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
            <BlockTitle title='Text' />
            <TextAlignEditor />
            <TextSpaceEditor />
          </div>
          <div className={classNames('be-block')}>
            <BlockTitle title='Appearance' />
            <OpacitySlider />
            <BorderRadiusEditor />
          </div>
        </Scrollbar>
      </div>
    );
  }
}

class TextSpaceEditor extends React.Component {
  render () {
    return (
      <div className={classNames('be-block__space')}>
        <div className={classNames('be-block__space__item')} title='Character Spacing'>
          <Icon icon='swap-horiz' />
          <Input className={classNames('be-block__space__input')} value='32' />
        </div>
        <div className={classNames('be-block__space__item')} title='Line Spacing'>
          <Icon icon='format-line-spacing' />
          <Input className={classNames('be-block__space__input')} value='32' />
        </div>
      </div>
    );
  }
}

class TextAlignEditor extends React.Component {
  render () {
    return (
      <div className={classNames('be-block__align')}>
        <div className={classNames(['be-block__align__item', 'be-block__align__item--active'])} title='Left Align'>
          <Icon icon='format-align-left' />
        </div>
        <div className={classNames('be-block__align__item')} title='Center Align'>
          <Icon icon='format-align-center' />
        </div>
        <div className={classNames('be-block__align__item')} title='Right Align'>
          <Icon icon='format-align-right' />
        </div>
      </div>
    );
  }
}

const BlockTitle = function (props) {
  return (
    <h3 className={classNames('be-block__title')}>{ props.title }</h3>
  );
};

BlockTitle.propTypes = {
  title: React.PropTypes.string.isRequired
};


export default BlockEditor;
