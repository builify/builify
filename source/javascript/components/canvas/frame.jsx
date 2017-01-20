import React from 'react';
import TTDOM from '../../common/TTDOM';
import TTIFrame from '../../modules/react-tt-iframe';
import ClickToolbox from './click-toolbox';
import SectionToolBox from './section-toolbox';
import classNames from '../../common/classnames';
import * as Actions from '../../actions';
import * as Constants from '../../constants';
import { connect } from 'react-redux';
import { store } from '../application-container';
import {
  values as _values,
  delay as _delay,
  map as _map,
  assign as _assign,
  isElement as _isElement,
  isObject as _isObject
} from 'lodash';

class Frame extends React.Component {
  static propTypes = {
    page: React.PropTypes.object.isRequired,
    externalAssets: React.PropTypes.object.isRequired,
    removeLoadingScreen: React.PropTypes.func.isRequired,
    renderBlockToCanvas: React.PropTypes.func.isRequired,
    setCanvasElementsHoverEvents: React.PropTypes.func.isRequired,
    coreBlockHover: React.PropTypes.func.isRequired,
    clearPageBlocksCount: React.PropTypes.func.isRequired
  };

  _blocks = {};
  _blocksCache = [];

  shouldComponentUpdate (nextProps) {
    if (nextProps.page.pageID !== this.props.page.pageID ||
        nextProps.page.blocksCount === 0) {
      this.clearCanvas();
    }

    return true;
  }

  componentDidMount () {
    this.drawCanvas();
    this.checkBlockCount();
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

  normalizeFrame (frameDocument) {
    if (!frameDocument) {
      return;
    }

    const { externalAssets } = this.props;
    let { core: assets } = externalAssets;
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
  const { external: externalAssets } = template;

  return {
    page: page,
    externalAssets
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

    clearPageBlocksCount: function () {
      dispatch(Actions.clearPageBlocksCount());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
