import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { JUNK_ATTR } from '../../Constants';
import { geThemeCustomStylesheetSheet, removeLoadingScreen } from '../../Actions';
import DOM from '../../Common/DOM';
import _ from 'lodash';

class Frame extends React.Component {
  static propTypes = {
    title: React.PropTypes.string
  }

  static defaultProps = {
    title: 'Page Title'
  }

  _isFrameRendered = false;
  _documentElement = null;
  _headElement = null;
  _bodyElement = null;
  _templateCustomStyleSheet = null;
  _filesLength = 0;
  _filesLoaded = 0;

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    this.renderFrame();
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this._bodyElement);
  }

  renderFrame () {
    if (!this._isFrameRendered) {
      const { template, title } = this.props;
      const frame = this.refs.frm;
      const frameDoc = DOM.iframe.getWindow(frame).document;
      const rootElement = document.createElement('div');

      frameDoc.srcdoc = '<!DOCTYPE html>'
      frameDoc.title = title;

      this._documentElement = frameDoc;
      this._headElement = frameDoc.head;
      this._bodyElement = frameDoc.body;

      this._bodyElement.appendChild(rootElement);
      ReactDOM.render(this._children, rootElement);

      if (_.has(template, 'external.core')) {
        this.appendFiles(template.external.core);
      }

      this.createThemeCustomStyleSheet();

      // Until we figure out how to make firefox work...
      //this._isFrameRendered = true;
    }
  }

  createThemeCustomStyleSheet () {
    let styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = 'customtemplatestylesheet';

    this._headElement.appendChild(styleElement);
    this._templateCustomStyleSheet = styleElement.sheet;

    this.sendThemeCustomStylesheetToReducer();
  }

  sendThemeCustomStylesheetToReducer () {
    const { onSendThemeCustomStylesheet } = this.props;

    if (this._templateCustomStyleSheet !== null) {
      onSendThemeCustomStylesheet(this._templateCustomStyleSheet);
    }
  }

  appendFiles (coreFiles) {
    const { onRemoveLoadingScreen } = this.props;
    const frameCSS = {
      type: 'css',
      src: '/IFrameStylesheet.css',
      junk: true
    };

    if (_.findKey(coreFiles, frameCSS) === undefined) {
      coreFiles.unshift(frameCSS);
    }

    this._filesLength = coreFiles.length;
    this._filesLoaded = 0;

    _.map(coreFiles, (file) => {
      let type = file.type;

      if (type === 'css') {
        this.createStylesheet(file);
      }

      this._filesLoaded++;
    });

    if (this._filesLoaded == this._filesLoaded) {
      onRemoveLoadingScreen();
    }
  }

  createStylesheet (styleSheet) {
    if (_.has(styleSheet, 'src')) {
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = styleSheet.src;

      if (_.has(styleSheet, 'junk')) {
        link.setAttribute(JUNK_ATTR, true);
      }

      this._headElement.appendChild(link);
    }
  }

  createJavaScript (javaScript) {
    if (_.has(javaScript, 'src')) {
      let script = document.createElement('script');
      script.src = javaScript.src;
      script.async = true;

      this._bodyElement.appendChild(script);
    }
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
    template: state.template
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSendThemeCustomStylesheet: (sheet) => {
      dispatch(geThemeCustomStylesheetSheet(sheet));
    },

    onRemoveLoadingScreen: () => {
      dispatch(removeLoadingScreen());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
