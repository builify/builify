import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { findUpAttr, findUpClassName, getBrowserSize } from '../../Common/Common';
import { openContextmenuToolbox, closeContextmenuToolbox } from '../../Actions/ActionCreators';
import _ from 'lodash';
import cx from 'classnames';
import Events from '../../Common/Events';
import SvgIcon from './SvgIcon';

class ClickToolBoxItem extends Component {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    icon: null,
    text: '',
    onClick: () => {}
  }

  render () {
    const { icon, onClick, text } = this.props;

    return (
      <div
        className='ab-crightpanel__item'
        onClick={onClick}>
        {(() => {
          if (icon !== null) {
            return <SvgIcon icon={icon} />
          }
        })()}
        <span>{text}</span>
      </div>
    )
  }
}

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

  checkIfBackgroundImageHolderIsNear (target) {
    if (target.getAttribute('data-abccorent')) {
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

    return target;
  }

  getHTMLTagName (target) {
    return this.HTMLTagNames[target.tagName];
  }

  openPanel (e) {
    const { onOpenContextMenu } = this.props;

    if (e.shiftKey) {
      return;
    }

    Events.pauseEvent(e);

    let eventPosition = {
      x: e.clientX,
      y: e.clientY
    };
    const panelElement = this.refs.panel;
    let target = e.target;
    let isElemenetChangeable = true;
    const findUp = findUpAttr(target, 'data-abctoolbox data-abcpanel');

    if (findUp !== null ||
      target.getAttribute('data-abctoolbox') ||
      target.getAttribute('data-abcpanel')) {
      this.closePanel();
      return false;
    }

    target = this.checkIfBackgroundImageHolderIsNear(target);
    const targetName = this.getHTMLTagName(target);

    if (targetName === undefined) {
      this.closePanel();
      return false;
    }

    onOpenContextMenu();

    const panelWidth = 170;
    const xOfrightPanelEdge = eventPosition.x + panelWidth + 275;

    if (+xOfrightPanelEdge >= (this._browserSize.width - this._panelXPadding)) {
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

    Events.pauseEvent(e);
  }

  listImageChange () {
    return (
      <ClickToolBoxItem
        icon='image'
        text='Edit Image' />
    )
  }

  listLinkChange () {
    return (
      <ClickToolBoxItem
        icon='link'
        text='Change Link'
        onClick={::this.openLinkEditModal} />
    )
  }

  listIconChange () {
    return (
      <ClickToolBoxItem
        icon='star'
        text='Change Icon' />
    )
  }

  listItemRemove () {
    return (
      <ClickToolBoxItem
        icon='clear'
        text='Remove'
        onClick={::this.removeElement} />
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
    const planelClassName = cx('ab-crightpanel', this.state.panelOpen ? 'show' : '');
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
