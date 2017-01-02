import React from 'react';
import localization from '../../../common/localization';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';
import { emptyFunction } from '../../../common/misc';

export default class NavigationItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    id: '',
    currentLocation: -1,
    className: '',
    disabled: false,
    onClick: emptyFunction
  };

  shouldComponentUpdate () {
    return false;
  }

  clickEvent (e) {
    e.preventDefault();
    return this.props.onClick();
  }

  render () {
    const { icon, title } = this.props;
    const className = classNames(null, {
      'hide': this.props.disabled
    }, this.props.className);
    const text = localization(title);

    return (
      <li className={className} title={text} onClick={::this.clickEvent}>
        { icon && <Icon icon={icon} /> }
        { text && <span>{ text }</span> }
      </li>
    );
  }
}
