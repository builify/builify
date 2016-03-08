import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import BottomNavigation from '../ModalBottomNavigation';
import TabIcons from './TabIcons';
import { closeModal } from '../../../Actions';
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
    }
  }

  render () {
    const {
      active,
      builderConfiguration,
      onCloseModal
    } = this.props;
    const className = classNames('ab-modal');
    const actions = [
      { label: 'Done', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper
        onClose={onCloseModal}
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
    onCloseModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IconChange);
