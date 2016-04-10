import React from 'react';
import ReactDOM from 'react-dom';
import omit from 'lodash/omit';
import delay from 'lodash/delay';

export default class extends React.Component {
  childrenCopy = null;
  body = null;
  head = null;

  renderFrame () {
    const frame = ReactDOM.findDOMNode(this);

    this.head = frame.contentDocument.head;
    this.body = frame.contentDocument.body;

    ReactDOM.render(this.childrenCopy, this.body);
  }

  componentDidMount () {
    delay(this.renderFrame, 0);
  }

  componentWillReceiveProps (nextProps) {
    const frame = ReactDOM.findDOMNode(this);
    ReactDOM.render(nextProps.children, frame.contentDocument.body);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).contentDocument.body);
  }

  render () {
    this.childrenCopy = this.props.children;

    return <iframe {...omit(this.props, ['children'])} onLoad={::this.renderFrame} />;
  }
}
