import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class NumberInput extends Component {
  static propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: null,
    min: null,
    onChange: () => {},

    disabled: false,
    readOnly: false
  }

  constructor (props) {
    super(props);

    let { value } = this.props; 

    this.state = {
      stringValue: value.toString()
    };
  }

  render () {
    let { stringValue } = this.state;

    return (
      <input {...this.props}
        type='text'
        className='ab-input'
        onChange={::this.change}
        onBlur={::this.finish}
        aria-disabled={this.props.disabled}
        aria-readonly={this.props.readOnly}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        value={stringValue}/>
    )
  }

  change (e) {
    const value = e.target.value;

    if (value == null || value.trim() === '') {
      return this.props.onChange(null);
    }

    if (value !== this.props.value) {
      return this.props.onChange(value);
    }

    if (!isNan(value)) {
      this.current(e.target.value);
    }
  }

  finish (e) {
    let { stringValue } = this.state;

    this.props.onChange(stringValue);
  }

  current (value) {
    this.setState({
      stringValue: value
    });
  }
}
 
class NumberPicker extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
  }

  static defaultProps = {
    value: 3,
    onChange: () => {},
    min: 0,
    max: 0,
    step: 0
  }

  render () {
    let numberPickerClassName = classNames('ab-numberpicker');
    let { value } = this.props;

    // https://github.com/jquense/react-widgets/blob/master/src/NumberPicker.jsx
    return (
      <div
        className={numberPickerClassName}>
        <span className='ab-numberpicker__select'>
          <button className='ab-numberpicker__button'>
            <span className='pe-7s-angle-up' />
          </button>
          <button className='ab-numberpicker__button'>
            <span className='pe-7s-angle-down' /> 
          </button>
        </span>
        <NumberInput 
          value={value} />
      </div>
    )
  }
}
/*<div {...props }
        ref="element"
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex={'-1'}
        className={cx(className, 'rw-numberpicker', 'rw-widget', {
          'rw-state-focus':     this.state.focused,
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-rtl':             this.isRtl()
        })}>

        <span className='rw-select'>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.UP})}
            onMouseDown={this._mouseDown.bind(null, directions.UP)}
            onMouseUp={this._mouseUp.bind(null, directions.UP)}
            onClick={this._focus.bind(null, true)}
            disabled={val === this.props.max || this.props.disabled}
            aria-disabled={val === this.props.max || this.props.disabled}>

            <i className="rw-i rw-i-caret-up">
              <span className="rw-sr">{ this.props.messages.increment }</span>
            </i>
          </Btn>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.DOWN})}
            onMouseDown={this._mouseDown.bind(null, directions.DOWN)}
            onMouseUp={this._mouseUp.bind(null, directions.DOWN)}
            onClick={this._focus.bind(null, true)}
            disabled={val === this.props.min || this.props.disabled}
            aria-disabled={val === this.props.min || this.props.disabled}>

            <i className="rw-i rw-i-caret-down">
              <span className="rw-sr">{ this.props.messages.decrement }</span>
            </i>
          </Btn>
        </span>
        <Input
          ref='input'
          tabIndex={props.tabIndex}
          value={val}
          editing={this.state.focused}
          format={this.props.format}
          parse={this.props.parse}
          name={this.props.name}
          role='spinbutton'
          min={this.props.min}
          aria-valuenow={val}
          aria-valuemin={isFinite(this.props.min) ? this.props.min : null }
          aria-valuemax={isFinite(this.props.max) ? this.props.max : null }
          aria-disabled={ this.props.disabled }
          aria-readonly={ this.props.readonly }
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          onChange={this.change}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}/>
      </div>*/
export default NumberPicker;