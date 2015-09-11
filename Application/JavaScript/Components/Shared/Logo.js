import React, { Component, PropTypes } from "react";

export default class Logo extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {
    text: 'ABuilder'
  };

  render () {
    return (
      <div className='ab-logo'>
        <div className='ab-logo__icon'>
          <div className='ab-logo__left'></div>
          <div className='ab-logo__right'></div>
        </div>
        <div className='ab-logo__text'>{this.props.text}</div>
      </div>
    )
  }
}