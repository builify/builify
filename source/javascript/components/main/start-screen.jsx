import React from 'react';
import classNames from '../../common/classnames';
import Page from './newpage';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../constants';

class ProjectStartScreen extends React.Component {
  render () {
    const { builder } = this.props;
    const { doPreviousPagesExistInStorage: previousPages, currentLocation } = builder;
    const wrapperClassName = classNames('flex', 'full', 'center');

    if (currentLocation === CurrentLocations.STARTSCREEN) {
      return (
        <div className={wrapperClassName}>
          <Page isNewPage={true} />
          { previousPages && <Page isNewPage={false} /> }
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
