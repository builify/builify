import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ModalWrapper from '../Common/Wrapper';
import ModalTab from '../Common/Tab';
import BottomNavigation from '../Common/BottomNavigation';
import Time from '../../../Common/Time';
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
          onClick={() => {
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
    const className = classNames('ab-modal', 'ab-modal__small');
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog }
    ];

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
        <BottomNavigation actions={actions} />
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },

    onLoadPreviousPage: (page) => {
      dispatch(loadPreviousPage(page));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PreviousPages);
