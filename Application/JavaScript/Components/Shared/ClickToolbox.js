import React, { Component } from 'react';
import classNames from 'classnames';
import ABuilder from '../../Common/Builder';
import Icon from './Icon';

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
      H1: 'Heading',
      H2: 'Heading',
      H3: 'Heading',
      H4: 'Heading',
      H5: 'Heading',
      H6: 'Heading',
      P: 'Paragraph',
      SPAN: 'Span',
      UL: 'Unordered List',
      LI: 'List Item',
      IMG: 'Image',
      STRONG: 'Strong Text',
      EM: 'Emphasised Text',
      I: 'Icon',
      A: 'Link',
      INPUT: 'Input',
      BLOCKQUOTE: 'Quote',
      FIGCAPTION: 'Caption'
    };
  }

  componentDidMount () {
    const panelElement = this.refs.panel;
    let clickTargetElement = panelElement.parentElement;

    clickTargetElement.addEventListener('contextmenu', ::this.openPanel, false);
    clickTargetElement.addEventListener('click', ::this.closePanel, false);
  }

  componentDidUpdate () {
    const panelElement = this.refs.panel;

    console.log(panelElement.offsetHeight);
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
    const panelElement = this.refs.panel;
    const target = e.target;
    const targetName = this.HTMLTagNames[target.tagName];
    const browserSize = ABuilder.getBrowserSize();
    const elementOffset = ABuilder.getOffset(panelElement);
    const { left, top } = elementOffset;
    let { width, height } = browserSize;

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

  removeElement (e) {
    let targetElement = this.state.target;

    targetElement.remove();

    this.closePanel(e);
  }

  listChangeImage (type) {
    let text = '';

    if (type === 0) {
      text = 'Change Image';
    }

    return (
      <div
        className='ab-crightpanel__item'>
        onClick={(e) => {
          this.changeImage(0)
        }}>
        <span>{text}</span>
      </div>
    )
  }

  listLinkChange () {
    return (
      <div 
        className='ab-crightpanel__item'>
        <span>Change Link</span>
      </div>
    )
  }

  listIconChange () {
    return (
      <div 
        className='ab-crightpanel__item'>
        <span>Change Icon</span>
      </div>
    )
  }

  listItemRemove () {
    return (
      <div 
        className='ab-crightpanel__item'
        onClick={::this.removeElement}>
        <span>Remove</span>
      </div>
    )
  }

  renderChildren () {
    const targetElement = this.state.target;
    let elementOptions = {
      showIconChange: false,
      showLinkChange: false,
      showChangeImage: false,
      showRemove: false
    };

    if (targetElement !== null) {
      const isNotChangeble = targetElement.getAttribute('data-abccorent');
      const isChangeble = isNotChangeble ? false : true;
      const tagName = targetElement.tagName;

      if (isChangeble) {
        elementOptions.showRemove = true;

        if (tagName === 'IMG') {
          elementOptions.showChangeImage = true;
        }

        if (tagName === 'A') {
          elementOptions.showLinkChange = true;
        }

        if (tagName === 'I') {
          elementOptions.showIconChange = true;
        }
      }
    }

    return (
      <div>
        {elementOptions.showLinkChange ? this.listLinkChange() : null}
        {elementOptions.showIconChange ? this.listIconChange() : null}
        {elementOptions.showRemove ? this.listItemRemove() : null}
      </div>
    )
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
        id='ab-cpanel'
        data-abcpanel={true}
        style={panelStyle}
        className={planelClassName}>
        <div className='ab-crightpanel__text'>
          {this.state.targetName}
        </div>
        {this.renderChildren()}
      </div>
    )
  }
}

export default ClickToolbox;