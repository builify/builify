import React from 'react';
import { kebabCase as _kebabCase } from 'lodash';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';
import { getStyleValue, setStyleValue } from './helpers';

export default class ItemPaddingEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };

  state = {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setPaddingDefaultValues();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setPaddingDefaultValues();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setPaddingDefaultValues () {
    const paddings = {
      top: getStyleValue(this._target, 'padding-top'),
      right: getStyleValue(this._target, 'padding-right'),
      bottom: getStyleValue(this._target, 'padding-bottom'),
      left: getStyleValue(this._target, 'padding-left')
    };

    this.setState({
      paddingTop: paddings.top,
      paddingRight: paddings.right,
      paddingBottom: paddings.bottom,
      paddingLeft: paddings.left
    });
  }

  handleChange (name, value) {
    setStyleValue(this._target, _kebabCase(name), value);

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
        <div title="Padding Top" className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingTop}
            onChange={this.handleChange.bind(this, 'paddingTop')} />
        </div>
        <div title="Padding Right" className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingRight}
            onChange={this.handleChange.bind(this, 'paddingRight')} />
        </div>
        <div title="Padding Bottom" className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingBottom}
            onChange={this.handleChange.bind(this, 'paddingBottom')} />
        </div>
        <div title="Padding Left" className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.paddingLeft}
            onChange={this.handleChange.bind(this, 'paddingLeft')} />
        </div>
      </div>
    );
  }
}
