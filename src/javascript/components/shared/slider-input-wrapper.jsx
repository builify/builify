import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  round as _round,
  toNumber as _toNumber,
  at as _at
} from 'lodash';
import classNames from '../../common/classnames';
import localization from '../../common/localization';
import SliderInput from './slider-input';
import { changeBaseFontSize, changeBaselineValue } from '../../actions';

class SliderInputWrapper extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    changeBaseFontSize: PropTypes.func.isRequired,
    changeBaselineValue: PropTypes.func.isRequired,
    template: PropTypes.object.isRequired
  };

  state = {
    value: 10
  };

  shouldComponentUpdate (nextProps, nextState) {
    return (nextState.value !== this.state.value);
  }

  componentWillMount () {
    const { template, item } = this.props;
    const { min, max, step, label: itemLabel, onChange } = item;
    const label = localization(itemLabel);
    let value = this.state.value;
    let text = null;

    if (onChange === 'change.basefont') {
      value = _toNumber(_at(template, 'design.typography.size.basefont'));
      text = value;
    } else if (onChange === 'change.baseline') {
      const fontsizeValue = _toNumber(_at(template, 'design.typography.size.basefont'));

      value = _toNumber(_at(template, 'design.typography.size.baseline'));

      text = `${value} (${_round(fontsizeValue * value, 2)}px)`;
    }

    this.setState({
      ...this.state,
      min,
      max,
      step,
      label,
      value,
      text
    });
  }

  onChange (value) {
    const { item } = this.props;
    const { onChange } = item;

    if (onChange === 'change.basefont') {
      this.setState({
        ...this.state,
        value,
        text: value
      });

      return this.props.changeBaseFontSize(value);
    } else if (onChange === 'change.baseline') {
      const { template } = this.props;
      const fontsizeValue = _toNumber(_at(template, 'design.typography.size.basefont'));

      this.setState({
        ...this.state,
        value,
        text: `${value} (${_round(fontsizeValue * value)}px)`
      });

      return this.props.changeBaselineValue(value);
    }
  }

  render () {
    const { min, max, step, label, value, text } = this.state;
    const className = classNames('size__output', {
      px: !!(this.props.item.onChange === 'change.basefont')
    });

    return (
      <div className={classNames('size')}>
        <label>{label}</label>
        <SliderInput
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={::this.onChange} />
        <div className={className}>
          <span>{ text }</span>
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
