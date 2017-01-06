import React from 'react';
import Icon from '../../shared/icon';
import { emtpyFunction } from '../../../common/misc';

export default class ToolboxItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    onClick: React.PropTypes.func,
    icon: React.PropTypes.string
  };

  static defaultProps = {
    title: '',
    onClick: emtpyFunction
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { onClick, title, icon } = this.props;
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };

    return (
      <li onClick={onClick} title={title}>
        { icon && <Icon icon={icon} size={iconSize} style={iconStyle} /> }
      </li>
    );
  }
}
