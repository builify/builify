import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startNewPage, loadPreviousPage } from '../Actions/ActionCreators';
import { getString } from '../Common/Localization';
import Page from './Page';

class ProjectStartScreen extends Component {
  render () {
    const items = {isNewPage: true};
    const previousPageNode = () => {
      if (this.props.builder.doesPreviousPageExistInStorage) {
        return (
          <Page data={{isNewPage: false}} />
        );
      } else {
        return null;
      }
    };

    return (
      <div className='ab-flex center'>
        <Page data={{isNewPage: true}} />
        {previousPageNode()}
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localizationData
  };
}

export default connect(mapStateToProps)(ProjectStartScreen);