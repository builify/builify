import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentHoverBlock, blockWasRenderedToPage, removeContentBlock } from '../../Actions';
import { findUpAttr } from '../../Common/Common';
import { store } from '../Application';
import { CONTENTBLOCK_ATTR_ID, CONTENTBLOCK_ATTR_FIRST_ELEMENT, CONTENTBLOCK_ATTR_TYPE } from '../../Constants';
import _ from 'lodash';
import Events from '../../Common/Events';
import ClickToolbox from '../Shared/ClickToolbox';
import SectionToolBox from '../Shared/SectionToolBox';
import IFrame from './IFrame';

class CanvasFrame extends Component {
  _blocks = {};

  componentWillReceiveProps (nextProps) {
    const { page: currentPage } = nextProps;
    //const { isPageSelected } = builder;
    const blocks = _.assign({}, this._blocks, currentPage);

    this._blocks = blocks;

    //if (isPageSelected) {
      this.renderBlocks(blocks);
    /*} else {
      this.cleanCanvas();
    }*/
  }

  cleanCanvas () {
    const navigationContainer = this.refs['navigation'];
    const mainElementsContainer = this.refs['main'];
    const footerContainer = this.refs['footer'];
    const navigationElement = navigationContainer.children;
    const mainElements = mainElementsContainer.children;
    const footerElements = footerContainer.children;

    _.map(navigationElement, element => {
      element.remove();
    });

    _.map(mainElements, element => {
      if (element !== null && element !== undefined) {
        element.remove();
      } else {
        throw Error(element);
      }
    });

    _.map(footerElements, element => {
      element.remove();
    });
  }

  checkBlocks (blocks) {
    const { navigation, main, footer } = blocks;
    const mainElementsContainer = this.refs['main'];
    const mainElements = mainElementsContainer.children;
    const mainElementsLength = mainElements.length;
    const mainBlocksLength = main.length;
  }

  renderBlocks (blocks) {
    const { navigation, main, footer } = blocks;

    this.renderNavigation(navigation);
    this.renderMainBlocks(main);
    this.renderFooter(footer);

    this.hoverBlocks();
  }

  setElementAttributes (block, elementReference, updateMode: false) {
    const { id, type, blockName } = block;
    const { onCoreBlockHover, onBlockRenderToPage } = this.props;

    if (!block || elementReference === undefined || elementReference === null) {
      throw Error('Something went wrong when setting block attributes. ' + block);
    }

    if (updateMode) {

    } else {
      elementReference.addEventListener('mouseenter', (e) => {
        return onCoreBlockHover(block);
      });

      elementReference.setAttribute(CONTENTBLOCK_ATTR_ID, id);
      elementReference.setAttribute(CONTENTBLOCK_ATTR_FIRST_ELEMENT, 'true');
      elementReference.setAttribute(CONTENTBLOCK_ATTR_TYPE, type);

      onBlockRenderToPage(block, elementReference);
    }
  }

  renderMainBlocks (mainBlocks) {
    const { onElementRemove, page } = this.props;
    const { blocksCount } = page;
    const mainElement = this.refs.main;
    const navigationBlock = this._blocks.navigation;
    const mainBlocksLength = mainBlocks.length;
    let doesNavigationBlockExist = false;

    _.map(mainBlocks, (block, i) => {
      const {
        id,
        type,
        blockName,
        source,
        hasBeenRendered,
        elementReference,
        updateBlock
      } = block;

      if (!hasBeenRendered) {
        mainElement.insertAdjacentHTML('beforeend', source);

        this.setElementAttributes(block, mainElement.children[i]);
      } else if (updateBlock) {
        function removeFirstTag (source) {
          const reg = /(<([^>]+)>)/g;
          const matches = source.match(reg);
          let result = Array.from(matches);

          result.shift();
          result.pop();

          result = result.join('');

          return result;
        }

        elementReference.innerHTML = removeFirstTag(source);

        //this.setElementAttributes(block, mainElement.children[i]);
      }

      if (_.has(block, 'updatePosition')) {
        const { oldPos, newPos } = block;

        if (newPos === 0) {
          mainElement.insertBefore(mainElement.children[newPos], mainElement.children[oldPos]);
          mainElement.insertBefore(mainElement.children[oldPos], mainElement.children[0]);
        } else if (newPos === (mainBlocksLength - 1)) {
          mainElement.insertBefore(mainElement.children[newPos], mainElement.children[oldPos]);
          mainElement.appendChild(mainElement.children[oldPos]);
        } else {

        }

        delete block.updatePosition;
      }
    });

    this._blocks.main = mainBlocks;
  }

