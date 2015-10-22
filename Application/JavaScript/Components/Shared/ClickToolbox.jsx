import React, { Component } from 'react';
import { store } from '../Application.jsx';
import { findUpAttr } from '../../Common/Common';
import * as Actions from '../../Actions/ActionCreators';
import classNames from 'classnames';
import SvgIcon from './SvgIcon.jsx';

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
    let target = e.target;
    let isElemenetChangeable = true;
    const findUp = findUpAttr(target, 'data-abctoolbox data-abcpanel');

    if (findUp !== null) {
      return false;
    }

    store.dispatch(Actions.openContextmenuToolbox());

    // If original block element
    if (target.getAttribute('data-abccorent')) {
      // Check if there is background-image holder
      const { children } = target;

      for (let i = 0; i < children.length; i++) {
        let currentChild = children[i];

        if (currentChild.classList.contains('background-image-holder')) {
          target = currentChild;
          target.setAttribute('data-abcnotremoveable', true);
          break;
        }
      }
    }

    const targetName = this.HTMLTagNames[target.tagName];

    this.setState({
      panelOpen: true,
      panelCoordinates: {
        x: eventPosition.x,
        y: eventPosition.y
      },
      target: target,
      targetName: targetName,
      isElemenetChangeable: isElemenetChangeable
    });
  }

  closePanel (e) {
    if (this.state.panelOpen) {
      store.dispatch(Actions.closeContextmenuToolbox());

      this.setState({
        panelOpen: false
      });
    } else {
      return;
    }
  }

  removeElement (e) {
    let targetElement = this.state.target;

    targetElement.remove();

    this.closePanel(e);
  }

  openLinkEditModal (e) {
    const { target } = this.state;

    e.preventDefault();

    store.dispatch(Actions.openLinkEditModal(target));
  }

  listImageChange () {
    return (
      <div
        onClick={(e) => {
          return store.dispatch(openImageEditModal());
        }}
        className='ab-crightpanel__item'>
        <SvgIcon icon='image' />
        <span data-abcpanel={true}>Edit Image</span>
      </div>
    )
  }

  listLinkChange () {
    return (
      <div
        onClick={::this.openLinkEditModal}
        className='ab-crightpanel__item'>
        <SvgIcon icon='link' />
        <span data-abcpanel={true}>Change Link</span>
      </div>
    )
  }

  listIconChange () {
    return (
      <div
        className='ab-crightpanel__item'>
        <SvgIcon icon='star' />
        <span data-abcpanel={true}>Change Icon</span>
      </div>
    )
  }

  listItemRemove () {
    return (
      <div
        className='ab-crightpanel__item'
        onClick={::this.removeElement}>
        <SvgIcon icon='clear' />
        <span data-abcpanel={true}>Remove</span>
      </div>
    )
  }

  renderChildren () {
    const targetElement = this.state.target;
    let elementOptions = {
      showIconChange: false,
      showLinkChange: false,
      showChangeImage: false,
      showChangeBackgroundImage: false,
      showRemove: false
    };

    if (targetElement !== null) {
      const isNotChangeble = targetElement.getAttribute('data-abccorent');
      const isChangeble = isNotChangeble ? false : true;
      const tagName = targetElement.tagName;

      if (isChangeble) {
        if (!targetElement.getAttribute('data-abcnotremoveable')) {
          elementOptions.showRemove = true;
        }

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

      if (targetElement.classList.contains('background-image-holder')) {
        elementOptions.showChangeBackgroundImage = true;
      }
    }

    return (
      <div>
        {elementOptions.showChangeImage || elementOptions.showChangeBackgroundImage ? this.listImageChange() : null}
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
        data-abcpanel
        style={panelStyle}
        className={planelClassName}>
        <div
          className='ab-crightpanel__text'>
          {this.state.targetName}
        </div>
        {this.renderChildren()}
      </div>
    )
  }
}

export default ClickToolbox;
