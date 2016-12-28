import React from 'react';
import Icon from '../../shared/icon';
import classNames from '../../../common/classnames';

export default class BackButton extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string,
    title: React.PropTypes.string
  };

  static defaultProps = {
    onClick: function () {},
    className: classNames('tab__close'),
    title: 'Go Back'
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { title } = this.props;

    return (
      <div title={title} className={this.props.className} onClick={this.props.onClick}>
        <Icon icon='arrow-back' size={30} />
        <span>{ title }</span>
      </div>
    );
  }
}
