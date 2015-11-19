import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { restartPage, closeModal } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Input from '../Input';
import Button from '../Button';
import Dropdown from '../Dropdown';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';

class DialogLinkChange extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
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
    const { editTarget } = this.props;
    const className = cx('ab-dialog', 'medium', 'linkchange');
    const targets = [
      { value: '_blank', label: 'Open in new tab'},
      { value: '_self', label: 'Open in current tab'}
    ];
    let linkHref = '#';
    let linkName = '';
    let linkTarget = '_self';

    if (editTarget !== undefined && editTarget !== null) {
      const target = editTarget.target;

      linkName = editTarget.innerText;
      linkHref = editTarget.getAttribute('href');
      linkTarget = target.length === 0 ? linkTarget : target;
    }

    return (
      <DialogWrapper
        ref='dialog'
        className={className}>
        <section role='body' className='ab-dialog__body'>
          <h6 className='ab-dialog__title'>Change link</h6>
          <div className='input'>
            <span className='input__title'>Edit link name:</span>
            <Input
              ref='link-name'
              type='text'
              label='Link Name'
              value={linkName}
              floating={false} />
            <span className='input__title'>Edit link url:</span>
            <Input
              ref='link-href'
              type='text'
              label='Link URL'
              value={linkHref}
              floating={false} />
            <span className='input__title'>Edit image target:</span>
            <Dropdown
              ref='link-target'
              className='dropdown'
              auto
              dataSource={targets}
              value={linkTarget} />
          </div>
        </section>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </DialogWrapper>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogLinkChange);
