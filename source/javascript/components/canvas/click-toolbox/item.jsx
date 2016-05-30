import React from 'react';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';

export default class ClickToolBoxItem extends React.Component {
  static propTypes = {
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    icon: null,
    text: '',
    onClick: function () {}
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className={classNames('crightpanel__item')} onClick={this.props.onClick}>
        { this.props.icon && <Icon icon={this.props.icon} /> }
        <span>{ this.props.text}</span>
      </div>
    );
  }
}
