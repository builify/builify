import React, { Component } from 'react';
import classNames from 'classnames';

class ClickToolbox extends Component {
  constructor (props) {
    super(props);

    this.state = {
      panelOpen: false,
      panelCoordinates: {
        x: 0,
        y: 0
      },
      target: null,
      targetName: ''
    };

    this.HTMLTagNames = {
      DIV: 'Div',
      SECTION: 'Section',
      HEADER: 'Header',
      FOOTER: 'Footer',
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
  }

  componentDidMount () {
    let panelElement = this.refs.panel;
    let clickTargetElement = panelElement.parentElement;

    clickTargetElement.addEventListener('contextmenu', ::this.openPanel, false);
    clickTargetElement.addEventListener('click', ::this.closePanel, false);
  }

  openPanel (e) {
    if (e.shiftKey) {
      return;
    }

    e.preventDefault();

    const eventPosition = {
      x: e.clientX,
      y: e.clientY
    };
    const target = e.target;
    const targetName = this.HTMLTagNames[target.tagName];

    this.setState({
      panelOpen: true,
      panelCoordinates: {
        x: eventPosition.x,
        y: eventPosition.y
      },
      target: target,
      targetName: targetName
    });
  }

  closePanel (e) {
    this.setState({
      panelOpen: false
    });
  }

  render () {
    const planelClassName = classNames('ab-crightpanel', this.state.panelOpen ? 'show' : '');
    const panelStyle = {
      top: this.state.panelCoordinates.y,
      left: this.state.panelCoordinates.x
    };

    return (
      <div 
        ref='panel'
        style={panelStyle}
        className={planelClassName}>
        <div className='ab-crightpanel__text'>
          {this.state.targetName}
        </div>
      </div>
    )
  }
}

export default ClickToolbox;