import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TTEditor from '../../TTEditor';
import _ from 'lodash';
import { currentHoverBlock, blockWasRenderedToPage, removeContentBlock } from '../../Actions';
import { store } from '../Application';
import {
  CONTENTBLOCK_ATTR_ID,
  CONTENTBLOCK_ATTR_FIRST_ELEMENT,
  CONTENTBLOCK_ATTR_TYPE
} from '../../Constants';
import Events from '../../Common/Events';
import ClickToolbox from '../Shared/ClickToolbox';
import SectionToolBox from '../Shared/SectionToolBox';
import IFrame from './IFrame';

let onlyonce = false;

class CanvasFrame extends React.Component {
  _blocks = {};

  componentWillReceiveProps (nextProps) {
    const { page: currentPage } = nextProps;
    const blocks = _.assign({}, this._blocks, currentPage);

    this._blocks = blocks;

    this.renderBlocks(blocks);
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

  renderBlocks (blocks) {
    const { navigation, main, footer } = blocks;

    this.renderNavigation(navigation);
    this.renderMainBlocks(main);
    this.renderFooter(footer);

    this.hoverBlocks();
  }

  setElementAttributes (block, elementReference, updateMode: false) {
    const { id, type } = block;
    const { onBlockRenderToPage } = this.props;

    if (!block || !elementReference) {
      throw Error(`Something went wrong when setting block attributes. ${JSON.stringify(block)}`);
    }

    if (!updateMode) {
      elementReference.setAttribute(CONTENTBLOCK_ATTR_ID, id);
      elementReference.setAttribute(CONTENTBLOCK_ATTR_FIRST_ELEMENT, 'true');
      elementReference.setAttribute(CONTENTBLOCK_ATTR_TYPE, type);

      return onBlockRenderToPage(block, elementReference);
    }
  }

  renderMainBlocks (mainBlocks) {
    const mainElement = this.refs.main;

    _.map(mainBlocks, (block, i) => {
      const { hasBeenRendered, source, updatePosition } = block;

      if (!hasBeenRendered) {
        mainElement.insertAdjacentHTML('beforeend', source);

        this.setElementAttributes(block, mainElement.children[i]);
      }

      if (hasBeenRendered) {
        if (updatePosition) {
          if (_.has(block, 'newPos')) {
            const { elementReference, newPos } = block;
            elementReference.parentNode.insertBefore(
              elementReference,
              mainElement.children[newPos]
            );

            block.updatePosition = false;
          }
        }
      }
    });

    this._blocks.main = mainBlocks;
  }

  renderNavigation (block) {
    const targetElement = this.refs.navigation;

    if (_.values(block).length !== 0) {
      const { id, type, blockName, hasBeenRendered, source } = block;

      if (!id || !type || !blockName || !source) {
        throw Error(`
          Something went wrong when setting block attributes.
          ${JSON.stringify(block)}
        `);
      }

      if (!hasBeenRendered) {
        targetElement.innerHTML = '';
        targetElement.insertAdjacentHTML('beforeend', source);

        this.setElementAttributes(block, targetElement.children[0]);
      }
    }

    this._blocks.navigation = block;
  }

  renderFooter (block) {
    const targetElement = this.refs.footer;

    if (_.values(block).length !== 0) {
      const { id, type, blockName, source, hasBeenRendered } = block;

      if (!id || !type || !blockName || !source) {
        throw Error(`
          Something went wrong when setting block attributes.
          ${JSON.stringify(block)}
        `);
      }

      if (!hasBeenRendered) {
        targetElement.innerHTML = '';
        targetElement.insertAdjacentHTML('beforeend', source);

        this.setElementAttributes(block, targetElement.children[0]);
      }
    }

    this._blocks.footer = block;
  }

  hoverBlocksMouseEnter () {
    this.classList.add('ab-ch');
  }

  hoverBlocksMouseLeave () {
    this.classList.remove('ab-ch');
  }

  aBlockClick (evt) {
    Events.pauseEvent(evt);
  }

  hoverBlocks () {
    const targets = `
      p ,
      span,
      a,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      strong,
      em,
      li,
      ul,
      div,
      i,
      img,
      input,
      textarea,
      blockquote,
      figcaption
    `;
    const navigationElements = this.refs.navigation.querySelectorAll(targets);
    const mainElements = this.refs.main.querySelectorAll(targets);
    const footerElements = this.refs.footer.querySelectorAll(targets);
    const targetElements = _.union(navigationElements, mainElements, footerElements);

    _.map(targetElements, target => {
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

    var options = {
      // toolbar: document.getElementById('custom-toolbar'),
      editor: ReactDOM.findDOMNode(this.refs.main),
      debug: true,
      list: [
        'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
      ]
    };

    if (!onlyonce) {
      var pen = window.pen = new Pen(options);
      pen.focus();

      onlyonce = true;
    }
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
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  };
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasFrame);
