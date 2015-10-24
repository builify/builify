import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findUpAttr, findUpClassName, getBrowserSize } from '../../Common/Common';
import { openContextmenuToolbox, closeContextmenuToolbox } from '../../Actions/ActionCreators';
import _ from 'lodash';
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

    this._browserSize = getBrowserSize();

    window.addEventListener('resize', () => {
      this._browserSize = getBrowserSize();
    });

    this._panelXPadding = 15;
  }

  componentDidMount () {
    const panelElement = this.refs.panel;
    let clickTargetElement = panelElement.parentElement;

    clickTargetElement.addEventListener('contextmenu', ::this.openPanel, false);
    clickTargetElement.addEventListener('click', ::this.closePanel, false);
  }

  componentDidUpdate () {
    const panelElement = this.refs.panel;
    const panelElementHeight = panelElement.offsetHeight;
    const { y } = this.state.panelCoordinates;

    if ((y + panelElementHeight) >= (this._browserSize.height - this._panelXPadding)) {
      const dif = (y + panelElementHeight) - (this._browserSize.height - this._panelXPadding);

      panelElement.style.top = (y - +dif) + 'px';
    }
  }

  openPanel (e) {
    if (e.shiftKey) {
      return;
    }

    e.preventDefault();

    let eventPosition = {
      x: e.clientX,
      y: e.clientY
    };
    const panelElement = this.refs.panel;
    let target = e.target;
    let isElemenetChangeable = true;
    let isBackgroundImageHolder = false;
    const findUp = findUpAttr(target, 'data-abctoolbox data-abcpanel');

    if (findUp !== null) {
      this.closePanel();
      return false;
    }

    // If original block element
    if (target.getAttribute('data-abccorent')) {
      // Check if there is background-image holder
      const { children } = target;

      for (let i = 0; i < children.length; i++) {
        let currentChild = children[i];

        if (currentChild.classList.contains('background-image-holder')) {
          target = currentChild;
          target.setAttribute('data-abcnotremoveable', true);
          isBackgroundImageHolder= true;
          break;
        }
      }
    }

    const targetName = this.HTMLTagNames[target.tagName];

    if (targetName === undefined) {
      this.closePanel();
      return false;
    }

    const { onOpenContextMenu } = this.props;
    onOpenContextMenu();

    const panelWidth = 170;
    const xOfrightPanelEdge = eventPosition.x + panelWidth + 275;

    if (+xOfrightPanelEdge >= (this._browserSize.width - this._panelXPadding)) {
      // Multiply panelXPadding by 2 because iframe gives scrollbar.
      const dif = +xOfrightPanelEdge - (this._browserSize.width - (this._panelXPadding * 2));

      eventPosition.x = eventPosition.x - dif;
    }

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
    const { panelOpen } = this.state;

    if (panelOpen) {
      const { onCloseContextMenu } = this.props;
      this.setState({
        panelOpen: false
      });

      return onCloseContextMenu();
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
  }

  listImageChange () {
    return (
      <div
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

function mapStateToProps (state) {
  return {
    canvas: state.canvas
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onOpenContextMenu: () => {
      dispatch(openContextmenuToolbox());
    },

    onCloseContextMenu: () => {
      dispatch(closeContextmenuToolbox());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClickToolbox);
