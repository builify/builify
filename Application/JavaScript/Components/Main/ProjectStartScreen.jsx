import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../Constants/Defines';
import { startNewPage, loadPreviousPage } from '../../Actions';
import { getString } from '../../Common/Localization';
import cx from 'classnames';
import Page from './Page';

class ProjectStartScreen extends Component {
  render () {
    const { builder } = this.props;
    const { doPreviousPagesExistInStorage: previousPages, currentLocation } = builder;
    const wrapperClassName = cx('ab-flex', 'full', 'center');

    if (currentLocation === CurrentLocations.STARTSCREEN) {
      return (
        <div className={wrapperClassName}>
          <Page isNewPage={true} />
          { previousPages ? <Page isNewPage={false} /> : null }
        </div>
      )
    } else {
      return null;
    }
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
