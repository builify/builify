export default class {
  defaultProps = {
    target: null,
    toolboxItems: [
      { name: 'bold' },
      { name: 'italic' },
      { name: 'strike' }
    ]
  };

  userProps = {};
  windowObject = null;
  documentElement = null;
  bodyElement = null;

  constructor (props) {
    this._setUserProps(props);
    this._createElementRefrences();
    this._attachToolbox();
    this._bindTextSelectionEvents();
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

  _getIcon (icon) {
    var pathString = '';

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
    }

    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('viewBox','0 0 24 24');
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    svgElement.innerHTML = pathString;

    return svgElement;
  }

  _attachToolbox () {
    const { toolboxItems } = this.userProps;
    var toolbox = document.createElement('div');
    var toolboxWrapper = document.createElement('div');

    toolboxItems.forEach((item) => {
      const { name } = item;
      var item = document.createElement('button');

      item.setAttribute('class', name);
      item.appendChild(this._getIcon(name));

      toolboxWrapper.appendChild(item);
    });

    toolboxWrapper.setAttribute('class', 'tteditor__wrapper');
    toolbox.setAttribute('class', 'tteditor');
    toolbox.appendChild(toolboxWrapper);

    this.bodyElement.appendChild(toolbox);
  }

  _bindTextSelectionEvents () {
    this.documentElement.onmouseup = ::this._doTextSelection;
    this.documentElement.onmouseup = ::this._doTextSelection;
  }

  _getSelection () {
    return this.windowObject.getSelection();
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

  _doTextSelection (event) {
    var selection = this._getSelection();

    if (!selection.anchorNode) {
      return;
    }

    var textProperty = this._getTextPropertyForSelection(selection.anchorNode);
    var subject = selection.anchorNode[textProperty];
  }
};
