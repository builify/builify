import React from 'react';
import { connect } from 'react-redux';
import { getProperty } from '../../Common/Common';
import { getString } from '../../Common/Localization';

class Size extends React.Component {
  state = {
    value: 0,
    isIE: false,
    label: ''
  };

  componentWillMount () {
    const { template, item } = this.props;
    const { label, min, max } = item;
    const defaultLabel = getString(label);
    const defaultValue = getProperty(template, label);
    const isIE = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

    this.setState({
      value: defaultValue ? +defaultValue : 0,
      isIE: isIE,
      label: defaultLabel,
      min: min,
      max: max
    });
  }

  changeEvent (e) {
    e.preventDefault();

    let { target } = e;
    let { value } = target;

    this.setState({
      ...this.state,
      value: +value
    });
  }

  render () {
    const { value, isIE, label, min, max } = this.state;

    return (
      <div
        className='ab-size'>
        <label>{label}</label>
        <input
          onMouseUp={isIE ? ::this.changeEvent : () => {}}
          onChange={!isIE ? ::this.changeEvent : () => {}}
          defaultValue={value}
          step={1}
          min={min}
          max={max}
          type='range'
          name='range' />
        <div className='ab-size__output'>
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

export default connect(mapStateToProps)(Size);
