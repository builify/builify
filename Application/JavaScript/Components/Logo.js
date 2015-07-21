import React, { Component, PropTypes } from "react";

export default class Logo extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    text: PropTypes.string
  };

  static defaultProps = {
    height: 50,
    width: 150,
    text: 'ABuilder'
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='ab-logo' style={{"height": this.props.height + "px", "width": this.props.width + "px"}}>
        <div className='ab-logo__icon'>
          <div className='ab-logo__left'></div>
          <div className='ab-logo__right'></div>
        </div>
        <div className='ab-logo__text'>{this.props.text}</div>
      </div>
    );
  };
};