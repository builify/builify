import React from 'react';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import BottomNavigation from '../common/bottom-navigation';

export default class Dialog extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    children: React.PropTypes.any,
    actions: React.PropTypes.array
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const { actions, title, children } = this.props;
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref='modalWrapper' onClose={this.props.closeModal} className={className}>
        <div>
          <section role='body' className='ab-dialog__body'>
            { title && <h6 className='ab-dialog__title'>{title}</h6> }
            { children }
          </section>
          { actions && <BottomNavigation actions={actions} /> }
        </div>
      </ModalWrapper>
    );
  }
}
