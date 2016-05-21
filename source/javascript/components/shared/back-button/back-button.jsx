import React from 'react';
import Icon from '../Icon';
import classNames from '../../../common/classnames';

export default class BackButton extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  };

  static defaultProps = {
    onClick: function () {},
    className: classNames('tab__close')
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className={this.props.className} onClick={this.props.onClick}>
        <Icon icon='arrow-back' size={30} />
        <span>Go Back</span>
      </div>
    );
  }
}
