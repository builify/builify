import React from 'react';
import _map from 'lodash/map';
import classNames from '../../../common/classnames';
import Time from '../../../common/time';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import TablePages from './table-pages';
import Scrollbar from '../../shared/scrollbar';
import { connect } from 'react-redux';
import { closeModal, addNotification, downloadPages } from '../../../actions';

class DownloadPages extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    addNotification: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    downloadPages: React.PropTypes.func.isRequired
  };

  _pages = [];

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  componentWillMount () {
    const { builder } = this.props;
    const { pages } = builder;

    _map(pages, (page) => {
      const { pageID, pageTitle, pageFileName } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss d/M/y');
      const pageText = `${pageTitle} (${pageFileName}) - (${formatedTime})`;

      this._pages.push({
        name: pageText
      });
    });
  }

  downloadClick () {
    const selectedPages = this.refs['pages'].getSelected();
    this.closeDialog();
    return this.props.downloadPages(selectedPages);
  }

  render () {
    const { closeModal } = this.props;
    const className = classNames(['modal', 'modal__small']);
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Download', onClick: ::this.downloadClick }
    ];
    const pagesModel = {
      name: { type: String }
    };

    return (
      <ModalWrapper ref='modalWrapper' onClose={closeModal} className={className}>
        <ModalTab title='Download Selected Pages'>
          <div className={classNames('modal__tab')}>
            <Scrollbar height={380}>
              <div className={classNames(null, 'p-x-3', 'p-y-3')}>
                <TablePages ref='pages' model={pagesModel} source={this._pages} />
              </div>
            </Scrollbar>
          </div>
          <BottomNavigation actions={actions} />
        </ModalTab>
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
    downloadPages: (pages) => {
      dispatch(downloadPages(pages));
    },

    closeModal: () => {
      dispatch(closeModal());
    },

    addNotification: (notification) => {
      dispatch(addNotification(notification));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPages);
