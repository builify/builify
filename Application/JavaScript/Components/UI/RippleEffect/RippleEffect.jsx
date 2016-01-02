import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import prefixer from '../../Common/Prefixer';

const defaults = {
  centered: false,
  className: '',
  spread: 2
};

const Ripple = (options = {}) => {
  const {
    centered: defaultCentered,
    className: defaultClassName,
    spread: defaultSpread
  } = { ...defaults, ...options };

  return ComposedComponent => {
    return class RippledComponent extends React.Component {
      static propTypes = {
        children: React.PropTypes.any,
        disabled: React.PropTypes.bool,
        ripple: React.PropTypes.bool,
        rippleCentered: React.PropTypes.bool,
        rippleClassName: React.PropTypes.string,
        rippleSpread: React.PropTypes.number
      };

      static defaultProps = {
        disabled: false,
        ripple: true,
        rippleCentered: defaultCentered,
        rippleClassName: defaultClassName,
        rippleSpread: defaultSpread
      };

      state = {
        active: false,
        left: null,
        restarting: false,
        top: null,
        width: null
      };

      handleEnd = () => {
        document.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);

        this.setState({
          active: false
        });
      };

      start = ({ pageX, pageY }, touch = false) => {
        if (!this._isTouchRippleReceivingMouseEvent(touch)) {
          this.touch = touch;

          document.addEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);

          const { top, left, width } = this._getDescriptor(pageX, pageY);

          this.setState({ active: false, restarting: true, top, left, width }, () => {
            this.refs.ripple.offsetWidth;  //eslint-disable-line no-unused-expressions

            this.setState({
              active: true,
              restarting: false
            });
          });
        }
      };

      _isTouchRippleReceivingMouseEvent (touch) {
        return this.touch && !touch;
      }

      _getDescriptor (pageX, pageY) {
        const { left, top, height, width } = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const { rippleCentered: centered, rippleSpread: spread } = this.props;
        return {
          left: centered ? 0 : pageX - left - width / 2 - window.scrollX,
          top: centered ? 0 : pageY - top - height / 2 - window.scrollY,
          width: width * spread
        };
      }

      handleMouseDown = (event) => {
        if (!this.props.disabled) {
          this.start(event);
        }

        if (this.props.onMouseDown) {
          this.props.onMouseDown(event);
        }
      };

      render () {
        if (!this.props.ripple) {
          return <ComposedComponent {...this.props} />;
        } else {
          const {
            children,
            ripple,
            rippleClassName: className,
            rippleCentered: centered,
            rippleSpread: spread,
            ...other
          } = this.props;

          const rippleClassName = classNames(style.normal, {
            [style.active]: this.state.active,
            [style.restarting]: this.state.restarting
          }, className);

          const { left, top, width } = this.state;
          const scale = this.state.restarting ? 0 : 1;
          const rippleStyle = prefixer({
            transform: `translate3d(
              ${-width / 2 + left}px, ${-width / 2 + top}px, 0
            ) scale(${scale})`
          }, { width, height: width });

          return (
            <ComposedComponent {...other} onMouseDown={this.handleMouseDown}>
              {children ? children : null}
              <span data-react-toolbox='ripple' className={style.wrapper}>
                <span ref='ripple' role='ripple' className={rippleClassName} style={rippleStyle} />
              </span>
            </ComposedComponent>
          );
        }
      }
    };
  };
};

export default Ripple;
