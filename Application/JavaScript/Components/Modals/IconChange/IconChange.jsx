import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';
import ModalWrapper from '../Common/Wrapper';
import BottomNavigation from '../Common/BottomNavigation';
import TabIcons from './TabIcons';
import { closeModal, addNotification } from '../../../Actions';
import TTDOM from '../../../Common/TTDOM';

class IconChange extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  selectIcon (data) {
    const { editTarget } = this.props;
    const { iconClass, icon } = data;

    if (iconClass === 'fa') {
      TTDOM.element.classes.alter(editTarget, 'fa-*', icon);

      return this.props.addNotification({
        message: 'Icon changed!',
        title: 'Icon Change',
        level: 'info',
        autoDismiss: 3
      });
    }
  }

  render () {
    const { active, builderConfiguration, closeModal } = this.props;
    const className = classNames('ab-modal');
    const actions = [
      { label: 'Done', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper
        onClose={closeModal}
        active={active}
        ref='modalWrapper'
        className={className}>
        <TabIcons
          onSelect={::this.selectIcon}
          builderConfiguration={builderConfiguration} />
        <BottomNavigation
          actions={actions} />
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },

    addNotification: (notification) => {
      dispatch(addNotification(notification));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IconChange);
