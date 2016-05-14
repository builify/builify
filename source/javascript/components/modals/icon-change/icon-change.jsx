import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';
import ModalWrapper from '../common/wrapper';
import BottomNavigation from '../common/bottom-navigation';
import TabIcons from './tab-icons';
import { closeModal, addNotification } from '../../../actions';
import TTDOM from '../../../common/TTDOM';

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
