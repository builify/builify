import React from 'react';
import map from 'lodash/map';
import isElement from 'lodash/iselement';
import isObject from 'lodash/isobject';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { store } from '../application-container';
import * as Actions from '../../Actions';
import * as Constants from '../../Constants';
import TTDOM from '../../Common/TTDOM';
import IFrame from './iframe';
import TTEditor from '../../modules/tt-editor';
import ClickToolbox from '../shared/click-toolbox';
import SectionToolBox from '../shared/section-toolbox';
import classNames from '../../common/classnames';

const ATTR_CORE_ELEMENT = 'data-abccorent';
const EMPTY_STRING = '';

class Frame extends React.Component {
  _blocks = {};
  _editor = null;
  _blocksCache = [];

  static propTypes = {
    page: React.PropTypes.object.isRequired,
    renderBlockToCanvas: React.PropTypes.func.isRequired,
    coreBlockHover: React.PropTypes.func.isRequired,
    openContextMenu: React.PropTypes.func.isRequired,
    closeContextMenu: React.PropTypes.func.isRequired,
    openLinkEditModal: React.PropTypes.func.isRequired,
    openIconEditModal: React.PropTypes.func.isRequired,
    openImageEditModal: React.PropTypes.func.isRequired,
    cloneItem: React.PropTypes.func.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    openVideoEditModal: React.PropTypes.func.isRequired,
    openCountdownEditModal: React.PropTypes.func.isRequired,
    openColorPicker: React.PropTypes.func.isRequired
  };

  setCoreElementsAttributes () {
    this.refs.navigation.setAttribute(ATTR_CORE_ELEMENT, true);
    this.refs.main.setAttribute(ATTR_CORE_ELEMENT, true);
    this.refs.footer.setAttribute(ATTR_CORE_ELEMENT, true);
  }

  renderNavigation () {
    const { page } = this.props;
    const { navigation: navigationBlock } = page;

    if (values(navigationBlock).length !== 0) {
      if (this.isValidBlock(navigationBlock)) {
        const { hasBeenRendered, source } = navigationBlock;

        if (hasBeenRendered === false) {
          const { navigation: childrenHolder } = this.refs;

          childrenHolder.innerHTML = EMPTY_STRING;
          childrenHolder.insertAdjacentHTML('beforeend', source);

          this.setBlockAttributes(navigationBlock, childrenHolder.children[0]);
        }

        this._blocks.navigation = navigationBlock;
      }
    }
  }

  renderFooter () {
    const { page } = this.props;
    const { footer: footerBlock } = page;

    if (values(footerBlock).length !== 0) {
      if (this.isValidBlock(footerBlock)) {
        const { hasBeenRendered, source } = footerBlock;

        if (hasBeenRendered === false) {
          const { footer: childrenHolder } = this.refs;

          childrenHolder.innerHTML = EMPTY_STRING;
          childrenHolder.insertAdjacentHTML('beforeend', source);

          this.setBlockAttributes(footerBlock, childrenHolder.children[0]);
        }

        this._blocks.footer = footerBlock;
      }
    }
  }

  renderMainBlocks () {
    const { page } = this.props;
    const { main: pageMainBlocks } = page;
    const { main: childrenHolder } = this.refs;

    map(pageMainBlocks, (block, i) => {
      const { hasBeenRendered, source, updatePosition } = block;

      if (hasBeenRendered === false) {
        childrenHolder.insertAdjacentHTML('beforeend', source);

        this.setBlockAttributes(block, childrenHolder.children[i]);
      } else {
        if (updatePosition === true) {
          const { elementReference, newPos } = block;

          elementReference.parentNode.insertBefore(
            elementReference,
            childrenHolder.children[newPos]
          );

          block.updatePosition = false;

          console.log(block);
        }
      }
    });

    this._blocks.main = pageMainBlocks;
  }

  removeChildren (parent) {
    map(parent.children, (child) => {
      if (isElement(child)) {
        child.remove();
      }
    });
  }

  clearCanvas () {
    this.removeChildren(this.refs.navigation);
    this.removeChildren(this.refs.main);
    this.removeChildren(this.refs.footer);
  }

  isValidBlock (block) {
    const { id, type, blockName, source } = block;

    if (!id || !type || !blockName || !source) {
      throw Error(`Something went wrong when setting block attributes. - ${JSON.stringify(block)}`);
    }

    return true;
  }

