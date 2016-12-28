import React from 'react';
import ReactDOM from 'react-dom';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';

export default class IFrame extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    head: React.PropTypes.node,
    initialContent: React.PropTypes.string,
    mountTarget: React.PropTypes.string,
    contentDidMount: React.PropTypes.func,
    contentDidUpdate: React.PropTypes.func,
    children: React.PropTypes.node
  };

  static defaultProps = {
    initialContent: '<!DOCTYPE html><html><head></head><body><div></div></body></html>',
    contentDidMount: function () {},
    contentDidUpdate: function () {}
  };

  _isMounted = false;
  _document = null;
  _node = null;

  render () {
    const props = _omit(this.props, [
      'contentDidMount',
      'contentDidUpdate',
      'initialContent'
    ]);

    return React.createElement('iframe', _assign({}, props, { children: undefined }));
  }

  componentDidMount () {
    this._isMounted = true;
    this.renderFrameContents();
  }

  renderFrameContents() {
    if (!this._isMounted) {
      return;
    }

    var doc = ReactDOM.findDOMNode(this).contentDocument;

    if (doc && doc.readyState === 'complete') {
      var contents = React.createElement('div',
        { 'data-ttroot': true },
        this.props.head,
        this.props.children
      );

      var initialRender = !this._setInitialContent;

      if (!this._setInitialContent) {
        doc.open();
        doc.write(this.props.initialContent);
        doc.close();
        this._setInitialContent = true;
      }

      // unstable_renderSubtreeIntoContainer allows us to pass this component as
      // the parent, which exposes context to any child components.
      var mountTarget;

      const callback = () => {
        if (initialRender) {
          this.props.contentDidMount(doc);
        } else {
          this.props.contentDidUpdate(doc);
        }
      };

      if (this.props.mountTarget) {
        mountTarget = doc.querySelector(this.props.mountTarget);
      } else {
        mountTarget = doc.body.children[0];
      }

      ReactDOM.unstable_renderSubtreeIntoContainer(this, contents, mountTarget, callback);

      this._document = doc;
    } else {
      setTimeout(::this.renderFrameContents, 0);
    }
  }

  componentDidUpdate () {
    this.renderFrameContents();
  }

  componentWillUnmount () {
    const iframe = ReactDOM.findDOMNode(this);
    const doc = iframe.contentDocument;

    this._isMounted = false;

    if (doc) {
      ReactDOM.unmountComponentAtNode(doc.body);
    }
  }
}
