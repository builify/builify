import React from 'react';
import Icon from '../../shared/icon';
import classNames from '../../../common/classnames';
import { connect } from 'react-redux';
import { openTab } from '../../../actions';

class SideTabOpener extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.string.isRequired,
    openTab: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  clickEvent () {
    return this.props.openTab(this.props.onClick);
  }

  render () {
    const { title } = this.props;

    return (
      <div className={classNames('item', 'link')} onClick={::this.clickEvent}>
        { title && <span>{ title }</span> }
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
