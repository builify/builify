import React from 'react';
import Icon from '../Icon';

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

  render () {
    const { onClick, title } = this.props;
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };
    var icon = null;

    if (this.props.icon) {
      icon = (
        <Icon
          icon={this.props.icon}
          size={iconSize}
          style={iconStyle} />
      );
    }

    return (
      <li
        onClick={onClick}
        title={title}>
        { icon }
      </li>
    );
  }
}
