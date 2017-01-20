import React from 'react';
import classNames from '../../../common/classnames';
import Input from '../../shared/input';
import { getStyleValue, setStyleValue } from './helpers';
import {
  kebabCase as _kebabCase
} from 'lodash';

export default class ItemMarginEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };

  state = {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setMarginDefaultValues();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setMarginDefaultValues();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setMarginDefaultValues () {
    const margins = {
      top: getStyleValue(this._target, 'margin-top'),
      right: getStyleValue(this._target, 'margin-right'),
      bottom: getStyleValue(this._target, 'margin-bottom'),
      left: getStyleValue(this._target, 'margin-left')
    };

    this.setState({
      marginTop: margins.top,
      marginRight: margins.right,
      marginBottom: margins.bottom,
      marginLeft: margins.left
    });
  }

  handleChange  (name, value) {
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
          <span>Margin</span>
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
        <div title='Margin Left' className={classNames('be-block__pm__item')}>
          <Input
            className={classNames('be-block__pm__input')}
            value={this.state.marginLeft}
            onChange={this.handleChange.bind(this, 'marginLeft')} />
        </div>
      </div>
    );
  }
}
