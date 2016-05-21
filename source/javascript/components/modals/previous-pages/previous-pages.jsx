import React from 'react';
import _map from 'lodash/map';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Time from '../../../common/time';
import Scrollbar from '../../shared/scrollbar';
import TTStorage from '../../../modules/tt-storage';
import { loadPreviousPage, closeModal } from '../../../actions';
import { connect } from 'react-redux';

class Content extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    onClose: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired
  };

  renderPageItems (pages) {
    const { onClose, loadPreviousPage } = this.props;

    return _map(pages, (page, idx) => {
      const { pageID, pageTitle, pageFileName } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
      const pageText = `${pageFileName} (${formatedTime}): ${pageTitle}`;
      const onClick = () => {
        loadPreviousPage(pageID);
        return onClose();
      };

      return (
        <div onClick={onClick} key={idx} className={classNames('modal__pageitem')}>
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
      <ModalTab title='Select Page to Load'>
        <div className={classNames('modal__tab')}>
          <aside className={classNames('modal__tabside', 'sec')}>
            <h2>Pages</h2>
            <p>{ pagesInformation }</p>
            <p onClick={() => {
              TTStorage.flush();
            }}>Flush Storage</p>
          </aside>
          <main className={classNames('modal__tabcontent', 'sec')}>
            <Scrollbar height={380}>
              <div className={classNames('modal__tabpages')}>
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
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const { active, builder} = this.props;
    const className = classNames(['modal', 'modal__small']);
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={this.props.closeModal}
        active={active}
        className={className}>
        <Content
          onClose={::this.closeDialog}
          loadPreviousPage={this.props.loadPreviousPage}
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
    closeModal: () => {
      dispatch(closeModal());
    },

    loadPreviousPage: (page) => {
      dispatch(loadPreviousPage(page));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PreviousPages);
