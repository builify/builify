import React from 'react';
import _has from 'lodash/has';
import Checkbox from './checkbox';
import localization from '../../modules/tt-localization';
import { connect } from 'react-redux';
import { toggleBaseline } from '../../actions';

class CheckBoxWrapper extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    toggleBaseline: React.PropTypes.func.isRequired
  };

  state = {
    checked: false
  };

  componentWillMount () {
    const { item } = this.props;
    const { state } = item;

    this.setState({
      checked: state
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
  }

  render () {
    const { item } = this.props;
    const { checked } = this.state;
    const label = _has(item, 'label') ? localization(item.label) : '';

    return <Checkbox label={label} checked={checked} onChange={::this.handleChange} />;
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleBaseline: (checked) => {
      dispatch(toggleBaseline(checked));
    }
  };
}

export default connect(null, mapDispatchToProps)(CheckBoxWrapper);
