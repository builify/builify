import React from 'react';
import _map from 'lodash/map';
import _isElement from 'lodash/iselement';
import _isObject from 'lodash/isobject';
import _values from 'lodash/values';
import TTDOM from '../../common/TTDOM';
import TTEditor from '../../modules/tt-editor';
import TTIFrame from '../../modules/react-tt-iframe';
import ClickToolbox from '../shared/click-toolbox';
import SectionToolBox from '../shared/section-toolbox';
import classNames from '../../common/classnames';
import * as Actions from '../../actions';
import * as Constants from '../../constants';
import { connect } from 'react-redux';
import { store } from '../application-container';

function createStylesheet (source, target, notInClientProduct = false) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = source;

  if (notInClientProduct) {
    link.setAttribute(Constants.JUNK_ATTR, true);
  }

  target.appendChild(link);
}

function createJavaScript (source, target, shouldUpdate = false) {
  let script = document.createElement('script');
  script.src = source;
  script.async = true;

  if (shouldUpdate) {
    script.setAttribute('data-update', true);
  }

  target.appendChild(script);
}

class Frame extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    template: React.PropTypes.object.isRequired,
    removeLoadingScreen: React.PropTypes.func.isRequired,
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

  _blocks = {};
  _editor = null;
  _blocksCache = [];

  setCoreElementsAttributes () {
    const { navigation, main, footer } = this.refs;

    if (_isElement(navigation)) {
      this.refs.navigation.setAttribute(Constants.ATTR_CORE_ELEMENT, true);
    }

    if (_isElement(main)) {
      main.setAttribute(Constants.ATTR_CORE_ELEMENT, true);
    }

    if (_isElement(footer)) {
      footer.setAttribute(Constants.ATTR_CORE_ELEMENT, true);
    }
  }

  renderNavigation () {
    const { page } = this.props;
    const { navigation: navigationBlock } = page;

    if (_values(navigationBlock).length !== 0) {
      if (this.isValidBlock(navigationBlock)) {
        const { hasBeenRendered, source } = navigationBlock;

        if (hasBeenRendered === false) {
          const { navigation: childrenHolder } = this.refs;

          childrenHolder.innerHTML = Constants.EMPTY_STRING;
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

    if (_values(footerBlock).length !== 0) {
      if (this.isValidBlock(footerBlock)) {
        const { hasBeenRendered, source } = footerBlock;

        if (hasBeenRendered === false) {
          const { footer: childrenHolder } = this.refs;

          childrenHolder.innerHTML = Constants.EMPTY_STRING;
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

    _map(pageMainBlocks, (block, i) => {
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
        }
      }
    });

    this._blocks.main = pageMainBlocks;
  }

  removeChildren (parent) {
    _map(parent.children, (child) => {
      if (_isElement(child)) {
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
    if (!_isObject(block)) {
      throw Error('Block is not object.');
    }

    if (!_isElement(elementReference)) {
      throw Error('Reference point is not element.');
    }

    elementReference.setAttribute(Constants.CONTENTBLOCK_ATTR_ID, block.id);
    elementReference.setAttribute(Constants.CONTENTBLOCK_ATTR_FIRST_ELEMENT, true);
    elementReference.setAttribute(Constants.CONTENTBLOCK_ATTR_TYPE, block.type);

    this.props.renderBlockToCanvas(block, elementReference);

    return this.addMouseEventsToCoreBlock(elementReference, block);
  }

  initializeEditor () {
    const iFrame = TTDOM.iframe.get('ab-cfrm');

    if (iFrame) {
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

      this._editor = new TTEditor({
        elementsContainer: iFrameWindow
      });
    }
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
    _map(targetElements, (target) => {
      target.contentEditable = true;

      target.removeEventListener('mouseenter', mouseEnterEvent);
      target.removeEventListener('mouseleave', mouseLeaveEvent);
      target.addEventListener('mouseenter', mouseEnterEvent, false);
      target.addEventListener('mouseleave', mouseLeaveEvent, false);
    });

    // Add section hover event to core block.
    if (_isElement(coreElementReference)) {
      coreElementReference.addEventListener('mouseenter', () => {
        return this.props.coreBlockHover(coreElementReference, block);
      });
    }
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
      return false;
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

  normalizeFrame (frameDocument) {
    if (!frameDocument) {
      return;
    }

    const { template } = this.props;
    const { external } = template;
    let { core: assets } = external;
    const headElement = frameDocument.head;
    const bodyElement = frameDocument.body;

    if (_isElement(headElement) && _isElement(bodyElement)) {
      assets.unshift({
        type: 'css',
        src: 'assets/static/canvas-stylesheet.css',
        junk: true
      });

      _map(assets, (asset) => {
        const { type, src } = asset;

        if (type === 'css') {
          createStylesheet(src, headElement);
        } else if (type === 'js') {
          createJavaScript(src, bodyElement);
        }
      });

      return this.props.removeLoadingScreen();
    }
  }

  render () {
    return (
      <div className={classNames('canvas__holder')}>
        <TTIFrame id='ab-cfrm' ref='frame' contentDidMount={::this.normalizeFrame}>
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
        </TTIFrame>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    page: state.page,
    template: state.template
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // Frame events.
    removeLoadingScreen: () => {
      dispatch(Actions.removeLoadingScreen());
    },

    // Canvas events.
    renderBlockToCanvas: (block, elementReference) => {
      dispatch(Actions.blockWasRenderedToPage(block, elementReference));
    },

    coreBlockHover: (elementReference, block) => {
      dispatch(Actions.currentHoverBlock(elementReference, block));
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
