import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ModalWrapper from '../ModalWrapper';
import { closeModal } from '../../../Actions';

class PageSettings extends React.Component {
  render () {
    const { active, onCloseModal } = this.props;
    const className = classNames('ab-modal', 'ab-modal__small');

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={onCloseModal}
        active={active}
        className={className}>
        <h1>Ha</h1>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(PageSettings);
