import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { JUNK_ATTR } from '../../Constants';
import { removeLoadingScreen } from '../../Actions';
import TTDOM from '../../Common/TTDOM';
import _ from 'lodash';

const Helpers = {
  createStylesheet (source, target, notInClientProduct = false) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = source;

    if (notInClientProduct) {
      link.setAttribute(JUNK_ATTR, true);
    }

    target.appendChild(link);
  },

  createJavaScript (source, target) {
    let link = document.createElement('script');
    link.src = source;
    target.appendChild(link);
  }
};

class Frame extends React.Component {
  static propTypes = {
    title: React.PropTypes.string
  };

  static defaultProps = {
    title: 'Page Title'
  };

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
    setTimeout(this.renderFrame(), 0);
  }

  componentWillUnmount () {
    const doc = ReactDOM.findDOMNode(this).contentDocument;

    if (doc) {
      ReactDOM.unmountComponentAtNode(doc.body);
    }
  }

  renderFrame () {
    var doc = ReactDOM.findDOMNode(this).contentDocument;

    if (doc && doc.readyState === 'complete') {
      const { template, title } = this.props;
      const frame = this.refs.frm;
      const frameDoc = TTDOM.iframe.getWindow(frame).document;
      const rootElement = document.createElement('div');

      frameDoc.srcdoc = '<!DOCTYPE html>';
      frameDoc.title = title;

      this._documentElement = frameDoc;
      this._headElement = frameDoc.head;
      this._bodyElement = frameDoc.body;

      this._bodyElement.appendChild(rootElement);
      ReactDOM.render(this.props.children, rootElement);

      this.appendFiles(template.external.core);
    } else {
      setTimeout(this.renderFrame, 0);
    }
  }

  appendFiles (coreFiles) {
    const { onRemoveLoadingScreen } = this.props;
    const frameCSS = {
      type: 'css',
      src: '/canvas-stylesheet.css',
      junk: true
    };

    if (!coreFiles || !_.isArray(coreFiles)) {
      return;
    }

    if (_.findKey(coreFiles, frameCSS) === undefined) {
      coreFiles.unshift(frameCSS);
    }

    this._filesLength = coreFiles.length;
    this._filesLoaded = 0;

    _.map(coreFiles, (file) => {
      let type = file.type;

      if (type === 'css') {
        Helpers.createStylesheet(file.src, this._headElement, file.junk ? file.junk : false);
      } else if (type === 'js') {
        _.delay(() => {
          Helpers.createJavaScript(file.src, this._headElement);
        }, 10000);
      }

      this._filesLoaded++;
    });

    if (this._filesLoaded === this._filesLoaded) {
      onRemoveLoadingScreen();
    }
  }

  render () {
    this._children = this.props.children;

    return (
      <iframe
        id='ab-cfrm'
        ref='frm'
        onLoad={::this.renderFrame} />
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onRemoveLoadingScreen: () => {
      dispatch(removeLoadingScreen());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