  setBlockAttributes (block, elementReference) {
    if (!isObject(block)) {
      throw Error('Block is not object.');
    }

    if (!isElement(elementReference)) {
      throw Error('Reference point is not element.');
    }

    elementReference.setAttribute(Constants.CONTENTBLOCK_ATTR_ID, block.id);
    elementReference.setAttribute(Constants.CONTENTBLOCK_ATTR_FIRST_ELEMENT, true);
    elementReference.setAttribute(Constants.CONTENTBLOCK_ATTR_TYPE, block.type);

    this.addMouseEventsToCoreBlock(elementReference, block);

    return this.props.renderBlockToCanvas(block, elementReference);
  }

  initializeEditor () {
    const iFrame = TTDOM.iframe.get('ab-cfrm');
    const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

    this._editor = new TTEditor({
      elementsContainer: iFrameWindow
    });
  }

  addMouseEventsToCoreBlock (coreElementReference, block) {
    const targets = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'em', 'i', 'span', 'p', 'a',
      'li', 'ul',
      'div',
      'img', 'input', 'textarea', 'blockquote',
      'figcaption'
    ].join(',');
    const targetElements = coreElementReference.querySelectorAll(targets);
    const mouseEnterEvent = function () {
      this.classList.add('ab-ch');
    };

    const mouseLeaveEvent = function () {
      this.classList.remove('ab-ch');
    };

    // Add mouse events to elements inside core block.
    map(targetElements, (target) => {
      target.contentEditable = true;

      target.removeEventListener('mouseenter', mouseEnterEvent);
      target.removeEventListener('mouseleave', mouseLeaveEvent);
      target.addEventListener('mouseenter', mouseEnterEvent, false);
      target.addEventListener('mouseleave', mouseLeaveEvent, false);
    });

    // Add section hover event to core block.
    coreElementReference.addEventListener('mouseenter', () => {
      return this.props.coreBlockHover(block);
    });
  }

  drawCanvas () {
    this.setCoreElementsAttributes();
    this.renderNavigation();
    this.renderMainBlocks();
    this.renderFooter();
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.page.pageID !== this.props.page.pageID) {
      this.clearCanvas();
    }

    return true;
  }

  componentDidMount () {
    this.initializeEditor();
    this.drawCanvas();
  }

  componentDidUpdate () {
    this.drawCanvas();
  }

  render () {
    return (
      <div className={classNames('canvas__holder')}>
        <IFrame>
          <div ref='root' className='tt-canvas-root'>
            <div ref='navigation' className='tt-canvas-navigation' />
            <div ref='main' className='tt-canvas-main' />
            <div ref='footer' className='tt-canvas-footer' />

            <ClickToolbox
              openContextMenu={this.props.openContextMenu}
              closeContextMenu={this.props.closeContextMenu}
              openLinkEditModal={this.props.openLinkEditModal}
              openIconEditModal={this.props.openIconEditModal}
              openImageEditModal={this.props.openImageEditModal}
              cloneItem={this.props.cloneItem} />
            <SectionToolBox
              openVideoEditModal={this.props.openVideoEditModal}
              openCountdownEditModal={this.props.openCountdownEditModal}
              removeContentBlock={this.props.removeContentBlock}
              openColorPicker={this.props.openColorPicker}
              openImageEditModal={this.props.openImageEditModal}
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
    // Canvas events.
    renderBlockToCanvas: (block, elementReference) => {
      dispatch(Actions.blockWasRenderedToPage(block, elementReference));
    },

    coreBlockHover: (block) => {
      dispatch(Actions.currentHoverBlock(block));
    },

    // Click toolbox events.
    openContextMenu: () => {
      dispatch(Actions.openContextmenuToolbox());
    },

    closeContextMenu: () => {
      dispatch(Actions.closeContextmenuToolbox());
    },

    openLinkEditModal: (target) => {
      dispatch(Actions.openLinkEditModal(target));
    },

    openIconEditModal: (target) => {
      dispatch(Actions.openIconEditModal(target));
    },

    openImageEditModal: (target) => {
      dispatch(Actions.openImageEditModal(target));
    },

    cloneItem: () => {
      dispatch(Actions.cloneItem());
    },

    // Section toolbox events.
    removeContentBlock: (block) => {
      dispatch(Actions.removeContentBlock(block));
    },

    openVideoEditModal: (target) => {
      dispatch(Actions.openVideoEditModal(target));
    },

    openCountdownEditModal: (target) => {
      dispatch(Actions.openCountdownEditModal(target));
    },

    openColorPicker: (target, sourceElement) => {
      dispatch(Actions.openColorPicker(target, sourceElement));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
