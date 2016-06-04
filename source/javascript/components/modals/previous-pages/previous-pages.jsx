import React from 'react';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import BottomNavigation from '../common/bottom-navigation';
import Content from './content';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions';

class PreviousPages extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const className = classNames(['modal', 'modal__small']);
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper ref='modalWrapper' onClose={this.props.closeModal} className={className}>
        <Content onClose={::this.closeDialog} />
        <BottomNavigation actions={actions} />
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(PreviousPages);
