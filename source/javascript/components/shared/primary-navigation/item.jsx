import React from 'react';
import classNames from 'classnames';
import _size from 'lodash/size';
import _words from 'lodash/words';
import localization from '../../../common/localization';
import Icon from '../icon';
import { openTab, openDownloadModal, openRestartModal, saveCurrentPage } from '../../../Actions';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../../constants';

class NavigationItem extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.string.isRequired,
    currentLocation: React.PropTypes.number.isRequired,
    openTab: React.PropTypes.func.isRequired,
    openDownloadModal: React.PropTypes.func.isRequired,
    openRestartModal: React.PropTypes.func.isRequired,
    saveCurrentPage: React.PropTypes.func.isRequired
  };

  state = {
    disableItem: false
  };

  componentWillMount () {
    const { id, currentLocation } = this.props;

    this.setState({
      disableItem: !!((currentLocation === CurrentLocations.STARTSCREEN && id !== 'download') && true)
    });
  }

  clickEvent () {
    const { disableItem } = this.state;
    const { onClick } = this.props;
    const command = _words(onClick);
    const commandSize = _size(command);

    if (disableItem === true) {
      return false;
    }

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
        }
      }
    }
  }

  render () {
    const { disableItem } = this.state;
    const { icon, title } = this.props;
    const className = classNames({
      'hide': disableItem
    });
    const text = localization(title);

    return (
      <li className={className} title={text} onClick={::this.clickEvent}>
        <Icon icon={icon} />
        <span>{ text }</span>
      </li>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openTab: (target) => {
      dispatch(openTab(target));
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
