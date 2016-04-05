import { openTab, openDownloadModal, openPreview, openRestartModal, saveCurrentPage } from '../../../Actions';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from '../Icon';

class NavigationItem extends React.Component {
  clickEvent () {
    const { onClick } = this.props;
    const command = _.words(onClick);
    const commandSize = _.size(command);

    console.log(command);

    if (commandSize === 2) {
      const cmd1 = command[0];
      const cmd2 = command[1];

      if (cmd1 === 'open') {
        return this.props.openTab(cmd2);
      } else if (cmd1 === 'run') {
        if (cmd2 === 'restore') {
          return this.props.openRestartModal();
        } else if (cmd2 === 'download') {
          return this.props.openDownloadModal();
        } else if (cmd2 === 'save') {
          return this.props.saveCurrentPage();
        } else if (cmd2 === 'preview') {
          return this.props.openPreview();
        }
      }
    }
  }

  render () {
    const { icon, title } = this.props;
    const className = classNames('');

    return (
      <li
        className={className}
        title={title}
        onClick={::this.clickEvent}>
        <Icon icon={icon} />
        <span>{title}</span>
      </li>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openTab: (target) => {
      dispatch(openTab(target));
    },

    openPreview: () => {
      dispatch(openPreview());
    },

    openDownloadModal: () => {
      dispatch(openDownloadModal());
    },

    openRestartModal: () => {
      dispatch(openRestartModal());
    },

    saveCurrentPage: () => {
      dispatch(saveCurrentPage());
    }
  };
}

export default connect(null, mapDispatchToProps)(NavigationItem);
