import React from 'react';

export default class Logo extends React.Component {
  static propTypes = {
    text: React.PropTypes.string
  };

  static defaultProps = {
    text: 'TTBuilder'
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className='ab-logo'>
        <div className='ab-logo__icon'>
          <div className='ab-logo__left'></div>
          <div className='ab-logo__right'></div>
        </div>
        <div className='ab-logo__text'>{this.props.text}</div>
      </div>
    );
  }
}
