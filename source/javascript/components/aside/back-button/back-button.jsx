import React from 'react';
import Icon from '../../shared/icon';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import { emptyFunction } from '../../../common/misc';

export default class BackButton extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string,
    title: React.PropTypes.string
  };

  static defaultProps = {
    onClick: emptyFunction,
    className: classNames('tab__close'),
    title: 'go back'
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const title = localization(this.props.title);

    return (
      <div title={title} className={this.props.className} onClick={this.props.onClick}>
        <Icon icon='arrow-back' size={30} />
        <span>{ title }</span>
      </div>
    );
  }
}
