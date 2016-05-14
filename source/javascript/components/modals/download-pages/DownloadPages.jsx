import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import ModalTab from '../ModalTab';
import BottomNavigation from '../ModalBottomNavigation';
import { closeModal } from '../../../Actions';
import Time from '../../../Common/Time';
import Scrollbar from '../../Shared/Scrollbar';
import TablePages from './TablePages';

class DownloadPages extends React.Component {
  _pages = [];
  _pagesModel = {};

  shouldComponentUpdate () {
    return false;
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  componentWillMount () {
    const { builder } = this.props;
    const { pages } = builder;

    this._pagesModel = {
      name: { type: String }
    };

    _.map(pages, (page) => {
      const { pageID, pageTitle, pageFileName } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss d/M/y');
      const pageText = `${pageTitle} (${pageFileName}) - (${formatedTime})`;

      this._pages.push({
        name: pageText
      });
    });
  }

  render () {
    const { active, onCloseModal } = this.props;
    const className = classNames('ab-modal');
    const actions = [
      { label: 'Done', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper
        onClose={onCloseModal}
        active={active}
        ref='modalWrapper'
        className={className}>
        <ModalTab title='Download Pages'>
          <div className='ab-modal__tab'>
            <main className='ab-modal__tabcontent full'>
              <Scrollbar height={380}>
                <div className='ab-modal__pages'>
                  <TablePages
                    ref='pages'
                    model={this._pagesModel}
                    source={this._pages} />
                </div>
              </Scrollbar>
            </main>
          </div>
          <BottomNavigation
            actions={actions} />
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
    onCloseModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPages);
