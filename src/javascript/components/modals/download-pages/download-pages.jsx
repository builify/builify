import React from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'lodash';
import { connect } from 'react-redux';
import classNames from '../../../common/classnames';
import Time from '../../../common/time';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import TablePages from './table-pages';
import Scrollbar from '../../shared/scrollbar';
import * as Actions from '../../../actions';

class DownloadPages extends React.Component {
  static propTypes = {
    builder: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    downloadPages: PropTypes.func.isRequired
  };

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

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  _pages = [];

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
      <ModalWrapper ref="modalWrapper" onClose={closeModal} className={className}>
        <ModalTab title="Select Pages to Download">
          <div className={classNames('modal__tab')}>
            <Scrollbar height={380}>
              <div className={classNames(null, 'p-x-3', 'p-y-3')}>
                <TablePages ref="pages" model={pagesModel} source={this._pages} />
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
  const { builder } = state;

  return {
    builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    downloadPages: (pages) => {
      dispatch(Actions.downloadPages(pages));
    },

    closeModal: () => {
      dispatch(Actions.closeModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPages);
