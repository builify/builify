import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import events from '../../../common/events';
import InjectProgressBar from '../progress-bar';
import {
  round,
  range
} from 'lodash';

const factory = (ProgressBar) => {
  class Slider extends React.Component {
    static propTypes = {
      className: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      editable: React.PropTypes.bool,
      max: React.PropTypes.number,
      min: React.PropTypes.number,
      onChange: React.PropTypes.func,
      pinned: React.PropTypes.bool,
      snaps: React.PropTypes.bool,
      step: React.PropTypes.number,
      style: React.PropTypes.object,
      value: React.PropTypes.number
    };

    static defaultProps = {
      className: '',
      editable: false,
      max: 100,
      min: 0,
      pinned: false,
      snaps: false,
      step: 0.01,
      value: 0
    };

    state = {
      inputFocused: false,
      inputValue: null,
      sliderLength: 0,
      sliderStart: 0
    };

    componentDidMount () {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillReceiveProps (nextProps) {
      if (this.state.inputFocused && this.props.value !== nextProps.value) {
          this.setState({inputValue: this.valueForInput(nextProps.value)});
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return this.state.inputFocused || !nextState.inputFocused;
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize);
      events.removeEventsFromDocument(this.getMouseEventMap());
      events.removeEventsFromDocument(this.getTouchEventMap());
      events.removeEventsFromDocument(this.getKeyboardEvents());
    }

    handleInputFocus = () => {
      this.setState({
        inputFocused: true,
        inputValue: this.valueForInput(this.props.value)
      });
    };

    handleInputChange = (value) => {
      this.setState({inputValue: value});
    };

    handleInputBlur = (event) => {
      const value = this.state.inputValue || 0;
      this.setState({inputFocused: false, inputValue: null}, () => {
        this.props.onChange(this.trimValue(value), event);
      });
    };

    handleKeyDown = (event) => {
      if ([13, 27].indexOf(event.keyCode) !== -1) this.getInput().blur();
      if (event.keyCode === 38) this.addToValue(this.props.step);
      if (event.keyCode === 40) this.addToValue(-this.props.step);
    };

    handleMouseDown = (event) => {
      if (this.state.inputFocused) this.getInput().blur();
      events.addEventsToDocument(this.getMouseEventMap());
      this.start(events.getMousePosition(event));
      events.pauseEvent(event);
    };

    handleMouseMove = (event) => {
      events.pauseEvent(event);
      this.move(events.getMousePosition(event));
    };

    handleMouseUp = () => {
      this.end(this.getMouseEventMap());
    };

    handleResize = (event, callback) => {
      const {left, right} = findDOMNode(this.refs.progressbar).getBoundingClientRect();
      const cb = (callback) || (() => {});
      this.setState({sliderStart: left, sliderLength: right - left}, cb);
    };

    handleSliderBlur = () => {
      events.removeEventsFromDocument(this.getKeyboardEvents());
    };

    handleSliderFocus = () => {
      events.addEventsToDocument(this.getKeyboardEvents());
    };

    handleTouchEnd = () => {
      this.end(this.getTouchEventMap());
    };

    handleTouchMove = (event) => {
      this.move(events.getTouchPosition(event));
    };

    handleTouchStart = (event) => {
      if (this.state.inputFocused) this.getInput().blur();
      this.start(events.getTouchPosition(event));
      events.addEventsToDocument(this.getTouchEventMap());
      events.pauseEvent(event);
    };

    addToValue (increment) {
      let value = this.state.inputFocused ? parseFloat(this.state.inputValue) : this.props.value;
      value = this.trimValue(value + increment);
      if (value !== this.props.value) this.props.onChange(value);
    }

    getInput () {
      return this.refs.input && this.refs.input.getWrappedInstance
        ? this.refs.input.getWrappedInstance()
        : this.refs.input;
    }

    getKeyboardEvents () {
      return {
        keydown: this.handleKeyDown
      };
    }

    getMouseEventMap () {
      return {
        mousemove: this.handleMouseMove,
        mouseup: this.handleMouseUp
      };
    }

    getTouchEventMap () {
      return {
        touchmove: this.handleTouchMove,
        touchend: this.handleTouchEnd
      };
    }

    end (revents) {
      events.removeEventsFromDocument(revents);
      this.setState({ pressed: false });
    }

    knobOffset () {
      const { max, min } = this.props;
      const translated = this.state.sliderLength * (this.props.value - min) / (max - min);
      return translated * 100 / this.state.sliderLength;
    }

    move (position) {
      const newValue = this.positionToValue(position);
      if (newValue !== this.props.value) this.props.onChange(newValue);
    }

    positionToValue (position) {
      const { sliderStart: start, sliderLength: length } = this.state;
      const { max, min, step } = this.props;
      const pos = (position.x - start) / length * (max - min);
      return this.trimValue(Math.round(pos / step) * step + min);
    }

    start (position) {
      this.handleResize(null, () => {
        this.setState({pressed: true});
        this.props.onChange(this.positionToValue(position));
      });
    }

    stepDecimals () {
      return (this.props.step.toString().split('.')[1] || []).length;
    }

    trimValue (value) {
      if (value < this.props.min) return this.props.min;
      if (value > this.props.max) return this.props.max;
      return round(value, this.stepDecimals());
    }

    valueForInput (value) {
      const decimals = this.stepDecimals();
      return decimals > 0 ? value.toFixed(decimals) : value.toString();
    }

    renderSnaps () {
      if (this.props.snaps) {
        return (
          <div ref='snaps' className='tt-slider__snaps'>
              {range(0, (this.props.max - this.props.min) / this.props.step).map(i => {
                  return <div key={`span-${i}`} className='tt-slider__snap' />;
              })}
          </div>
        );
      }

      return null;
    }

    render () {
      const knobStyles = {left: `${this.knobOffset()}%`};
      const className = classnames('tt-slider', {
        'editable': this.props.editable,
        'disabled': this.props.disabled,
        'pinned': this.props.pinned,
        'pressed': this.state.pressed,
        'ring': this.props.value === this.props.min
      }, this.props.className);

      return (
        <div
          className={className}
          disabled={this.props.disabled}
          onBlur={this.handleSliderBlur}
          onFocus={this.handleSliderFocus}
          style={this.props.style}
          tabIndex='0'>
            <div
                ref='slider'
                className='tt-slider__container'
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}>
              <div
                  ref='knob'
                  className='tt-slider__knob'
                  onMouseDown={this.handleMouseDown}
                  onTouchStart={this.handleTouchStart}
                  style={knobStyles}>
                <div className='tt-slider__innerknob' data-value={parseInt(this.props.value)}/>
              </div>
              <div className='tt-slider__progress'>
                <ProgressBar
                    disabled={this.props.disabled}
                    ref='progressbar'
                    className='tt-slider__innerprogress'
                    max={this.props.max}
                    min={this.props.min}
                    mode="determinate"
                    value={this.props.value} />
                  { this.renderSnaps() }
              </div>
            </div>
        </div>
      );
    }
  }

  return Slider;
};

const Slider = factory(InjectProgressBar);

export default Slider;
