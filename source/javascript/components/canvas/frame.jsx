import React from 'react';
import _map from 'lodash/map';
import _isElement from 'lodash/iselement';
import _isObject from 'lodash/isobject';
import _values from 'lodash/values';
import _delay from 'lodash/delay';
import _assign from 'lodash/assign';
import TTDOM from '../../common/TTDOM';
import TTIFrame from '../../modules/react-tt-iframe';
import ClickToolbox from './click-toolbox';
import SectionToolBox from './section-toolbox';
import classNames from '../../common/classnames';
import * as Actions from '../../actions';
import * as Constants from '../../constants';
import { connect } from 'react-redux';
import { store } from '../application-container';

class Frame extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    template: React.PropTypes.object.isRequired,
    removeLoadingScreen: React.PropTypes.func.isRequired,
    renderBlockToCanvas: React.PropTypes.func.isRequired,
    setCanvasElementsHoverEvents: React.PropTypes.func.isRequired,
    coreBlockHover: React.PropTypes.func.isRequired,
    openContextMenu: React.PropTypes.func.isRequired,
    closeContextMenu: React.PropTypes.func.isRequired,
    openIconEditModal: React.PropTypes.func.isRequired,
    openImageEditModal: React.PropTypes.func.isRequired,
    openBlockEditorTab: React.PropTypes.func.isRequired,
    cloneItem: React.PropTypes.func.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    openVideoEditModal: React.PropTypes.func.isRequired,
    openCountdownEditModal: React.PropTypes.func.isRequired,
    openColorPicker: React.PropTypes.func.isRequired
  };

  _blocks = {};
  _blocksCache = [];

  shouldComponentUpdate (nextProps) {
    if (nextProps.page.pageID !== this.props.page.pageID) {
      this.clearCanvas();
    }

    return true;
  }

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

        if (!hasBeenRendered) {
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

        if (!hasBeenRendered) {
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
        TTDOM.element.remove(child);
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

  addMouseEventsToCoreBlock (coreElementReference, block) {
    // Add section hover event to core block.
    if (_isElement(coreElementReference)) {
      block = _assign({}, block, {
        hasBeenRendered: true,
        elementReference: coreElementReference
      });

      coreElementReference.addEventListener('mouseenter', () => {
        return this.props.coreBlockHover(coreElementReference, block);
      });
    }

    return this.props.setCanvasElementsHoverEvents();
  }

  drawCanvas () {
    this.setCoreElementsAttributes();
    this.renderNavigation();
    this.renderMainBlocks();
    this.renderFooter();
  }

  componentDidMount () {
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

        switch (type) {
          case 'css':
          case 'stylesheet': {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = src;

            if (asset.junk) {
              linkElement.setAttribute(Constants.JUNK_ATTR, true);
            }

            headElement.appendChild(linkElement);

            break;
          }

          case 'js':
          case 'javascript': {
            const scriptElement = document.createElement('script');
            scriptElement.src = src;

            if (src.indexOf('jquery') !== -1) {
              bodyElement.appendChild(scriptElement);
            } else {
              scriptElement.setAttribute('data-update', true);

              // Let jQuery load first and other files later.
              // Fixes issue #9.
              _delay(() => {
                bodyElement.appendChild(scriptElement);
              }, 1000);
            }
          }
        }
      });
      
      return this.props.removeLoadingScreen();
    }
  }

  render () {
    return (
      <div className={classNames('canvas__holder')} data-ttroot>
        <TTIFrame id='ab-cfrm' ref='frame' contentDidMount={::this.normalizeFrame}>
          <div ref='root' className='tt-canvas-root' data-ttroot>
            <div ref='navigation' className='tt-canvas-navigation' />
            <div ref='main' className='tt-canvas-main' />
            <div ref='footer' className='tt-canvas-footer' />

            <ClickToolbox
              openContextMenu={this.props.openContextMenu}
              closeContextMenu={this.props.closeContextMenu}
              openIconEditModal={this.props.openIconEditModal}
              openImageEditModal={this.props.openImageEditModal}
              openBlockEditorTab={this.props.openBlockEditorTab}
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
    removeLoadingScreen: function () {
      dispatch(Actions.removeLoadingScreen());
    },

    // Canvas events.
    renderBlockToCanvas: function (block, elementReference) {
      dispatch(Actions.blockWasRenderedToPage(block, elementReference));
    },

    coreBlockHover: function (elementReference, block) {
      dispatch(Actions.currentHoverBlock(elementReference, block));
    },

    setCanvasElementsHoverEvents: function () {
      dispatch(Actions.setCanvasElementsHoverEvents());
    },

    // Click toolbox events.
    openContextMenu: function () {
      dispatch(Actions.openContextmenuToolbox());
    },

    closeContextMenu: function () {
      dispatch(Actions.closeContextmenuToolbox());
    },

    openIconEditModal: function (target) {
      dispatch(Actions.openIconEditModal(target));
    },

    openImageEditModal: function (target) {
      dispatch(Actions.openImageEditModal(target));
    },

    openBlockEditorTab: function (editTarget) {
      dispatch(Actions.openBlockEditorTab(editTarget));
    },

    cloneItem: function () {
      dispatch(Actions.cloneItem());
    },

    // Section toolbox events.
    removeContentBlock: function (block) {
      dispatch(Actions.removeContentBlock(block));
    },

    openVideoEditModal: function (target) {
      dispatch(Actions.openVideoEditModal(target));
    },

    openCountdownEditModal: function (target){
      dispatch(Actions.openCountdownEditModal(target));
    },

    openColorPicker: function (target, sourceElement) {
      dispatch(Actions.openColorPicker(target, sourceElement));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
