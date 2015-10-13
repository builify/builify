import React, { Component } from 'react';
import { connect } from 'react-redux';
import IFrame from './IFrame';
import ClickToolbox from './ClickToolbox';

class CanvasFrame extends Component {
  constructor (props) {
    super(props);

    this._blocks = {};
  }

  render () {
    // data-abcorent - ab-core-Not-Removable
    return (
      <IFrame>
        <div className='ab-croot'>
          <div 
            ref='navigation' 
            data-abccorent='true'
            className='ab-cnavigation__wrapper' />
          <div 
            ref='main' 
            data-abccorent='true'
            className='ab-cmain__wrapper' />
          <div 
            ref='footer'
            data-abccorent='true'
            className='ab-cfooter__wrapper' />
          <ClickToolbox />
        </div>
      </IFrame>
    )
  }

  componentWillReceiveProps (nextProps) {
    const props = nextProps;
    const currentPage = props.theme._currentPage;

    this._blocks = Object.assign({}, this._blocks, currentPage);
    this.renderBlocks(this._blocks);
  }

  renderBlocks (blocks) {
    const { navigation, main, footer } = blocks;

    this.renderNavigation(navigation);
    this.renderMainBlocks(main);
    this.renderFooter(footer);
  }

  renderNavigation (navigationBlock) {
    const navigationElement = this.refs.navigation;

    if (Object.keys(navigationBlock).length !== 0) {
      const { id, type, blockName, source } = navigationBlock;

      navigationElement.innerHTML = '';
      navigationElement.insertAdjacentHTML('beforeend', source);

      navigationBlock.hasBeenRendered = true;
      navigationBlock.elementReference = navigationElement.children[0];

      navigationBlock.elementReference.setAttribute('data-abccorent', 'true');
    }

    this._blocks.navigation = navigationBlock;
  }

  renderMainBlocks (mainBlocks) {
    const mainElement = this.refs.main;
    const navigationBlock = this._blocks.navigation;
    let doesNavigationBlockExist = false;

    mainBlocks.map((block, i) => {
      const { id, type, blockName, source } = block;

      if (!block.hasBeenRendered) {
        mainElement.insertAdjacentHTML('beforeend', source);

        block.hasBeenRendered = true;
        block.elementReference = mainElement.children[i];

        block.elementReference.setAttribute('data-abccorent', 'true');
      }
    });

    if (Object.keys(navigationBlock).length !== 0) {
      doesNavigationBlockExist = true;

      if (mainBlocks.length !== 0) {
        let targetElement = mainBlocks[0].elementReference;

        targetElement.style.paddingTop = '300px';
      }
    }

    this._blocks.main = mainBlocks;
  }

  renderFooter (footerBlocks) {
    const footerElement = this.refs.footer;

    footerBlocks.map((block, i) => {
      const { id, type, blockName, source } = block;

      if (!block.hasBeenRendered) {
        footerElement.insertAdjacentHTML('beforeend', source);

        block.hasBeenRendered = true;
        block.elementReference = footerElement.children[i];

        block.elementReference.setAttribute('data-abccorent', 'true');
      }
    });

    this._blocks.footer = footerBlocks;
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