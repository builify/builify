import React from 'react';
import classNames from '../../../common/classnames';
import Scrollbar from '../../shared/scrollbar';
import Slider from '../../shared/slider-input';
import Input from '../../shared/input';
import Icon from '../../shared/icon';
import BackButton from '../back-button';
import BlockTitle from './block-title';
import PositionEditor from './edit-position';
import { connect } from 'react-redux';
import { closeBlockEditorTab } from '../../../actions';

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
  state = {
    showAll: false,

    radius: 4,

    topLeftRadius: 0,
    topRightRadius: 0,
    bottomRightRadius: 0,
    bottomLeftRadius: 0
  };

  changeRadius (type, value) {
    this.setState({
      ...this.state,
      [type]: value
    });
  }

  changeRadiusShow (type) {
    this.setState({
      ...this.state,
      showAll: type === 'all' ? true : false
    });
  }

  renderCornerRadius () {
    return (
      <div title='Corner Radius' className={classNames('be-block__radius__item')}>
        <Input
          className={classNames('be-block__radius__input')}
          value={this.state.radius}
          onChange={this.changeRadius.bind(this, 'radius')} />
      </div>
    );
  }

  renderAllRadiuses () {
    return (
      <div>
        <div
          title='Top Left Border Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.topLeftRadius}
            onChange={this.changeRadius.bind(this, 'topLeftRadius')} />
        </div>
        <div
          title='Top Right Border Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.topRightRadius}
            onChange={this.changeRadius.bind(this, 'topRightRadius')} />
        </div>
        <div
          title='Bottom Right Border Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.bottomRightRadius}
            onChange={this.changeRadius.bind(this, 'bottomRightRadius')} />
        </div>
        <div
          title='Bottom Left Radius'
          className={classNames('be-block__radius__item')}>
          <Input
            className={classNames('be-block__radius__input')}
            value={this.state.bottomLeftRadius}
            onChange={this.changeRadius.bind(this, 'bottomLeftRadius')} />
        </div>
      </div>
    );
  }

  renderInputs () {
    if (!this.state.showAll) {
      return this.renderCornerRadius();
    } else {
      return this.renderAllRadiuses();
    }
  }

  render () {
    const singleRadiusClassName = classNames({
      'be-block__radius__icon': true,
      'be-block__radius__icon--active': !this.state.showAll
    });
    const allRadiusClassName = classNames({
      'be-block__radius__icon': true,
      'be-block__radius__icon--active': this.state.showAll
    });

    return (
      <div className={classNames('be-block__radius')}>
        <div title='Same radius for all corners' className={classNames(['be-block__radius__item' ,'be-block__radius__item--first'])}>
          <div
            onClick={this.changeRadiusShow.bind(this, 'single')}
            title='Same radius for all corners'
            className={singleRadiusClassName}>
            <Icon icon='crop-din' />
          </div>
          <div
            onClick={this.changeRadiusShow.bind(this, 'all')}
            title='Different radius for each corner'
            className={allRadiusClassName}>
            <Icon icon='crop-free' />
          </div>
        </div>
        { this.renderInputs() }
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

class BlockEditor extends React.Component {
  static propTypes = {
    blockEditorTabOpened: React.PropTypes.bool.isRequired,
    blockEditorTarget: React.PropTypes.any,
    closeBlockEditorTab: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (nextProps.blockEditorTabOpened === this.props.blockEditorTabOpened) {
      return false;
    }

    return true;
  }
  
  render () {
    if (this.props.blockEditorTabOpened === false) {
      return null;
    }
    
    const { blockEditorTarget } = this.props;

    return (
      <div className={classNames(['tab', 'tab__blockeditor'])}>
        <Scrollbar aside innerPadding>
          <BackButton
            title='Close'
            onClick={this.props.closeBlockEditorTab} />
          <h1 className={classNames('tab__title')}>
            <span>Design</span>
            <span>Block</span>
          </h1>
          <div className={classNames(['be-block', 'be-block--first'])}>
            <BlockTitle title='Position' />
            <PositionEditor target={blockEditorTarget} />
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

function mapStateToProps (state) {
  const { builder } = state;
  const { blockEditorTabOpened, blockEditorTarget } = builder;

  return {
    blockEditorTabOpened: blockEditorTabOpened,
    blockEditorTarget: blockEditorTarget
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeBlockEditorTab: function () {
      dispatch(closeBlockEditorTab());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockEditor);
