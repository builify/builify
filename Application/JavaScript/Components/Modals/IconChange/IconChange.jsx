import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import ModalTab from '../ModalTab';
import BottomNavigation from '../ModalBottomNavigation';
import TabIcons from './TabIcons';
import { closeModal } from '../../../Actions';

class IconChange extends React.Component {
  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const {
      active,
      builderConfiguration,
      builder,
      editTarget,
      onUploadImage,
      onCloseModal
    } = this.props;
    const className = classNames('ab-modal');

    console.log(builderConfiguration)

    return (
      <ModalWrapper
        onClose={onCloseModal}
        active={active}
        ref='modalWrapper'
        className={className}>
        <ModalTab
          title='Choose Icon'>
          <TabIcons />
        </ModalTab>
        <BottomNavigation
          onClose={::this.closeDialog}/>
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
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
