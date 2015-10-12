import React, { Component } from 'react';
import { connect } from 'react-redux';
import IFrame from './IFrame';
import ClickToolbox from './ClickToolbox';

class CanvasFrame extends Component {
  render () {
    return (
      <IFrame>
        <div className='ab-croot'>
          <div 
            ref='navigation' 
            className='ab-cnavigation__wrapper' />
          <div 
            ref='main' 
            className='ab-cmain__wrapper' />
          <div 
            ref='footer' 
            className='ab-cfooter__wrapper' />
          <ClickToolbox />
        </div>
      </IFrame>
    )
  }

  componentWillReceiveProps (nextProps) {
    this.renderBlocks();
  }

  renderBlocks () {
    const { theme } = this.props;
    const { _currentPage } = theme;
    const currentPage = _currentPage;
    const { navigation, main, footer } = currentPage;

    this.renderNavigation(navigation);
    this.renderMainBlocks(main);
    this.renderFooter(footer);
  }

  renderNavigation (navigation) {
    if (Object.keys(navigation).length === 0) {
      return;
    }

    const { id, type, blockName, source } = navigation;
    const navigationElement = this.refs.navigation;
    const mainElement = this.refs.main;

    if (source === null || source === undefined) {
      return;
    }

    navigationElement.innerHTML = source;
  }

  renderMainBlocks (main) {
    if (main === undefined || main === null || main.length === 0) {
      return;
    }

    const mainElement = this.refs.main;
    let html = '';

    main.map((block, i) => {
      const { id, type, blockName, source } = block;

      html += source;
    });

    mainElement.innerHTML = html;
  }

  renderFooter (footer) {
    const footerElement = this.refs.footer;
    let html = '';

    footer.map((block, i) => {
      const { id, type, blockName, source } = block;

      html += source;
    });

    footerElement.innerHTML = html;
  }
}

function mapStateToProps (state) {
  return {
    theme: state.theme
  }
}

export default connect(
  mapStateToProps
)(CanvasFrame);