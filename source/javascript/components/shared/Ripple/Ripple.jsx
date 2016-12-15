import React from 'react';
import classNames from '../../../common/classnames';

export default class Ripple extends React.Component {
  static propTypes = {
    centered: React.PropTypes.bool,
    className: React.PropTypes.string,
    loading: React.PropTypes.bool,
    spread: React.PropTypes.number
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

  node = null;

  shouldComponenUpdate (nextProps, nextState) {
    if (this.props !== nextProps || this.state !== nextState) {
      return true;
    }

    return false;
  }

  start = ({ pageX, pageY }) => {
    document.addEventListener('mouseup', this.handleEnd);

    const {top, left, width} = this._getDescriptor(pageX, pageY);

    this.setState({
      active: false,
      restarting: true,
      width: 0
    }, () => {
      this.refs.ripple.offsetWidth;
      this.setState({
        active: true,
        restarting: false,
        top, left, width
      });
    });
  };

  handleEnd = () => {
    document.removeEventListener('mouseup', this.handleEnd);
  
    this.setState({
      active: false
    });
  };

  _getDescriptor (pageX, pageY) {
    const { left, top, height, width } = this.node.getBoundingClientRect();

    return {
      left: this.props.centered ? width / 2 : pageX - left,
      top: this.props.centered ? height / 2 : pageY - top,
      width: width * this.props.spread
    };
  }

  render () {
    const { left, top, width } = this.state;
    const rippleStyle = { left, top, width, height: width };
    const className = classNames(this.props.loading ? 'ripple__loading' : 'ripple__normal', {
      'active': this.state.active,
      'restarting': this.state.restarting
    }, this.props.className);

    return (
      <span className='ab-ripple__wrapper' ref={node => this.node = node}>
        <span ref='ripple' className={className} style={rippleStyle} />
      </span>
    );
  }
}
