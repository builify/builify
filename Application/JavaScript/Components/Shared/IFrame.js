import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeBlockFromToRenderList } from '../../Actions/ActionCreators';

class IFrame extends Component {
  constructor (props) {
    super(props);

    this.state = {
      areCoreFilesAppendedInHead: false,

      mainBlocks: []
    };
  }

  componentDidMount () {
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

    navigationElement.setAttribute('class', 'ab-navigation__wrapper');
    mainElement.setAttribute('class', 'ab-main__wrapper');
    footerElement.setAttribute('class', 'ab-footer__wrapper');
    navigationElement.setAttribute('id', 'ab-navigation__wrapper');
    mainElement.setAttribute('id', 'ab-main__wrapper');
    footerElement.setAttribute('id', 'ab-footer__wrapper');

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

                linkElement.setAttribute('src', source);
                linkElement.setAttribute('data-fileurl', source);

                headElement.appendChild(linkElement);
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

    this.renderMainBlocks(main);

    this.contentEditable();
  }

  renderMainBlocks (main) {
    const { mainBlocks } = this.state;
    const mainElement = this.refs.main;
    let html = '';

    main.map((block, i) => {
      const { id, type, blockName, source } = block;

      html += source;
    });

    this.setState({
      mainBlocks: main
    });

    mainElement.innerHTML = html;
  }

  contentEditable () {
    let whereToFindItems = this.refs.body.querySelectorAll('section:not([data-hasbeencrawledthrough]), nav:not([data-hasbeencrawledthrough]), header:not([data-hasbeencrawledthrough]), footer:not([data-hasbeencrawledthrough])');
    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };

    [].slice.call(whereToFindItems).map((searchPlace, i) => {
      let items = searchPlace.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6, strong, em, ul, li, i, section, header, figure, iframe, input, textarea, blockquote, figcaption');

      forEach(items, function (index, value) {
        value.contentEditable = true;
      });

      searchPlace.setAttribute('data-hasbeencrawledthrough', 'yes');
    });
  }

  render () {
    return (
      <iframe 
        ref='canvas'
        id='ab-canvas'
        name='ab-canvas'
        className='ab-canvas__wrapper' />
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