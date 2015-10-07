import React, { Component } from 'react';
import { connect } from 'react-redux';

class IFrame extends Component {
  constructor (props) {
    super(props);

    this.state = {
      areCoreFilesAppendedInHead: false
    };
  }

  componentDidMount () {
    let canvasReference = this.refs.canvas;
    let canvasDocumentElement = canvasReference.contentWindow.document;
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

    // Manually bind refs.
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

    // Add template items.
    const { _canvas } = props.theme;
    const canvas = _canvas;
    const { navigationBlock, mainBlocks, footerBlock } = canvas;

    // Navigation
    if (Object.keys(navigationBlock).length !== 0) {

    }

    // Main blocks
    if (mainBlocks.length !== 0) {
      let allBlocksHTML = '';

      mainBlocks.map((block, i) => {
        const source = block.src;

        allBlocksHTML += source;
      });

      this.refs.main.innerHTML = allBlocksHTML;
    }

    // Footer
    if (Object.keys(footerBlock).length !== 0) {

    }
  }

  render () {
    return (
      <iframe 
        ref='canvas'
        id='ab-canvas'
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