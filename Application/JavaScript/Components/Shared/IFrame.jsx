import React, { Component } from 'react';
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom';
import { connect } from 'react-redux';

class Frame extends Component {
  constructor (props) {
    super(props);

    this.state = {
      coreFilesAppended: false
    };
  }

  renderFrame () {
    const frame = this.refs.frm;
    const frameDoc = frame.contentWindow.document;

    frameDoc.designMode = 'on';

    this._documentElement = frameDoc;
    this._headElement = frameDoc.head;
    this._bodyElement = frameDoc.body;

    let rootElement = document.createElement('div');

    this._bodyElement.appendChild(rootElement);
    render(this._children, rootElement);
  }

  appendFiles (coreFiles) {
    coreFiles.push({
      type: 'css',
      src: '/IFrameStylesheet.css'
    });

    coreFiles.push({
      type: 'css',
      src: 'http://themes-pixeden.com/font-demos/7-stroke/Pe-icon-7-stroke.css'
    });

    coreFiles.map((file, i) => {
      let type = file.type;

      if (type === 'css') {
        this.createStylesheet(file);
      }
    });
  }

  createStylesheet (styleSheet) {
    const { src } = styleSheet;
    let link = document.createElement('link');

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', src);

    this._headElement.appendChild(link);
  }

  createJavaScript (javaScript) {
    const { src } = javaScript;
    let srcElement = document.createElement('script');

    srcElement.setAttribute('src', src);

    this._bodyElement.appendChild(srcElement);
  }

  componentDidMount () {
    setTimeout(::this.renderFrame, 0);
  }

  componentWillReceiveProps (nextProps) {
    const props = nextProps;
    const theme = props.theme;
    const { coreFilesAppended } = this.state;

    if (!coreFilesAppended) {
      if (theme.hasOwnProperty('external')) {
        if (theme.external.hasOwnProperty('core')) {
          let coreFiles = theme.external.core;

          if (coreFiles && coreFiles.length) {
            this.appendFiles(coreFiles);

            this.setState({
              coreFilesAppended: true
            });
          }
        }
      }
    }
  }

  componentWillUnmount () {
    unmountComponentAtNode(this._bodyElement);
  }

  render () {
    this._children = this.props.children;

    return (
      <iframe
        id='ab-cfrm'
        ref='frm'
        onLoad={::this.renderFrame} />
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
)(Frame);
