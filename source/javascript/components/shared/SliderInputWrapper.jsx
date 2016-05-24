import React from 'react';
import _at from 'lodash/at';
import classNames from '../../common/classnames';
import localization from '../../modules/tt-localization';
import SliderInput from './sliderInput';
import { connect } from 'react-redux';
import { changeBaseFontSize, changeBaselineValue } from '../../actions';

class SliderInputWrapper extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    changeBaseFontSize: React.PropTypes.func.isRequired,
    changeBaselineValue: React.PropTypes.func.isRequired,
    template: React.PropTypes.object.isRequired
  };

  state = {
    value: 10
  };

  componentWillMount () {
    const { template, item } = this.props;
    const { min, max, step, label, onChange } = item;
    const defaultLabel = localization(label);
    let defaultValue = this.state.value;

    if (onChange === 'change.basefont') {
      defaultValue = _at(template, 'design.typography.size.basefont');
    } else if (onChange === 'change.baseline') {
      defaultValue = _at(template, 'design.typography.size.baseline');
    }

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
    const { item } = this.props;
    const { onChange } = item;

    value = +value;

    this.setState({
      ...this.state,
      value: value
    });

    if (onChange === 'change.basefont') {
      return this.props.changeBaseFontSize(value);
    } else if (onChange === 'change.baseline') {
      return this.props.changeBaselineValue(value);
    }
  }

  render () {
    const { min, max, step, label, value } = this.state;
    const className = classNames('size__output', {
      'px': !!(this.props.item.onChange === 'change.basefont')
    });

    return (
      <div
        className={classNames('size')}>
        <label>{label}</label>
        <SliderInput
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={::this.onChange} />
        <div className={className}>
          <span>{ value }</span>
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
