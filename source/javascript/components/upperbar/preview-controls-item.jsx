import React from 'react';
import classNames from '../../common/classnames';
import Icon from '../shared/icon';

export default class PreviewControlsItem extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    active: false,
    hidden: false,
    onClick: () => {}
  };

  render () {
    const { name } = this.props;
    const iconSize = 20;
    const className = classNames(null, {
      'active': this.props.active,
      'hidden': this.props.hidden
    });
    const style = {
      fill: '#444'
    };
    const clickFunction = () => {
      return !this.props.hidden && this.props.onClick(name);
    };
    let title = '';

    switch (name) {
      case 'desktop':
        title = 'Set to Desktop View';
        break;

      case 'tablet':
        title = 'Set to Tablet View';
        break;

      case 'phone':
        title = 'Set to Phone View';
        break;

      case 'settings-applications':
        title = 'Set to Editor Mode';
        break;
    }

    return (
      <li className={className} title={title} onClick={clickFunction}>
        <Icon icon={name} style={style} size={iconSize} />
      </li>
    );
  }
}
