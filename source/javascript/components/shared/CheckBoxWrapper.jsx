import { connect } from 'react-redux';
import { getString } from '../../Common/Localization';
import { toggleBaseline } from '../../Actions';
import React from 'react';
import Checkbox from './Checkbox';

class CheckBoxWrapper extends React.Component {
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
    const label = getString(item.label);

    return (
      <Checkbox
        label={label}
        checked={checked}
        onChange={::this.handleChange} />
    );
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
