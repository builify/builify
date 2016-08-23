import React from 'react';
import _isFunction from 'lodash/isfunction';
import _map from 'lodash/map';
import classNames from '../../../common/classnames';
import Scrollbar from '../scrollbar';

export default class FontPicker extends React.Component {
  static propTypes = {
    options: React.PropTypes.array,
    label: React.PropTypes.string,
    previews: React.PropTypes.bool,
    activeColor: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
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
    onChange: () => {}
  };

  state = {
    isOptionsVisible: false,
    selectedOption: this.props.value
  };

  onWrapperClick () {
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
    var value = this.props.value || this.state.selectedOption;
    const selectedOptionsClassName = classNames({
      'dropdown__label': this.state.selectedOption === '',
      'dropdown__label--float': this.state.selectedOption !== ''
    });
    const optionsClassName = classNames({
      'dropdown__options': this.state.isOptionsVisible,
      'dropdown__options--hidden': !this.state.isOptionsVisible
    });

    return (
			<div className={classNames('dropdown')}>
				<div className={classNames('dropdown__wrapper')} onClick={::this.onWrapperClick}>
					<div className={selectedOptionsClassName}>{ label }</div>
					<div className={classNames('dropdown__selected-option')}>
						<span>{ value }</span>
					</div>
					<div className={classNames('dropdown__button')} />
					<div className={optionsClassName}>
            <Scrollbar height={200} >
              { this.renderOptions() }
            </Scrollbar>
					</div>
				</div>
			</div>
		);
  }
}
