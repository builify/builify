import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { startNewPage, loadPreviousPage } from '../Actions/ActionCreators';
import { getString } from '../Common/Localization';

@connect(state => ({
  localization: state.localizationData
}))
class Page extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  selectPage (e) {
    const { isNewPage } = this.props.data;

    return isNewPage ? startNewPage() : loadPreviousPage();
  }

  render () {
    const { data, dispatch } = this.props;
    const { isNewPage } = data;
    const name = isNewPage ? getString('pages.newpage') : getString('pages.loadpage');

    return (
      <div 
        className='ab-page-new'
        {...bindActionCreators({
          onClick: ::this.selectPage
        }, dispatch)}>
        <span>{name}</span>
      </div>
    );
  }
};

@connect(state => ({
  builderConfiguration: state.builderConfiguration,
  builder: state.builder,
  localization: state.localizationData
}))
export default class ProjectStartScreen extends Component {
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