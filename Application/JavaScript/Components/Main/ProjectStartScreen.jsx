import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import cx from 'classnames';
import Page from './Page.jsx';

class ProjectStartScreen extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  render () {
    const wrapperClassName = cx('ab-flex', 'full', 'center');
    const items = {isNewPage: true};
    const previousPageNode = () => {
      const { builder } = this.props;
      const { doesPreviousPageExistInStorage } = builder;

      return doesPreviousPageExistInStorage ? <Page data={{isNewPage: false}} /> : null;
    };

    return (
      <div className={wrapperClassName}>
        <Page data={{isNewPage: true}} />
        {previousPageNode()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(ProjectStartScreen);
