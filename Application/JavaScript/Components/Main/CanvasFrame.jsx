import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentHoverBlock, removeContentBlock } from '../../Actions/ActionCreators';
import { findUpAttr } from '../../Common/Common';
import { store } from '../Application';
import _ from 'lodash';
import AClass from '../../Common/AClass';
import Events from '../../Common/Events';
import ClickToolbox from '../Shared/ClickToolbox';
import SectionToolBox from '../Shared/SectionToolBox';
import IFrame from './IFrame';

class CanvasFrame extends Component {
  _blocks = {};

  componentWillReceiveProps (nextProps) {
    const props = nextProps;
    const currentPage = props.page;
    const blocks = _.assign({}, this._blocks, currentPage);

    this._blocks = blocks;

    this.renderBlocks(blocks);
  }

  renderBlocks (blocks) {
    const { navigation, main, footer } = blocks;

    this.renderNavigation(navigation);
    this.renderMainBlocks(main);
    this.renderFooter(footer);

    this.hoverBlocks();
  }

  setElementAttributes (element, i: 0) {
    const { id, type, blockName, elementReference } = element;
    const { onCoreBlockHover } = this.props;

    if (elementReference === undefined || elementReference === null) {
      return;
    }

    elementReference.addEventListener('mouseenter', (e) => {
      return onCoreBlockHover(element);
    }, false);

    elementReference.setAttribute('data-abc-i', i);
    elementReference.setAttribute('data-abcblocknr', String(id));
    elementReference.setAttribute('data-abccorent', 'true');
    elementReference.setAttribute('data-abcblocktype', type);
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

        navigationBlock.hasBeenRendered = true;
        navigationBlock.elementReference = navigationElement.children[0];

        this.setElementAttributes(navigationBlock);
      }
    }

    this._blocks.navigation = navigationBlock;
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
        elementReference
      } = block;

      if (!hasBeenRendered) {
        mainElement.insertAdjacentHTML('beforeend', source);

        block.hasBeenRendered = true;
        block.elementReference = mainElement.children[i];

        this.setElementAttributes(block, i);
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

    /*if (_.values(navigationBlock).length !== 0) {
      doesNavigationBlockExist = true;

      if (mainBlocks.length !== 0) {
        let targetElement = mainBlocks[0].elementReference;

        targetElement.style.paddingTop = '300px';
      }
    }*/

    this._blocks.main = mainBlocks;
  }

  renderFooter (footerBlock) {
    const footerElement = this.refs.footer;

    if (_.values(footerBlock).length !== 0) {
      const { id, type, blockName, source, hasBeenRendered } = footerBlock;

      if (!hasBeenRendered) {
        footerElement.innerHTML = '';
        footerElement.insertAdjacentHTML('beforeend', source);

        footerBlock.hasBeenRendered = true;
        footerBlock.elementReference = footerElement.children[0];

        this.setElementAttributes(footerBlock);
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasFrame);
