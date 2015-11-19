import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { loadPreviousPage, closeModal } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Time from '../../../Common/Time';
import Events from '../../../Common/Events';
import Button from '../Button';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';

class DialogPreviousPages extends Component {
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
      window.setTimeout(() => {
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

    window.setTimeout(() => {
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
    const { onLoadPreviousPage, builder } = this.props;
    const { pages } = builder;
    const className = cx('ab-dialog', 'medium');

    return (
      <DialogWrapper
        className={className}
        ref='dialog'>
        <section role='body' className='ab-dialog__body'>
          <h6 className='ab-dialog__title'>Select page to load</h6>
          {_.map(pages, (page, idx) => {
            const { id, title } = page;
            const time = new Date(+(id.split('-')[1]) * 1000);
            const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
            const pageText = `${title} - (${formatedTime})`;

            return (
              <div
                onClick={(e) => {
                  Events.pauseEvent(e);

                  this.closeDialog();

                  return onLoadPreviousPage(id);
                }}
                key={idx}
                className='pageitem'>
                <span>{pageText}</span>
              </div>
            )
          })}
        </section>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </DialogWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },

    onLoadPreviousPage: (page) => {
      dispatch(loadPreviousPage(page));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogPreviousPages);
