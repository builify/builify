import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { restartPage, closeModal } from '../../../Actions';
import classNames from 'classnames';
import _ from 'lodash';
import Button from '../Button';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';

class DialogClassic extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    title: PropTypes.string
  };

  dialogElement = null;

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  componentDidMount () {
    const { active } = this.props;
    const dialogRef = this.refs['dialog'];
    const dialogElement = ReactDOM.findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    if (active) {
      _.delay(() => {
        if (dialogElement) {
          dialogElement.classList.add('active');
        }
      }, 16);
    }
  }

  renderButtons (actions) {
    return _.map(actions, (action, idx) => {
      let className = 'ab-dialog__button';

      if (action.className) className += ` ${action.className}`;

      return (
        <Button
          key={idx}
          {...action}
          className={className} />
      )
    });
  }

  closeDialog () {
    const { onCloseModal } = this.props;
    let dialogElement = null;

    if (this.dialogElement !== null) {
      dialogElement = this.dialogElement;
    } else {
      const dialogRef = this.refs['dialog'];
      dialogElement = ReactDOM.findDOMNode(dialogRef);
    }

    if (dialogElement) {
      dialogElement.classList.remove('active');
    }

    _.delay(() => {
      return onCloseModal();
    }, 300);
  }

  noClick (e) {
    this.closeDialog();
  }

  yesClick (e) {
    const { onRestart } = this.props;

    this.closeDialog();

    return onRestart();
  }

  renderActions () {
    const actions = [
      { label: 'No', onClick: ::this.noClick },
      { label: 'Yes', onClick: ::this.yesClick }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const className = classNames('ab-dialog', 'medium');

    return (
      <DialogWrapper
        className={className}
        ref='dialog'>
        <DialogBody title='Restart'>
          <p>Do you want to go back to start screen and save current page?</p>
        </DialogBody>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </DialogWrapper>
    );
  }
}

export default DialogClassic;
