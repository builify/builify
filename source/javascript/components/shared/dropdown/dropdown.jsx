import React from 'react';
import PropTypes from 'prop-types';
import {
  map as _map,
  find as _find,
  isFunction as _isFunction,
  isEmpty as _isEmpty,
  isObject as _isObject
} from 'lodash';
import classNames from '../../../common/classnames';
import Scrollbar from '../scrollbar';

export default class FontPicker extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    previews: PropTypes.bool,
    activeColor: PropTypes.string,
    value: PropTypes.string,
    height: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string
  };

  static defaultProps = {
    label: '',
    previews: true,
    options: [
      { text: 'Arial', value: 'Arial' },
      { text: 'Arial Narrow', value: 'Arial Narrow' },
      { text: 'Arial Black', value: 'Arial Black' },
      { text: 'Courier New', value: 'Courier New' },
      { text: 'Georgia', value: 'Georgia' },
      { text: 'Lucida Console', value: 'Lucida Console' },
      { text: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode' },
      { text: 'Tahoma', value: 'Tahoma' },
      { text: 'Times New Roman', value: 'Times New Roman' },
      { text: 'Verdana', value: 'Verdana' }
    ],
    activeColor: '#64B5F6',
    value: '',
    height: 200,
    onChange: () => {}
  };

  state = {
    isOptionsVisible: false,
    selectedOption: this.props.value
  };

  onWrapperClick () {
    if (!this.state.isOptionsVisible && this.props.options.length === 0) {
      return;
    }

    this.setState({
      isOptionsVisible: !this.state.isOptionsVisible
    });
  }

  onOptionClick (e, value) {
    e.stopPropagation();

    if (this.state.isOptionsVisible === false) {
      return;
    }

    if (_isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }

    this.setState({
      isOptionsVisible: false,
      selectedOption: value
    });
  }

  onRipple (e) {
    const target = e.target;
    const div = document.createElement('div');
    const targetOffset = target.getBoundingClientRect();
    const xPos = e.pageX - targetOffset.left;
    const yPos = e.pageY - targetOffset.top;

    e.stopPropagation();

    div.className = classNames('dropdown__ripple--active');
    div.style.top = `${parseInt(yPos - targetOffset.height / 2)}px`;
    div.style.left = `${parseInt(xPos - targetOffset.height)}px`;

    target.appendChild(div);

    setTimeout(function(){
      target.removeChild(div);
    }, 500);
  }

  renderOptions () {
    const { options, activeColor, previews } = this.props;
    const stateValue = this.props.value || this.state.selectedOption;

    if (options.length === 0) {
      return null;
    }

    return _map(options, (option, i) => {
      const { text, value } = option;

      var style = {};

      if (value === stateValue) {
        style.color = activeColor;
      }

      if (previews) {
        style.fontFamily = value;
      }

      return (
        <div
          className={classNames(['dropdown__option', 'dropdown__ripple'])}
          style={style}
          key={i}
          onMouseDown={(e) => this.onRipple(e)}
          onMouseUp={(e) => this.onOptionClick(e, value)}
          onClick={(e) => this.onOptionClick(e, value)}>
          <span>{ text }</span>
        </div>
      );
    });
  }

  render () {
    const { label } = this.props;
    let value = this.props.value || this.state.selectedOption;
    const selectedOptionsClassName = classNames({
      'dropdown__label': _isEmpty(this.state.selectedOption),
      'dropdown__label--float': !_isEmpty(this.state.selectedOption)
    });
    const optionsClassName = classNames({
      'dropdown__options': this.state.isOptionsVisible,
      'dropdown__options--hidden': !this.state.isOptionsVisible
    });
    const valueObject = _find(this.props.options, { value: value });

    if (_isObject(valueObject)) {
      const { text } = valueObject;
      value = text;
    }

    return (
			<div className={classNames('dropdown', this.props.className)}>
				<div className={classNames('dropdown__wrapper')} onClick={::this.onWrapperClick}>
					<div className={selectedOptionsClassName}>{ label }</div>
					<div className={classNames('dropdown__selected-option')}>
						<span>{ value }</span>
					</div>
					<div className={classNames('dropdown__button')} />
					<div className={optionsClassName}>
            <Scrollbar height={this.props.height} >
              { this.renderOptions() }
            </Scrollbar>
					</div>
				</div>
			</div>
		);
  }
}
