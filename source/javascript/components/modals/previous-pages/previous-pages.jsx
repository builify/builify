import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import ModalWrapper from '../common/wrapper';
import BottomNavigation from '../common/bottom-navigation';
import _map from 'lodash/map';
import ModalTab from '../common/tab';
import Time from '../../../common/time';
import Scrollbar from '../../shared/scrollbar';
import Icon from '../../shared/icon';
import { connect } from 'react-redux';
import { loadPreviousPage, deletePage, closeModal, flushPagesInStorage, importPage } from '../../../actions';

class PreviousPages extends React.Component {
  static propTypes = {
    pages: React.PropTypes.array.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    flushPagesInStorage: React.PropTypes.func.isRequired,
    importPage: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired,
    deletePage: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return true;
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  renderPageItems () {
    const { pages } = this.props;

    return _map(pages, (page, idx) => {
      const { pageID, pageTitle, pageFileName } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss yy/M/d');
      const pageText = `${pageFileName} (${formatedTime}): ${pageTitle}`;
      const onClick = () => {
        this.props.loadPreviousPage(pageID);
        return this.closeDialog();
      };
      const onRemoveClick = () => {
        return this.props.deletePage(pageID);
      };

      return (
        <div
          onClick={onClick}
          key={idx}
          className={classNames('modal__pageitem')}>
          <span>{ pageText }</span>
          <Icon
            title={localization('remove')}
            onClick={onRemoveClick}
            icon='remove'
            className={classNames('modal__pageremove')} />
        </div>
      );
    });
  }

  render () {
    const className = classNames(['modal', 'modal__small']);
    const importPageClick = (result) => {
      this.closeDialog();
      return this.props.importPage(result);
    };
    const actions = [
      { label: localization('delete all pages'), onClick: this.props.flushPagesInStorage },
      { label: localization('import page'), onFileLoad: importPageClick },
      { label: localization('cancel'), onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper ref='modalWrapper' onClose={this.props.closeModal} className={className}>
        <ModalTab title='Select or import previous page' onClose={::this.closeDialog}>
          <div className={classNames('modal__tab')}>
            <Scrollbar height={380}>
              <div className={classNames('modal__tabpages')}>
                { this.renderPageItems() }
              </div>
            </Scrollbar>
          </div>
        </ModalTab>
        <BottomNavigation actions={actions} />
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  const { builder } = state;
  const { pages } = builder;

  return {
    pages: pages
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: function () {
      dispatch(closeModal());
    },

    flushPagesInStorage: function () {
      dispatch(flushPagesInStorage());
    },

    importPage: function (data) {
      dispatch(importPage(data));
    },

    loadPreviousPage: function (id) {
      dispatch(loadPreviousPage(id));
    },

    deletePage: function (id) {
      dispatch(deletePage(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousPages);
