import React, { Component, PropTypes } from 'react';
import Events from '../../Common/Events';
import Ripple from './Ripple';

class Button extends Component {
  static propTypes = {
    accent: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    kind: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.bool,
    mini: PropTypes.bool,
    primary: PropTypes.bool,
    ripple: PropTypes.bool,
    type: PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    kind: 'flat',
    loading: false,
    mini: false,
    primary: false,
    ripple: true
  };

  handleMouseDown = (event) => {
    Events.pauseEvent(event);
    this.refs.ripple.start(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  render () {
    const {label, icon, loading, ripple, primary, accent, mini, kind, ...others} = this.props;

    let className = 'ab-button primary';
    if (kind) className += ` ${kind}`
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <button
        {...others}
        className={className}
        data-react-toolbox='button'
        onMouseDown={this.handleMouseDown}
        disabled={this.props.disabled || this.props.loading} >
        { ripple ? <Ripple ref='ripple' loading={loading}/> : null }
        { label ? <abbr className='ab-button__label'>{label}</abbr> : null }
      </button>
    );
  }
}

export default Button;
