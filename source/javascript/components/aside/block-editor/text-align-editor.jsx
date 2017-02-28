import React from 'react';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';
import { getStyleValue, setStyleValue } from './helpers';

const inlineBlocks = [
  'b', 'big', 'i', 'small',
  'tt', 'abbr', 'acronym',
  'cite', 'code', 'dfn', 'em',
  'kbd', 'strong', 'samp', 'time',
  'var', 'a', 'bdo', 'br', 'img',
  'map', 'object', 'q', 'script',
  'span', 'sub', 'sup', 'button',
  'input', 'label', 'select', 'textarea'
];

export default class TextAlignEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };

  state = {
    display: true,
    align: 'left'
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setAlignDefaultValue();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setAlignDefaultValue();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setAlignDefaultValue () {
    if (inlineBlocks.includes(this._target.tagName.toLowerCase())) {
      this.setState({
        ...this.state,
        display: false
      });

      return;
    }

    const value = getStyleValue(this._target, 'text-align');
    let align = 'left';

    switch (value) {
      case 'left':
      case 'start':
        align = 'left';
        break;

      case 'center':
      case 'justify':
      case 'justify-all':
        align = 'center';
        break;

      case 'right':
      case 'end':
        align = 'right';
        break;

      default:
        break;
    }

    this.setState({
      ...this.state,
      align
    });
  }

  changeAlign (value) {
    setStyleValue(this._target, 'text-align', value);

    this.setState({
      align: value
    });
  }

  render () {
    if (this.state.display === false) {
      return null;
    }

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
