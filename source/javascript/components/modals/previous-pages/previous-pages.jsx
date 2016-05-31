import React from 'react';
import _map from 'lodash/map';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Time from '../../../common/time';
import Scrollbar from '../../shared/scrollbar';
import Button from '../../shared/button';
import { loadPreviousPage, closeModal, flushPagesInStorage, importPage } from '../../../actions';
import { connect } from 'react-redux';

class Content extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    onClose: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired,
    flushPagesInStorage: React.PropTypes.func.isRequired,
    importPage: React.PropTypes.func.isRequired
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

  flushStorage () {
    this.props.flushPagesInStorage();
    return this.props.onClose();
  }

  importPage (data) {
    this.props.importPage(data);
    return this.props.onClose();
  }

  componentDidMount () {
    this.refs.fileInput.addEventListener('change', () => {
      const file = this.refs.fileInput.files[0];
      var reader = new FileReader();

      reader.onload = () => {
        this.importPage(reader.result);
			};

			reader.readAsText(file);
    }, false);
  }

  render () {
    const { builder } = this.props;
    const { pages } = builder;
    const pagesInformation = `You have ${pages.length} pages in localstorage.`;

    return (
      <ModalTab title='Select or import previous page'>
        <div className={classNames('modal__tab')}>
          <aside className={classNames('modal__tabside', 'sec')}>
            <h2>Pages</h2>
            <p>{ pagesInformation }</p>
            <Button label='Flush Storage' onClick={::this.flushStorage} />
            <div className='tt-filebutton'>
              <input className='tt-filebutton__input' id='fileInput' type='file' ref='fileInput' />
              <label className='tt-filebutton__label' htmlFor='fileInput'>Import a Page</label> 
            </div>
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
    closeModal: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired,
    flushPagesInStorage: React.PropTypes.func.isRequired,
    importPage: React.PropTypes.func.isRequired
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const { builder} = this.props;
    const className = classNames(['modal', 'modal__small']);
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog }
    ];

    return (
      <ModalWrapper ref='modalWrapper' onClose={this.props.closeModal} className={className}>
        <Content
          onClose={::this.closeDialog}
          loadPreviousPage={this.props.loadPreviousPage}
          flushPagesInStorage={this.props.flushPagesInStorage}
          importPage={this.props.importPage}
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
    },

    flushPagesInStorage: () => {
      dispatch(flushPagesInStorage());
    },

    importPage: (data) => {
      dispatch(importPage(data));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PreviousPages);
