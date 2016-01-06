import TTEventEmitter from '../TTEventEmitter';
import Utilities from './Utilities';
import * as Config from './Config';

export default class {
  defaultProps = {
    elementsContainer: null,
    toolboxItems: Config.toolboxItems,

    classes: {
      'main': 'tteditor',
      'wrapper': 'tteditor__wrapper',
      'hide': 'tteditor__hide',
      'show': 'tteditor__show'
    }
  };

  userProps = {};
  windowObject = null;
  documentElement = null;
  bodyElement = null;
  toolboxElement = null;
  toolboxHeight = 42;
  toolboxWidth = 113;
  toolboxOpen = false;
  toolboxButtons = [];
  observable = new TTEventEmitter();

  constructor (props) {
    this._setUserProps(props);
    this._createElementRefrences();
    this._attachToolbox();
    this._bindEvents();
  }

  _setUserProps (props) {
    this.userProps = Object.assign({}, this.defaultProps, props);
  }

  _createElementRefrences () {
    const { elementsContainer } = this.userProps;

    this.windowObject = elementsContainer;
    this.documentElement = this.windowObject.document;
    this.bodyElement = this.documentElement.querySelector('body');
  }

  _getIcon (icon, pathString = '') {
    /* eslint-disable */
    switch (icon) {
      case 'bold':
        pathString = '<g><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4h-6.25v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zm-5.6-4.29h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9h-3.5v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>';
        break;

      case 'italic':
        pathString = '<g><path d="M10 4v3h2.21l-3.42 8h-2.79v3h8v-3h-2.21l3.42-8h2.79v-3z"></path></g>';
        break;

      case 'underline':
        pathString = '<g><path d="M12 17c3.31 0 6-2.69 6-6v-8h-2.5v8c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5v-8h-2.5v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2h-14z"></path></g>';
        break;

      case 'link':
        pathString = '<g><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1zm4.1 1h8v-2h-8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>';
        break;

      default:
        break;
    }
    /* eslint-enable */

    let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('viewBox','0 0 24 24');
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    svgElement.innerHTML = pathString;

    return svgElement;
  }

  _addButtonEvent (button, item) {
    if (!button || !item) {
      return;
    }

    button.addEventListener('click', () => {
      switch (item.name) {
        case 'bold':
        case 'italic':
        case 'underline':
          this.observable.emit('textstyling', button, item);
          break;

        case 'link':
          this.observable.emit('linkchange', button, item);
          break;

        default:
          break;
      }
    });
  }

  _createElement (tagName, options, children) {
    const element = document.createElement(tagName.toString());

    Config.elementAttributes.forEach((attribute) => {
      const { org, attr } = attribute;

      if (options.hasOwnProperty(org)) {
        element.setAttribute(attr, options[org]);
      }
    });

    if (children) {
      element.appendChild(children);
    }

    return element;
  }

  _attachToolbox () {
    const { toolboxItems, classes } = this.userProps;
    const { main, wrapper, hide } = classes;
    let toolbox = document.createElement('div');
    let toolboxWrapper = document.createElement('div');

    toolboxItems.forEach((item) => {
      const { name, desc } = item;

      const button = this._createElement('button', {
        className: name,
        title: desc
      }, this._getIcon(name));

      toolboxWrapper.appendChild(button);
      this.toolboxButtons.push(button);
      this._addButtonEvent(button, item);
    });

    toolboxWrapper.appendChild(this._createElement('input', {
      type: 'text',
      placeholder: 'http://'
    }));

    toolboxWrapper.setAttribute('class', wrapper);
    toolbox.setAttribute('class', `${main} ${hide}`);
    toolbox.setAttribute('data-tteditor', true);
    toolbox.appendChild(toolboxWrapper);

    this.bodyElement.appendChild(toolbox);

    this.toolboxElement = toolbox;
  }

  _bindEvents () {
    this.observable.addListener('textselection', ::this._triggerTextSelection);
    this.observable.addListener('toggletoolboxdisplay', ::this._toggleToolboxDisplay);
    this.observable.addListener('textstyling', ::this._triggerTextStyling);
    this.observable.addListener('linkchange', ::this._triggerLinkChange);

    this.documentElement.onmouseup = (e) => {
      this.observable.emit('textselection', e);
    };
  }

  _triggerTextStyling (node, item) {
    if (!item || !item.hasOwnProperty('cmd')) {
      return;
    }

    const { cmd } = item;

    this.documentElement.execCommand(cmd, false, null);
  }

  _triggerLinkChange (button, item) {
    this.toolboxElement.classList.add('link-change');
  }

  _getSelection () {
    return this.windowObject.getSelection();
  }

  _getFocusNode () {
    return this._getSelection().focusNode;
  }

  _getTextPropertyForSelection (element) {
    var property;

    if (!element) {
      throw Error('TTEditor: Missing element.');
    }

    if (element.nodeType === Node.TEXT_NODE) {
      property = 'data';
    } else {
      property = 'innerText';
    }

    return property;
  }

  _triggerTextSelection (event) {
    const selection = this._getSelection();
    const eventTarget = event.target || event.srcElement;
    const isToolboxElement = Utilities.findUpToAttr(eventTarget, 'data-tteditor');

    if (isToolboxElement !== null) {
      return this._reloadToolboxButtons();
    }

    if (!eventTarget.isContentEditable) {
      this._hideToolbar();

      return;
    }

    if (selection.isCollapsed) {
      this._hideToolbar();

      return;
    }

    this._showToolbar(selection);
  }

  _getScrollPosition () {
    const doc = this.documentElement.documentElement;

    return {
      top: (this.windowObject.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0),
      left: (this.windowObject.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    };
  }

  _toggleToolboxDisplay () {
    const { classes } = this.userProps;
    const { hide, show } = classes;
    const isOpen = this.toolboxOpen;

    if (isOpen) {
      this.toolboxElement.classList.remove(hide);
      this.toolboxElement.classList.add(show);
    } else {
      this.toolboxElement.classList.remove(show);
      this.toolboxElement.classList.add(hide);
    }
  }

  _showToolbar (selection) {
    const range = selection.getRangeAt(0);
    const clientRectBounds = range.getBoundingClientRect();
    const scrollPosition = this._getScrollPosition();
    const { top, right, left } = clientRectBounds;
    const { top: scrollTop } = scrollPosition;
    let toolboxPosition = {
      x: 0,
      y: 0
    };
    const toolboxWidth = this.toolboxElement.offsetWidth;

    toolboxPosition = Object.assign({}, toolboxPosition, {
      x: Math.round(((right - left) / 2) + left) - (toolboxWidth / 2),
      y: (top + scrollTop) - this.toolboxHeight
    });

    this.toolboxOpen = true;

    this._setToolbarPosition(toolboxPosition);

    this.observable.emit('toggletoolboxdisplay');
  }

  _hideToolbar () {
    if (!this.toolboxOpen) {
      return;
    }

    this.toolboxOpen = false;

    this.observable.emit('toggletoolboxdisplay');
  }

  _setToolbarPosition ({ x, y }) {
    this.toolboxElement.style.top = `${y}px`;
    this.toolboxElement.style.left = `${x}px`;
  }

  _iterateToolboxButtons (callback) {
    this.toolboxButtons.forEach((button) => {
      callback(button);
    });
  }

  _reloadToolboxButtons () {
  }
};
