import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DialogTypes } from '../../../Constants';
import { randomKey } from '../../../Common/Common';
import { loadPreviousPage } from '../../../Actions';
import _ from 'lodash';
import DialogImageEdit from './DialogImageEdit';
import DialogRestart from './DialogRestart';
import DialogDownloadPages from './DialogDownloadPages';
import DialogPreviousPages from './DialogPreviousPages';
import DialogLinkChange from './DialogLinkChange';
import DialogContentSource from './DialogContentSource';

class Dialog extends Component {
  static propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.number,
    onClose: PropTypes.func,
    editTarget: PropTypes.any
  }

  static defaultProps = {
    actions: [],
    active: false,
    type: DialogTypes.CLASSIC,
    onClose: () => {}
  }

  render () {
    const { type, title, children, actions, editTarget, active } = this.props;

    switch (type) {
      case DialogTypes.IMAGECHANGE:
        return (
          <DialogImageEdit
            active={active}
            editTarget={editTarget} />
        );

      case DialogTypes.RESTART:
        return (
          <DialogRestart
            active={active} />
        );

      case DialogTypes.DOWNLOADPAGES:
        return (
          <DialogDownloadPages
            active={active} />
        );

      case DialogTypes.LINKCHANGE:
        return (
          <DialogLinkChange
            active={active}
            editTarget={editTarget} />
        );

      case DialogTypes.PREVIOUSPAGES:
        return (
          <DialogPreviousPages
            active={active} />
        );

      case DialogTypes.CONTENTBLOCKSOURCE:
        return (
          <DialogContentSource
            active={active}
            editTarget={editTarget} />
        );
    }

    return null;
  }
}

export default Dialog;
