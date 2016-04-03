import { connect } from 'react-redux';
import { getProperty } from '../../Common/Common';
import { getString } from '../../Common/Localization';
import { changeBaseFontSize, changeBaselineValue } from '../../Actions';
import React from 'react';
import classNames from 'classnames';
import SliderInput from './SliderInput';

class SliderInputWrapper extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  state = {
    value: 10
  };

  componentWillMount () {
    const { template, data } = this.props;
    const { min, max, step, label } = data;
    const defaultLabel = getString(label);
    const defaultValue = getProperty(template, label) || this.state.value;

    this.setState({
      ...this.state,
      min: min,
      max: max,
      step: step,
      label: defaultLabel,
      value: defaultValue
    });
  }

  onChange (value) {
    const { data } = this.props;
    const { sizeType } = data;

    this.setState({
      ...this.state,
      value: value
    });

    if (sizeType === 'basefont') {
      return this.props.changeBaseFontSize(+value);
    } else if (sizeType === 'baseline') {
      return this.props.changeBaselineValue(+value);
    }
  }

  render () {
    const { min, max, step, label, value } = this.state;
    const className = classNames('ab-size__output', {
      'px': !!(this.props.data.sizeType === 'basefont')
    });

    return (
      <div
        className='ab-size'>
        <label>{label}</label>
        <SliderInput
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={::this.onChange} />
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
    changeBaseFontSize: (value) => {
      dispatch(changeBaseFontSize(value));
    },

    changeBaselineValue: (value) => {
      dispatch(changeBaselineValue(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderInputWrapper);
