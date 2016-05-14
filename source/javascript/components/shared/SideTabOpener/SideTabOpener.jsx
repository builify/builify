import { connect } from 'react-redux';
import { openTab } from '../../../Actions';
import React from 'react';
import Icon from '../Icon';

class SideTabOpener extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.string.isRequired // Better prop. naming?
  };

  clickEvent () {
    const { onClick: targetName } = this.props;

    return this.props.openTab(targetName);
  }

  render () {
    const { title } = this.props;

    return (
      <div
        className='ab-item link'
        onClick={::this.clickEvent}>
        <span>{title}</span>
        <Icon icon='arrow-forward' />
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openTab: (target) => {
      dispatch(openTab(target));
    }
  };
}

export default connect(null, mapDispatchToProps)(SideTabOpener);
