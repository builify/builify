import React from 'react';
import { DialogTypes } from '../../../Constants';
import DialogRestart from './DialogRestart';
import DialogDownloadPages from './DialogDownloadPages';
import DialogLinkChange from './DialogLinkChange';
import DialogContentSource from './DialogContentSource';

import ImageEdit from '../../Modals/ImageChange';
import PreviousPages from '../../Modals/PreviousPages';
import IconChange from '../../Modals/IconChange';

export default class Dialog extends React.Component {
  static propTypes = {
    actions: React.PropTypes.array,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.number,
    onClose: React.PropTypes.func,
    editTarget: React.PropTypes.any
  };

  static defaultProps = {
    actions: [],
    active: false,
    type: DialogTypes.CLASSIC,
    onClose: () => {}
  };

  render () {
    const { type, editTarget, active } = this.props;

    switch (type) {
      case DialogTypes.IMAGECHANGE:

        return (
          <ImageEdit
            active={active}
            editTarget={editTarget}  />
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
          <PreviousPages
            active={active} />
        );

      case DialogTypes.CONTENTBLOCKSOURCE:
        return (
          <DialogContentSource
            active={active}
            editTarget={editTarget} />
        );

      case DialogTypes.ICONCHANGE:
        return (
          <IconChange
            active={active}
            editTarget={editTarget} />
        );
    }

    return null;
  }
}