  renderNavigation (navigationBlock) {
    const navigationElement = this.refs.navigation;

    if (_.values(navigationBlock).length !== 0) {
      const { id, type, blockName, source, hasBeenRendered } = navigationBlock;

      if (!id || !type || !blockName || !source) {
        throw Error('Wrong navigation block. ' + navigationBlock);
      }

      if (!hasBeenRendered) {
        navigationElement.innerHTML = '';
        navigationElement.insertAdjacentHTML('beforeend', source);

        this.setElementAttributes(navigationBlock, navigationElement.children[0]);
      }
    }

    this._blocks.navigation = navigationBlock;
  }

  renderFooter (footerBlock) {
    const footerElement = this.refs.footer;

    if (_.values(footerBlock).length !== 0) {
      const { id, type, blockName, source, hasBeenRendered, updateBlock } = footerBlock;

      if (!id || !type || !blockName || !source) {
        throw Error('Wrong footer block. ' + navigationBlock);
      }

      if (!hasBeenRendered) {
        footerElement.innerHTML = '';
        footerElement.insertAdjacentHTML('beforeend', source);

        this.setElementAttributes(footerBlock, footerElement.children[0]);
      }
    }

    this._blocks.footer = footerBlock;
  }

  hoverBlocksMouseEnter (e) {
    this.classList.add('ab-ch');
  }

  hoverBlocksMouseLeave (e) {
    this.classList.remove('ab-ch');
  }

  aBlockClick (evt) {
    Events.pauseEvent(evt);
  }

  hoverBlocks () {
    const { onCoreBlockHover } = this.props;
    const targets = 'p , span, a, h1, h2, h3, h4, h5, h6, strong, em, li, ul, div, i, img, input, textarea, blockquote, figcaption';
    const navigationElements = this.refs.navigation.querySelectorAll(targets);
    const mainElements = this.refs.main.querySelectorAll(targets);
    const footerElements = this.refs.footer.querySelectorAll(targets);
    const targetElements = _.union(navigationElements, mainElements, footerElements);

    _.map(targetElements, (target, i) => {
      if (target.tagName === 'A') {
        target.removeEventListener('click', ::this.aBlockClick);
        target.addEventListener('click', ::this.aBlockClick, false);
      } else {
        target.contentEditable = true;
      }

      target.removeEventListener('mouseenter', this.hoverBlocksMouseEnter);
      target.removeEventListener('mouseleave', this.hoverBlocksMouseLeave);
      target.addEventListener('mouseenter', this.hoverBlocksMouseEnter, false);
      target.addEventListener('mouseleave', this.hoverBlocksMouseLeave, false);
    });
  }

  render () {
    const { page } = this.props;
    const { pageTitle } = page;

    return (
      <div className='ab-canvas__holder'>
        <IFrame title={pageTitle}>
          <div
            data-abccorent='true'
            ref='root'
            className='ab-croot'>
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
            <ClickToolbox
              store={store}/>
            <SectionToolBox
              store={store} />
          </div>
        </IFrame>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCoreBlockHover: (element) => {
      dispatch(currentHoverBlock(element));
    },

    onElementRemove: (element) => {
      dispatch(removeContentBlock(element));
    },

    onBlockRenderToPage: (block, elementReference) => {
      dispatch(blockWasRenderedToPage(block, elementReference));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasFrame);
