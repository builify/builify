import React from 'react';
import Icon from '../icon';
import classNames from '../../../common/classnames';
import { connect } from 'react-redux';
import { openTab } from '../../../actions';

class SideTabOpener extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.string.isRequired,
    openTab: React.PropTypes.func.isRequired
  };

  clickEvent () {
    return this.props.openTab(this.props.onClick);
  }

  render () {
    return (
      <div className={classNames('item', 'link')} onClick={::this.clickEvent}>
        <span>{this.props.title}</span>
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
