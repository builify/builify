import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Ripple extends Component {
  static propTypes = {
    centered: PropTypes.bool,
    className: PropTypes.string,
    loading: PropTypes.bool,
    spread: PropTypes.number
  };

  static defaultProps = {
    centered: false,
    className: '',
    loading: false,
    spread: 2
  };

  state = {
    active: false,
    restarting: false,
    top: null,
    left: null,
    width: null
  };

  start = ({ pageX, pageY }) => {
    document.addEventListener('mouseup', this.handleEnd);
    const {top, left, width} = this._getDescriptor(pageX, pageY);
    this.setState({active: false, restarting: true, width: 0}, () => {
      this.refs.ripple.offsetWidth;  //eslint-disable-line no-unused-expressions
      this.setState({active: true, restarting: false, top, left, width});
    });
  };

  handleEnd = () => {
    document.removeEventListener('mouseup', this.handleEnd);
    this.setState({active: false});
  };

  _getDescriptor (pageX, pageY) {
    const { left, top, height, width } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    return {
      left: this.props.centered ? width / 2 : pageX - left,
      top: this.props.centered ? height / 2 : pageY - top,
      width: width * this.props.spread
    };
  }

  render () {
    const { left, top, width } = this.state;
    const rippleStyle = {left, top, width, height: width};
    let className = this.props.loading ? 'ab-ripple__loading' : 'ab-ripple__normal';
    if (this.state.active) className += ' active';
    if (this.state.restarting) className += ' restarting';
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <span data-react-toolbox='ripple' className='ab-ripple__wrapper'>
        <span ref="ripple" role='ripple' className={className} style={rippleStyle} />
      </span>
    );
  }
}

export default Ripple;
