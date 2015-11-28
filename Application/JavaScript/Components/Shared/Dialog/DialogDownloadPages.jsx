import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { downloadPages, closeModal } from '../../../Actions';
import cx from 'classnames';
import _ from 'lodash';
import Time from '../../../Common/Time';
import Button from '../Button';
import DialogWrapper from './DialogWrapper';
import DialogBody from './DialogBody';
import Table from '../Table';

class TablePages extends Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    source: PropTypes.array.isRequired
  };

  state = {
    selected: [],
    source: this.props.source
  };

  handleChange (row, key, value) {
    const { source } = this.state;

    source[row][key] = value;

    this.setState({ source });
  }

  handleSelect (selected) {
    this.setState({ selected });
  }

  getSelected () {
    const { selected } = this.state;

    return selected;
  }

  render () {
    return (
      <Table
        model={this.props.model}
        onChange={::this.handleChange}
        onSelect={::this.handleSelect}
        selected={this.state.selected}
        source={this.state.source} />
    );
  }
}

class DialogDownloadPages extends Component {
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
    const dialogElement = findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    if (active) {
      _.delay(() => {
        dialogElement.classList.add('active');
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
      );
    });
  }

  closeDialog () {
    const { onCloseModal } = this.props;
    let dialogElement = null;

    if (this.dialogElement !== null) {
      dialogElement = this.dialogElement;
    } else {
      const dialogRef = this.refs['dialog'];
      dialogElement = findDOMNode(dialogRef);
    }

    if (dialogElement) {
      dialogElement.classList.remove('active');
    }

    _.delay(() => {
      return onCloseModal();
    }, 300);
  }

  cancelClick (e) {
    this.closeDialog();
  }

  downloadClick (e) {
    const { onDownload } = this.props;
    const selectedPages = this.refs['pages'].getSelected();

    this.closeDialog();

    return onDownload(selectedPages);
  }

  renderActions () {
    const actions = [
      { label: 'Cancel', onClick: ::this.cancelClick },
      { label: 'Download', onClick: ::this.downloadClick }
    ];

    return this.renderButtons(actions);
  }

  render () {
    const className = cx('ab-dialog', 'medium');
    const { builder } = this.props;
    const { pages: builderPages } = builder;
    const pagesModel = {
      name: {type: String}
    };

    let pages = [];

    _.map(builderPages, (page, idx) => {
      const { pageID, pageTitle } = page;
      const time = new Date(+(pageID.split('-')[1]) * 1000);
      const formatedTime = Time.formatDate(time, 'HH:mm:ss d/M/y');
      const pageText = `${pageTitle} - (${formatedTime})`;

      pages.push({
        name: pageText
      });
    });

    if (pages.length !== 0) {
      return (
        <DialogWrapper
          className={className}
          ref='dialog'>
          <DialogBody title='Choose Pages to Download'>
            <TablePages
              ref='pages'
              model={pagesModel}
              source={pages} />
          </DialogBody>
          <nav role='navigation' className='ab-dialog__navigation'>
            { this.renderActions() }
          </nav>
        </DialogWrapper>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onDownload: (pages) => {
      dispatch(downloadPages(pages));
    },

    onCloseModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogDownloadPages);
