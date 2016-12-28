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
            <ItemMarginEditor />
            <ItemPaddingEditor />
          </div>
        </Scrollbar>
      </div>
    );
  }
}

class TextSpaceEditor extends React.Component {
  state = {
    letterSpacing: 0,
    lineSpacing: 32
  };

  handleLetterSpacing (value) {
    this.setState({
      ...this.state,
      letterSpacing: value
    });
  }

  handleLineSpacing (value) {
    this.setState({
      ...this.state,
      lineSpacing: value
    });
  }

  render () {
    return (
      <div className={classNames('be-block__space')}>
        <div className={classNames('be-block__space__item')} title='Character Spacing'>
          <Icon icon='swap-horiz' />
          <Input className={classNames('be-block__space__input')} value={this.state.letterSpacing} onChange={::this.handleLetterSpacing} />
        </div>
        <div className={classNames('be-block__space__item')} title='Line Spacing'>
          <Icon icon='format-line-spacing' />
          <Input className={classNames('be-block__space__input')} value={this.state.lineSpacing} onChange={::this.handleLineSpacing} />
        </div>
      </div>
    );
  }
}

class TextAlignEditor extends React.Component {
  state = {
    align: 'left'
  };

  changeAlign (value) {
    this.setState({
      align: value
    });
  }

  render () {
    const leftClassName = classNames({
      'be-block__align__item': true,
      'be-block__align__item--active': this.state.align === 'left'
    });
    const centerClassName = classNames({
      'be-block__align__item': true,
      'be-block__align__item--active': this.state.align === 'center'
    });
    const rightClassName = classNames({
      'be-block__align__item': true,
      'be-block__align__item--active': this.state.align === 'right'
    });

    return (
      <div className={classNames('be-block__align')}>
        <div className={leftClassName} title='Left Align' onClick={this.changeAlign.bind(this, 'left')}>
          <Icon icon='format-align-left' />
        </div>
        <div className={centerClassName} title='Center Align' onClick={this.changeAlign.bind(this, 'center')}>
          <Icon icon='format-align-center' />
        </div>
        <div className={rightClassName} title='Right Align' onClick={this.changeAlign.bind(this, 'right')}>
          <Icon icon='format-align-right' />
        </div>
      </div>
    );
  }
}

class ItemPaddingEditor extends React.Component {
  state = {
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0
  };

  handleChange  (name, value) {
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  render () {
    return (
      <div className={classNames('be-block__pm')}>
        <div className={classNames(['be-block__pm__item' ,'be-block__pm__item--first'])}>
          <span>Padding</span>
        </div>
        <div title='Padding Left' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingLeft}
            onChange={this.handleChange.bind(this, 'paddingLeft')} />
        </div>
        <div title='Padding Top' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingTop}
            onChange={this.handleChange.bind(this, 'paddingTop')} />
        </div>
        <div title='Padding Right' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingRight}
            onChange={this.handleChange.bind(this, 'paddingRight')} />
        </div>
        <div title='Padding Bottom' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingBottom}
            onChange={this.handleChange.bind(this, 'paddingBottom')} />
        </div>
      </div>
    );
  }
}

class ItemMarginEditor extends React.Component {
  state = {
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0
  };

  handleChange  (name, value) {
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  render () {
    return (
      <div className={classNames('be-block__pm')}>
        <div className={classNames(['be-block__pm__item' ,'be-block__pm__item--first'])}>
          <span>Margin</span>
        </div>
        <div title='Margin Left' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.marginLeft}
            onChange={this.handleChange.bind(this, 'marginLeft')} />
        </div>
        <div title='Margin Top' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.marginTop}
            onChange={this.handleChange.bind(this, 'marginTop')} />
        </div>
        <div title='Margin Right' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.marginRight}
            onChange={this.handleChange.bind(this, 'marginRight')} />
        </div>
        <div title='Margin Bottom' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.marginBottom}
            onChange={this.handleChange.bind(this, 'marginBottom')} />
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
