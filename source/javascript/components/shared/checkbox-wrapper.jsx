import React from 'react';
import PropTypes from 'prop-types';
import { has as _has } from 'lodash';
import { connect } from 'react-redux';
import Checkbox from './check-box';
import localization from '../../common/localization';
import { toggleBaseline } from '../../actions';

class CheckBoxWrapper extends React.Component {
  static propTypes = {
    drawBaseline: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    toggleBaseline: PropTypes.func.isRequired
  };

  state = {
    checked: false
  };

  shouldComponentUpdate (nextProps, nextState) {
    return (this.state.checked !== nextState.checked);
  }

  componentWillMount () {
    this.setState({
      checked: this.props.drawBaseline
    });
  }

  handleChange () {
    const { item } = this.props;
    const newChecked = !this.state.checked;

    this.setState({
      checked: newChecked
    });

    if (item.onClick === 'toggle.baseline') {
      return this.props.toggleBaseline(newChecked);
    }

    return null;
  }

  render () {
    const { item } = this.props;
    const { checked } = this.state;
    const label = _has(item, 'label') ? localization(item.label) : '';

    return <Checkbox label={label} checked={checked} onChange={::this.handleChange} />;
  }
}

function mapStateToProps (state) {
  const { template } = state;
  const { drawBaseline } = template;

  return {
    drawBaseline
  };
}

function mapDispatchToProps (dispatch) {
  return {
    toggleBaseline: (checked) => {
      dispatch(toggleBaseline(checked));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxWrapper);
