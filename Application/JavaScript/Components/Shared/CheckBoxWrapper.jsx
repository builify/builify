import React from 'react';
import { connect } from 'react-redux';
import { getString } from '../../Common/Localization';
import { toggleBaseline } from '../../Actions';
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
    const { item, onToggleBaseline } = this.props;
    const { action } = item;
    const newChecked = !this.state.checked;

    this.setState({
      checked: newChecked
    });

    if (action === 'toggle.baseline') {
      return onToggleBaseline(newChecked);
    }
  }

  render () {
    const { checked } = this.state;
    const { item } = this.props;
    const { text } = item;
    const label = getString(text);

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
    onToggleBaseline: (checked) => {
      dispatch(toggleBaseline(checked));
    }
  };
}

export default connect(null, mapDispatchToProps)(CheckBoxWrapper);
