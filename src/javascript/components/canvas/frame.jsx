import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  values as _values,
  delay as _delay,
  map as _map,
  assign as _assign,
  isElement as _isElement,
  isObject as _isObject,
  isEmpty as _isEmpty
} from 'lodash';
import TTDOM from '../../common/TTDOM';
import TTIFrame from '../../modules/react-tt-iframe';
import ClickToolbox from './click-toolbox';
import SectionToolBox from './section-toolbox';
import classNames from '../../common/classnames';
import * as Actions from '../../actions';
import * as Constants from '../../constants';
import { store } from '../application-container';

function isValidBlock (block) {
  const { id, type, blockName, source } = block;

  if (!id || !type || !blockName || !source) {
    throw new Error(`Something went wrong when setting block attributes. - ${JSON.stringify(block)}`);
  }

  return true;
}

class Frame extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    externalAssets: PropTypes.object.isRequired,
    coreAssets: PropTypes.object.isRequired,
    removeLoadingScreen: PropTypes.func.isRequired,
    renderBlockToCanvas: PropTypes.func.isRequired,
    setCanvasElementsHoverEvents: PropTypes.func.isRequired,
    coreBlockHover: PropTypes.func.isRequired,
    clearPageBlocksCount: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.drawCanvas();
    this.checkBlockCount();
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.page.pageID !== this.props.page.pageID ||
        nextProps.page.blocksCount === 0) {
      this.clearCanvas();
    }

    return true;
  }

  componentDidUpdate () {
    this.drawCanvas();
    this.checkBlockCount();
  }

  checkBlockCount () {
    if (this.refs.navigation && this.refs.main && this.refs.footer) {
      const navigationBlocks = this.refs.navigation.children;
      const mainBlocks = this.refs.main.children;
      const footerBlocks = this.refs.footer.children;

      if (navigationBlocks.length === 0 &&
          mainBlocks.length === 0 &&
          footerBlocks.length === 0 &&
          this.props.page.blocksCount !== 0) {
        return this.props.clearPageBlocksCount();
      }
    }
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
      if (isValidBlock(navigationBlock)) {
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
      if (isValidBlock(footerBlock)) {
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

  _blocks = {};
  _blocksCache = [];

  addMouseEventsToCoreBlock (coreElementReference, block) {
    // Add section hover event to core block.
    if (_isElement(coreElementReference)) {
      const renderedBlock = _assign({}, block, {
        hasBeenRendered: true,
        elementReference: coreElementReference
      });

      coreElementReference.addEventListener('mouseenter', () => {
        return this.props.coreBlockHover(coreElementReference, renderedBlock);
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

  normalizeFrame (frameDocument) {
    if (!frameDocument) {
      return;
    }

    const { externalAssets, coreAssets } = this.props;
    const { core: assets } = externalAssets;
    const headElement = frameDocument.head;
    const bodyElement = frameDocument.body;

    if (_isElement(headElement) && _isElement(bodyElement)) {
      assets.unshift({
        type: 'css',
        src: 'assets/static/canvas-stylesheet.css',
        junk: true
      });

      if (!_isEmpty(coreAssets.javascript)) {
        const element = document.createElement('script');
        element.type = 'text/javascript';
        element.setAttribute(Constants.JUNK_ATTR, true);

        if (element.styleSheet) {
          element.styleSheet.cssText = coreAssets.javascript; // IE
        } else {
          element.appendChild(document.createTextNode(coreAssets.javascript));
        }

        _delay(() => {
          bodyElement.appendChild(element);
        }, 1000);
      }

      if (!_isEmpty(coreAssets.stylesheet)) {
        const element = document.createElement('style');
        element.type = 'text/css';
        element.setAttribute(Constants.JUNK_ATTR, true);

        if (element.styleSheet) {
          element.styleSheet.cssText = coreAssets.stylesheet; // IE
        } else {
          element.appendChild(document.createTextNode(coreAssets.stylesheet));
        }

        _delay(() => {
          headElement.appendChild(element);
        }, 1000);
      }

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

            break;
          }

          default:
            break;
        }
      });

      this.props.removeLoadingScreen();
    }
  }

  render () {
    return (
      <div className={classNames('canvas__holder')} data-ttroot>
        <TTIFrame id="ab-cfrm" ref="frame" contentDidMount={::this.normalizeFrame}>
          <div ref="root" className="tt-canvas-root" data-ttroot>
            <div ref="navigation" className="tt-canvas-navigation" />
            <div ref="main" className="tt-canvas-main" />
            <div ref="footer" className="tt-canvas-footer" />

            <ClickToolbox store={store} />
            <SectionToolBox store={store} />
          </div>
        </TTIFrame>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { page, template } = state;
  const { external: externalAssets, core: coreAssets } = template;

  return {
    page,
    externalAssets,
    coreAssets
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

    setCanvasElementsHoverEvents: () => {
      dispatch(Actions.setCanvasElementsHoverEvents());
    },

    clearPageBlocksCount: () => {
      dispatch(Actions.clearPageBlocksCount());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
