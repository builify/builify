import React from 'react';
import Icon from '../Icon';

export default class ClickToolBoxItem extends React.Component {
  static propTypes = {
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    icon: null,
    text: '',
    onClick: function () {}
  }

  shouldComponentUpdate () {
    return false;
  }

  renderIcon () {
    const { icon } = this.props;

    if (icon) {
      return <Icon icon={icon} />
    } else {
      return null;
    }
  }

  render () {
    const { onClick, text } = this.props;

    return (
      <div
        className='ab-crightpanel__item'
        onClick={onClick}>
        { this.renderIcon() }
        <span>{text}</span>
      </div>
    );
  }
}
