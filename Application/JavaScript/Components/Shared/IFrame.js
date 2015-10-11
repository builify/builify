import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class IFrame extends Component {
  constructor (props) {
    super(props);

    this.state = {
      areCoreFilesAppendedInHead: false,

      mainBlocks: []
    };
  }

  componentDidMount () {
    this.appendElements();
    this.rightClickPanel();
  }

  appendElements () {
    let canvasReference = this.refs.canvas;
    let canvasDocumentElement = canvasReference.contentWindow.document;

    // Firefox iFrame fix START
    canvasDocumentElement.open();
    canvasDocumentElement.close();
    // Firefox iFrame fix END

    let bodyElement = canvasDocumentElement.body;

    // Create wrappers for navigation, main and footer.
    let navigationElement = document.createElement('div');
    let mainElement = document.createElement('div');
    let footerElement = document.createElement('div');
    let documentFragment = document.createDocumentFragment();

    navigationElement.setAttribute('class', 'ab-cnavigation__wrapper');
    mainElement.setAttribute('class', 'ab-cmain__wrapper');
    footerElement.setAttribute('class', 'ab-cfooter__wrapper');

    documentFragment.appendChild(navigationElement);
    documentFragment.appendChild(mainElement);
    documentFragment.appendChild(footerElement);

    bodyElement.appendChild(documentFragment);

    this.refs.body = bodyElement;
    this.refs.navigation = navigationElement;
    this.refs.main = mainElement;
    this.refs.footer = footerElement;
  }

  componentWillReceiveProps (nextProps) {
    const props = nextProps;
    const theme = props.theme;
    const { areCoreFilesAppendedInHead } = this.state;

    // Add template source files to head.
    if (!areCoreFilesAppendedInHead) {
      if (theme.hasOwnProperty('external')) {
        if (theme.external.hasOwnProperty('core')) {
          let coreFiles = theme.external.core;
          let canvasReference = this.refs.canvas;
          let canvasDocumentElement = canvasReference.contentWindow.document;
          let headElement = canvasDocumentElement.head;

          // Add iframe styles.
          coreFiles.push({
            type: 'css',
            src: '/IFrameStylesheet.css'
          });

          coreFiles.map((file, i) => {
            let source = file.src;
            let type = file.type;

            if (type === 'css') {
              let doesItemAlreadyExist = document.querySelector('link[data-fileurl="' + source +'"]');

              if (doesItemAlreadyExist === undefined || doesItemAlreadyExist === null) {
                let linkElement = document.createElement('link');

                linkElement.setAttribute('href', source);
                linkElement.setAttribute('data-fileurl', source);
                linkElement.setAttribute('rel', 'stylesheet');
                linkElement.setAttribute('type', 'text/css');

                headElement.appendChild(linkElement);
              }
            } else if (type === 'js') {
              let doesItemAlreadyExist = document.querySelector('script[data-fileurl="' + source +'"]');

              if (doesItemAlreadyExist === undefined || doesItemAlreadyExist === null) {
                let srcElement = document.createElement('script');

                srcElement.setAttribute('src', source);
                srcElement.setAttribute('data-fileurl', source);

                headElement.appendChild(srcElement);
              }
            } else {
              console.warn('' + type + ' - is invalid type for source: ' + source);
            }
          });
        }
      }

      this.setState({
        areCoreFilesAppendedInHead: true
      });
    }

    this.renderBlocks();
  }

  renderBlocks () {
    const { theme } = this.props;
    const { _currentPage } = theme;
    const currentPage = _currentPage;
    const { navigation, main, footer } = currentPage;

    this.renderNavigation(navigation);
    this.renderMainBlocks(main);
    this.renderFooter(footer);

    //this.contentEditable();
  }

  renderNavigation (navigation) {
    if (Object.keys(navigation).length === 0) {
      return;
    }

    const { id, type, blockName, source } = navigation;
    const navigationElement = this.refs.navigation;
    const mainElement = this.refs.main;

    if (source === null || source === undefined) {
      return;
    }

    navigationElement.innerHTML = source;

    let navElement = navigationElement.firstElementChild || navigationElement.firstChild;

    if (navElement !== undefined) {
      let computedStyle = getComputedStyle(navElement);
      let positionValue = computedStyle.getPropertyValue('position');
      let backgroundColorValue = computedStyle.getPropertyValue('background-color');

      if ((positionValue === 'absolute' || positionValue === 'fixed')) {
        let elementHeight = Math.round(navElement.offsetHeight);

        /*if (backgroundColorValue === 'transparent') {
          mainElement.style.marginTop = elementHeight + 'px';
        } else {
          let firstMainElement = mainElement.firstElementChild || mainElement.firstChild;

          if (firstMainElement !== undefined) {
            firstMainElement.style.paddingTop = elementHeight + 'px';
          } else {
            mainElement.style.paddingTop = elementHeight + 'px';
          }
        }*/
      }
    }
  }

  renderMainBlocks (main) {
    if (main === undefined || main === null || main.length === 0) {
      return;
    }

    const mainElement = this.refs.main;
    let html = '';

    main.map((block, i) => {
      const { id, type, blockName, source } = block;

      html += source;
    });

    mainElement.innerHTML = html;
  }

  renderFooter (footer) {
    const footerElement = this.refs.footer;
    let html = '';

    footer.map((block, i) => {
      const { id, type, blockName, source } = block;

      html += source;
    });

    footerElement.innerHTML = html;
  }

  contentEditable () {
    let whereToFindItems = this.refs.body.querySelectorAll('section, nav, header, footer');
    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };

    [].slice.call(whereToFindItems).map((searchPlace, i) => {
      if (searchPlace.getAttribute('data-hasbeencrawledthrough')) {
        return;
      }

      let items = searchPlace.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6, strong, em, ul, li, i, section, header, figure, iframe, input, textarea, blockquote, figcaption');

      forEach(items, function (index, value) {
        value.contentEditable = true;
        value.classList.add('ab-editable');
      });

      searchPlace.setAttribute('data-hasbeencrawledthrough', 'yes');
    });
  }

  rightClickPanel () {
    const targetElement = this.refs.body;

    let isContextMenuOpened = false;

    let rightPlaneElement = document.createElement('div');
    let rightPanelMainText = document.createElement('div'); 

    rightPlaneElement.setAttribute('class', 'ab-crightpanel');
    rightPanelMainText.setAttribute('class', 'ab-crightpanel__text');

    rightPlaneElement.appendChild(rightPanelMainText);

    targetElement.appendChild(rightPlaneElement);

    targetElement.addEventListener('contextmenu', function (e) {
      const target = e.target;
      const HTMLTags = {
        DIV: "Div",
        SECTION: "Section",
        HEADER: "Header",
        H1: "Heading",
        H2: "Heading",
        H3: "Heading",
        H4: "Heading",
        H5: "Heading",
        H6: "Heading",
        P: "Paragraph",
        SPAN: "Span",
        UL: "Unordered List",
        LI: "List Item",
        IMG: "Image",
        STRONG: "Strong Text",
        EM: "Emphasised Text",
        I: "Icon",
        A: "Link",
        INPUT: "Input",
        BLOCKQUOTE: "Quote",
        FIGCAPTION: "Caption"
      };

      if (e.shiftKey) {
        return;
      }

      e.preventDefault();
      isContextMenuOpened = true;

      const panelTagName = HTMLTags[target.tagName];
      const eventPosition = {
        x: e.clientX,
        y: e.clientY
      };

      rightPlaneElement.classList.add('show');

      rightPanelMainText.textContent = String(panelTagName);
      rightPlaneElement.style.top = eventPosition.y + 'px';
      rightPlaneElement.style.left = eventPosition.x + 'px';
    }, false);

    targetElement.addEventListener('click', (e) => {
      if (isContextMenuOpened) {
        rightPlaneElement.classList.remove('show');
        isContextMenuOpened = false;
      }
    }, false);
  }

  render () {
    return (
      <iframe 
        ref='canvas'
        id='ab-canvas'
        name='ab-canvas'
        className='ab-canvas__wrapper'
        scrolling='yes' />
    )
  }
}

function mapStateToProps (state) {
  return {
    theme: state.theme
  }
}

export default connect(
  mapStateToProps
)(IFrame);