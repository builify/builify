import React from 'react';
import classNames from 'classnames';
import ModalWrapper from '../common/wrapper';
import TTDOM from '../../../common/TTDOM';
import BottomNavigation from '../common/bottom-navigation';
import TabIcons from './tab-icons';
import { connect } from 'react-redux';
import { closeModal, addNotification } from '../../../actions';

class IconChange extends React.Component {
  static propTypes = {
    editTarget: React.PropTypes.any.isRequired,
    addNotification: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired
  };

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
    const { closeModal } = this.props;
    const className = classNames('ab-modal');
    const actions = [
      { label: 'Done', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper onClose={closeModal} ref='modalWrapper' className={className}>
        <TabIcons onSelect={::this.selectIcon}  />
        <BottomNavigation actions={actions} />
      </ModalWrapper>
    );
  }
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

export default connect(null, mapDispatchToProps)(IconChange);
