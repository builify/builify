import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import classNames from 'classnames';
import Page from './Page';

class ProjectStartScreen extends Component {
  render () {
    const wrapperClassName = classNames('ab-flex', 'full', 'center');
    const items = {isNewPage: true};
    const previousPageNode = () => {
      const { doesPreviousPageExistInStorage } = this.props.builder;

      return doesPreviousPageExistInStorage ? <Page data={{isNewPage: false}} /> : null;
    };

    return (
      <div className={wrapperClassName}>
        <Page data={{isNewPage: true}} />
        {previousPageNode()}
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(ProjectStartScreen);