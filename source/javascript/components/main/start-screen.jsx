import React from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../Constants';
import classNames from 'classnames';
import Page from './Page';

class ProjectStartScreen extends React.Component {
  render () {
    const { builder } = this.props;
    const { doPreviousPagesExistInStorage: previousPages, currentLocation } = builder;
    const wrapperClassName = classNames('ab-flex', 'full', 'center');

    if (currentLocation === CurrentLocations.STARTSCREEN) {
      return (
        <div className={wrapperClassName}>
          <Page isNewPage={true} />
          { previousPages ? <Page isNewPage={false} /> : null }
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

export default connect(mapStateToProps)(ProjectStartScreen);
