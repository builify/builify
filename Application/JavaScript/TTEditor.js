class EventEmitter {
  constructor () {
    this.listeners = new Map();
  }

  isFunction (type) {
    return !!(Object.prototype.toString.call(type) === '[object Function]');
  }

  addListener (label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }

  removeListener(label, callback) {
    let listeners = this.listeners.get(label),
      index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return (this.isFunction(listener) && listener === callback) ? i = index : i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(label, listeners);
        return true;
      }
    }

    return false;
  }

  emit (label, ...args) {
    let listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args);
      });

      return true;
    }

    return false;
  }
}

export default class {
  defaultProps = {
    target: null,
    toolboxItems: [
      {
        name: 'bold',
        cmd: 'bold',
        desc: 'Toggles bold on/off for the selection or at the insertion point.'
      },
      {
        name: 'italic',
        cmd: 'italic',
        desc: 'Toggles italics on/off for the selection or at the insertion point.'
      },
      {
        name: 'strike',
        cmd: 'strikeThrough',
        desc: 'Toggles strikethrough on/off for the selection or at the insertion point.'
      },
      {
        name: 'underline',
        cmd: 'underline',
        desc: 'Toggles underline on/off for the selection or at the insertion point.'
      }
    ],

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
  observable = new EventEmitter();

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
    const { target } = this.userProps;

    this.windowObject = target;
    this.documentElement = this.windowObject.document;
    this.bodyElement = this.documentElement.querySelector('body');
  }

  _getIcon (icon, pathString = '') {
    switch (icon) {
      case 'bold':
        pathString = '<g><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4h-6.25v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zm-5.6-4.29h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9h-3.5v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>';
        break;

      case 'italic':
        pathString = '<g><path d="M10 4v3h2.21l-3.42 8h-2.79v3h8v-3h-2.21l3.42-8h2.79v-3z"></path></g>';
        break;

      case 'strike':
        pathString = '<g><path d="M10 19h4v-3h-4v3zm-5-15v3h5v3h4v-3h5v-3h-14zm-2 10h18v-2h-18v2z"></path></g>';
        break;

      case 'underline':
        pathString = '<g><path d="M12 17c3.31 0 6-2.69 6-6v-8h-2.5v8c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5v-8h-2.5v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2h-14z"></path></g>';
        break;
    }

    let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('viewBox','0 0 24 24');
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    svgElement.innerHTML = pathString;

    return svgElement;
  }

  findUpToAttr (el, attr) {
    if (el.getAttribute(attr)) {
      return el;
    }

    while (el.parentNode) {
      el = el.parentNode;

      if (el.getAttribute(attr)) {
        return el;
      }

      if (el.tagName === 'HTML') {
        break;
      }
    }

    return null;
  }

  _attachToolbox () {
    const { toolboxItems, classes } = this.userProps;
    const { main, wrapper, hide } = classes;
    let toolbox = document.createElement('div');
    let toolboxWrapper = document.createElement('div');

    toolboxItems.forEach((item) => {
      const { name, desc, cmd } = item;

      item = document.createElement('button');

      item.setAttribute('class', name);
      item.setAttribute('title', desc);
      item.appendChild(this._getIcon(name));

      toolboxWrapper.appendChild(item);

      this.toolboxButtons.push(item);

      item.addEventListener('click', () => {
        this.observable.emit('textstyling', item, cmd);
      });
    });

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

    this.documentElement.onmouseup = (e) => {
      this.observable.emit('textselection', e);
    };
  }

  _triggerTextStyling (node, cmd) {
    this.documentElement.execCommand(cmd, false, null);
  }

  _getSelection () {
    return this.windowObject.getSelection();
  }

  _getFocusNode () {
    return this._getSelection().focusNode;
  }

  _getParent (node, condition, returnCallback) {
    if (node === null) {
      return;
    }

    while (node.parentNode) {
      if (condition(node)) {
        return returnCallback(node);
      }

			node = node.parentNode;
		}
	}

	_getParentWithTag (node, nodeType) {
  		var checkNodeType = function(node) { return node.nodeName.toLowerCase() === nodeType; }
  		var returnNode = function(node) { return node; };
  		return this.getParent(node, checkNodeType, returnNode);
	}

	hasParentWithTag (node, nodeType) {
		return !!this._getParentWithTag(node, nodeType);
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
    const isToolboxElement = this.findUpToAttr(eventTarget, 'data-tteditor');

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
    let x = 0;
    let y = 0;

    this.toolboxWidth = this.toolboxElement.offsetWidth;

    y = (top + scrollTop) - this.toolboxHeight;
    x = Math.round(((right - left) / 2) + left) - (this.toolboxWidth / 2);

    this._setToolbarPosition(y, x);

    this.toolboxOpen = true;

    this.observable.emit('toggletoolboxdisplay');
  }

  _hideToolbar () {
    if (!this.toolboxOpen) {
      return;
    }

    this.toolboxOpen = false;

    this.observable.emit('toggletoolboxdisplay');
  }

  _setToolbarPosition (top, left) {
    this.toolboxElement.style.top = `${top}px`;
    this.toolboxElement.style.left = `${left}px`;
  }

  _iterateToolboxButtons (callback) {
    this.toolboxButtons.forEach((button) => {
      callback(button);
    });
  }

  _reloadToolboxButtons () {
    const focusNode = this._getFocusNode();

    console.log(focusNode);
  }
};
