import React from 'react';
import _ from 'lodash';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import ModalTab from '../ModalTab';
import BottomNavigation from './BottomNavigation';
import Time from '../../../Common/Time';
import Events from '../../../Common/Events';
import Button from '../../Shared/Button';
import Scrollbar from '../../Shared/Scrollbar';
import { loadPreviousPage, closeModal } from '../../../Actions';

class Content extends React.Component {
  renderPageItems (pages) {
    const { onClose, onLoadPreviousPage } = this.props;

    return _.map(pages, (page, idx) => {
      const { pageID, pageTitle, pageFileName } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
      const pageText = `${pageFileName} (${formatedTime}): ${pageTitle}`;

      return (
        <div
          onClick={(e) => {
            onLoadPreviousPage(pageID);
            return onClose();
          }}
          key={idx}
          className='ab-modal__pageitem'>
          <span>{pageText}</span>
        </div>
      );
    });
  }

  render () {
    const { builder } = this.props;
    const { pages } = builder;
    const pagesInformation = `You have ${pages.length} pages in localstorage.`;

    return (
      <ModalTab
        title='Select Page to Load'>
        <div className='ab-modal__tab'>
          <aside className='ab-modal__tabside sec'>
            <h2>Pages</h2>
            <p>{ pagesInformation }</p>
          </aside>
          <main className='ab-modal__tabcontent sec'>
            <Scrollbar height={380}>
              <div className='ab-modal__tabpages'>
                { this.renderPageItems(pages) }
              </div>
            </Scrollbar>
          </main>
        </div>
      </ModalTab>
    );
  }
}

class PreviousPages extends React.Component {
  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const { active, builder, onCloseModal, onLoadPreviousPage } = this.props;
    const className = ClassNames('ab-modal', 'ab-modal__small');

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={onCloseModal}
        active={active}
        className={className}>
        <Content
          onClose={::this.closeDialog}
          onLoadPreviousPage={onLoadPreviousPage}
          builder={builder} />
        <BottomNavigation
          onClose={::this.closeDialog} />
      </ModalWrapper>
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
)(PreviousPages);

/*

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { loadPreviousPage, closeModal } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Time from '../../../Common/Time';
import Events from '../../../Common/Events';
import Button from '../../Shared/Button';


import ModalWrapper from '../ModalWrapper';

class DialogPreviousPages extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  };

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
    return this.refs['modalWrapper'].closeDialog();
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

  renderPages () {
    const { builder, onLoadPreviousPage } = this.props;
    const { pages } = builder;

    return _.map(pages, (page, idx) => {
      const { pageID, pageTitle } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
      const pageText = `${pageTitle} - (${formatedTime})`;

      return (
        <div
          onClick={(e) => {
            Events.pauseEvent(e);

            this.closeDialog();

            return onLoadPreviousPage(pageID);
          }}
          key={idx}
          className='pageitem'>
          <span>{pageText}</span>
        </div>
      );
    });
  }

  render () {
    const className = cx('ab-dialog', 'medium');

    return (
      <ModalWrapper
        className={className}
        ref='dialog'>
        <section role='body' className='ab-dialog__body'>
          <h6 className='ab-dialog__title'>Select page to load</h6>
          { this.renderPages() }
        </section>
        <nav role='navigation' className='ab-dialog__navigation'>
          { this.renderActions() }
        </nav>
      </ModalWrapper>
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
*/
