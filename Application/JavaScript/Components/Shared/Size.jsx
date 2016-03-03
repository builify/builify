import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getProperty } from '../../Common/Common';
import { getString } from '../../Common/Localization';
import { changeBaseFontSize, changeBaselineValue } from '../../Actions';
import Events from '../../Common/Events';

class Size extends React.Component {
  _item = null;

  state = {
    value: 0,
    step: 1,
    isIE: false,
    label: ''
  };

  componentWillMount () {
    const { template, item } = this.props;
    const { label, min, max, step } = item;
    const defaultLabel = getString(label);
    const defaultValue = getProperty(template, label);
    const isIE = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

    this._item = item;

    this.setState({
      value: defaultValue ? +defaultValue : 0,
      isIE: isIE,
      label: defaultLabel,
      min: min,
      max: max,
      step: step
    });
  }

  changeEvent (e) {
    const { sizeType } = this._item;
    let { target } = e;
    let { value } = target;

    Events.pauseEvent(e);

    this.setState({
      ...this.state,
      value: +value
    });

    if (sizeType === 'basefont') {
      return this.props.onBaseFontSizeChange(+value);
    } else if (sizeType === 'baseline') {
      return this.props.onBaselineChange(+value);
    }
  }

  render () {
    const { value, isIE, label, min, max, step } = this.state;
    const className = classNames('ab-size__output', {
      'px': !!(this._item.sizeType === 'basefont')
    });

    return (
      <div
        className='ab-size'>
        <label>{label}</label>
        <input
          onMouseUp={isIE ? ::this.changeEvent : () => {}}
          onChange={!isIE ? ::this.changeEvent : () => {}}
          defaultValue={value}
          step={step}
          min={min}
          max={max}
          type='range'
          name='range' />
        <div className={className}>
          {value}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onBaseFontSizeChange: (value) => {
      dispatch(changeBaseFontSize(value));
    },

    onBaselineChange: (value) => {
      dispatch(changeBaselineValue(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Size);
