import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import BottomNavigation from '../common/bottom-navigation';

export default class Dialog extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.any,
    actions: PropTypes.array
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const { actions, title, children } = this.props;
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref="modalWrapper" onClose={this.props.closeModal} className={className}>
        <div>
          <section role="body" className={classNames('dialog__body')}>
            { title && <h6 className={classNames('dialog__title')}>{ title }</h6> }
            { children }
          </section>
          { actions && <BottomNavigation actions={actions} /> }
        </div>
      </ModalWrapper>
    );
  }
}
