import React from 'react';
import Icon from '../../shared/icon';

export default class ToolboxItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    onClick: React.PropTypes.func,
    icon: React.PropTypes.string
  };

  static defaultProps = {
    title: '',
    onClick: () => {}
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { onClick, title } = this.props;
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };

    return (
      <li onClick={onClick} title={title}>
        { this.props.icon && <Icon icon={this.props.icon} size={iconSize} style={iconStyle} /> }
      </li>
    );
  }
}
