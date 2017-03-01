import React from 'react';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';
import Input from '../../shared/input';
import { getStyleValue, setStyleValue } from './helpers';

export default class TextSpaceEditor extends React.Component {
  static propTypes = {
    target: React.PropTypes.any.isRequired
  };

  state = {
    letterSpacing: 0,
    lineSpacing: 1
  };

  _target = null;

  componentWillMount () {
    this._target = this.props.target;
    this.setSpacingDefaultValues();
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.target.isSameNode(this.props.target)) {
      this._target = nextProps.target;
      this.setSpacingDefaultValues();
    }
  }

  componentWillUnmount () {
    this.state = null;
    this._target = null;
  }

  setSpacingDefaultValues () {
    const letterSpacing = getStyleValue(this._target, 'letter-spacing');
    const lineHeight = getStyleValue(this._target, 'line-height');

    this.setState({
      ...this.state,
      letterSpacing: (letterSpacing !== 'normal') ? letterSpacing : 0,
      lineHeight: (letterSpacing !== 'normal') ? lineHeight : 1
    });
  }

  handleLetterSpacing (value) {
    setStyleValue(this._target, 'letter-spacing', value);

    this.setState({
      ...this.state,
      letterSpacing: value
    });
  }

  handleLineSpacing (value) {
    setStyleValue(this._target, 'line-height', value);

    this.setState({
      ...this.state,
      lineSpacing: value
    });
  }

  render () {
    return (
      <div className={classNames('be-block__space')}>
        <div className={classNames('be-block__space__item')} title="Character Spacing">
          <Icon icon="swap-horiz" />
          <Input className={classNames('be-block__space__input')} value={this.state.letterSpacing} onChange={::this.handleLetterSpacing} />
        </div>
        <div className={classNames('be-block__space__item')} title="Line Spacing">
          <Icon icon="format-line-spacing" />
          <Input className={classNames('be-block__space__input')} value={this.state.lineSpacing} onChange={::this.handleLineSpacing} />
        </div>
      </div>
    );
  }
}
