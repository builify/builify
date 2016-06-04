import React from 'react';
import _map from 'lodash/map';
import ModalTab from '../common/tab';
import classNames from '../../../common/classnames';
import Time from '../../../common/time';
import Scrollbar from '../../shared/scrollbar';
import Button from '../../shared/button';
import { connect } from 'react-redux';
import { IS_DEMO_VERSION } from '../../../constants';
import { loadPreviousPage, flushPagesInStorage, importPage, addNotification } from '../../../actions';

class Content extends React.Component {
  static propTypes = {
    pages: React.PropTypes.array.isRequired,
    onClose: React.PropTypes.func.isRequired,
    loadPreviousPage: React.PropTypes.func.isRequired,
    flushPagesInStorage: React.PropTypes.func.isRequired,
    importPage: React.PropTypes.func.isRequired,
    addNotification: React.PropTypes.func.isRequired
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

  fileInputClick (e) {
    if (IS_DEMO_VERSION) {
      e.preventDefault();

      this.props.addNotification({
        level: 'warning',
        title: 'Demo Version',
        message: 'Buy full version to get access'
      });

      return this.props.onClose();
    }
  }

  render () {
    const { pages } = this.props;
    const pagesInformation = `You have ${pages.length} pages in localstorage.`;

    return (
      <ModalTab title='Select or import previous page'>
        <div className={classNames('modal__tab')}>
          <aside className={classNames('modal__tabside', 'sec')}>
            <h2>Pages</h2>
            <p>{ pagesInformation }</p>
            <Button label='Flush Storage' onClick={::this.flushStorage} />
            <div className='tt-filebutton'>
              <input onClick={::this.fileInputClick} className='tt-filebutton__input' id='fileInput' type='file' ref='fileInput' />
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

function mapStateToProps (state) {
  const { builder } = state;
  const { pages } = builder;

  return {
    pages: pages
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addNotification: (notification) => {
      dispatch(addNotification(notification));
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);
