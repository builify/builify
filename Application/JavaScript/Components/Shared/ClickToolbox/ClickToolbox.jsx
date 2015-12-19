import React from 'react';
import { connect } from 'react-redux';
import TPDOM from '../../../Common/DOM';
import { findUpAttr, findUpClassName, getBrowserSize } from '../../../Common/Common';
import { openLinkEditModal, openImageEditModal, openIconEditModal, openContextmenuToolbox, closeContextmenuToolbox } from '../../../Actions';
import _ from 'lodash';
import ClassNames from 'classnames';
import Events from '../../../Common/Events';
import ClickToolBoxItem from './Item';
import { HTMLTagNamesToString } from './Config';

class ClickToolbox extends React.Component {
  state = {
    panelOpen: false,
    panelCoordinates: {
      x: 0,
      y: 0
    },
    target: null,
    targetName: ''
  };

  _panelXPadding = 15;
  _browserSize = getBrowserSize();

  componentDidMount () {
    const panelElement = this.refs.panel;
    const clickTargetElement = panelElement.parentElement;

    TPDOM.events.add(clickTargetElement, 'contextmenu click', (e) => {
      const { type } = e;

      if (type === 'contextmenu') {
        this.openPanel(e);
      } else if (type === 'click') {
        this.closePanel(e);
      }
    });

    TPDOM.events.add(window, 'resize', (e) => {
      this._browserSize = getBrowserSize();
    });
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
    return HTMLTagNamesToString[target.tagName];
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

  _openLinkEditModal (e) {
    const { onOpenLinkEditModal } = this.props;
    const { target } = this.state;

    Events.pauseEvent(e);

    return onOpenLinkEditModal(target);
  }

  _openIconEditModal (e) {
    const { onOpenIconEditModal } = this.props;
    const { target } = this.state;

    Events.pauseEvent(e);

    return onOpenIconEditModal(target);
  }

  _openImageEditModal (e) {
    const { onOpenImageEditModal } = this.props;
    const { target } = this.state;

    Events.pauseEvent(e);

    return onOpenImageEditModal(target);
  }

  listExpandColumn () {
    return (
      <ClickToolBoxItem
        text='Expand Column'
        icon='format-indent-increase' />
    );
  }

  listShrinkColumn () {
    return (
      <ClickToolBoxItem
        text='Shrink Column'
        icon='format-indent-decrease' />
    );
  }

  listImageChange () {
    return (
      <ClickToolBoxItem
        icon='image'
        text='Edit Image'
        onClick={::this._openImageEditModal} />
    );
  }

  listLinkChange () {
    return (
      <ClickToolBoxItem
        icon='link'
        text='Change Link'
        onClick={::this._openLinkEditModal} />
    );
  }

  listIconChange () {
    return (
      <ClickToolBoxItem
        icon='star'
        text='Change Icon'
        onClick={::this._openIconEditModal} />
    );
  }

  listItemRemove () {
    return (
      <ClickToolBoxItem
        icon='clear'
        text='Remove'
        onClick={::this.removeElement} />
    );
  }

  renderChildren () {
    const targetElement = this.state.target;
    let elementOptions = {
      showIconChange: false,
      showLinkChange: false,
      showChangeImage: false,
      showChangeBackgroundImage: false,
      showRemove: false,
      showExpandColumn: false,
      showShrinkColumn: false
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

        if (TPDOM.element.is(targetElement, 'div, p, span, figure, article, img')) {
          console.log(targetElement.className);
          if (targetElement.className.indexOf('col-xs') !== -1) {
            elementOptions.showExpandColumn = true;
            elementOptions.showShrinkColumn = true;
            console.log(targetElement)
          }
        }
      }

      if (targetElement.classList.contains('background-image-holder')) {
        elementOptions.showChangeBackgroundImage = true;
      }
    }

    return (
      <div>
        { elementOptions.showChangeImage || elementOptions.showChangeBackgroundImage ? this.listImageChange() : null }
        { elementOptions.showLinkChange ? this.listLinkChange() : null }
        { elementOptions.showIconChange ? this.listIconChange() : null}
        { elementOptions.showExpandColumn ? this.listExpandColumn() : null }
        { elementOptions.showShrinkColumn ? this.listShrinkColumn() : null }
        { elementOptions.showRemove ? this.listItemRemove() : null }
      </div>
    );
  }

  render () {
    const { panelOpen, panelCoordinates, targetName } = this.state;
    const planelClassName = ClassNames('ab-crightpanel', panelOpen ? 'show' : '');
    const panelStyle = {
      top: panelCoordinates.y,
      left: panelCoordinates.x
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
          <span>{targetName}</span>
        </div>
        { this.renderChildren() }
      </div>
    );
  }
}

/*function O(a) {
        var b = $("." + a);
        if ($(b).is("p , div, span, figure, article, img"))
            if ($(b).is('[class*="medium-"]') || $(b).parent().is('div [class*="medium-"]')) {
                if ($(b).parent().is('div [class*="medium-"]') && (b = $(b).parent()),
                !$(b).hasClass("medium-12")) {
                    if (b.hasClass("medium-11"))
                        return void b.removeClass("medium-11").addClass("medium-12");
                    if (b.hasClass("medium-10"))
                        return void b.removeClass("medium-10").addClass("medium-11");
                    if (b.hasClass("medium-9"))
                        return void b.removeClass("medium-9").addClass("medium-10");
                    if (b.hasClass("medium-8"))
                        return void b.removeClass("medium-8").addClass("medium-9");
                    if (b.hasClass("medium-7"))
                        return void b.removeClass("medium-7").addClass("medium-8");
                    if (b.hasClass("medium-6"))
                        return void b.removeClass("medium-6").addClass("medium-7");
                    if (b.hasClass("medium-5"))
                        return void b.removeClass("medium-5").addClass("medium-6");
                    if (b.hasClass("medium-4"))
                        return void b.removeClass("medium-4").addClass("medium-5");
                    if (b.hasClass("medium-3"))
                        return void b.removeClass("medium-3").addClass("medium-4");
                    if (b.hasClass("medium-2"))
                        return void b.removeClass("medium-2").addClass("medium-3");
                    if (b.hasClass("medium-1"))
                        return void b.removeClass("medium-1").addClass("medium-2")
                }
            } else if ($(b).is('[class*="col-xs-"]:not([class*="col-md-"])') || $(b).parent().is('div [class*="col-xs-"]:not([class*="col-md-"])')) {
                if ($(b).parent().is('div [class*="col-xs-"]:not([class*="col-md-"])') && (b = $(b).parent()),
                !$(b).hasClass("col-xs-12")) {
                    if (b.hasClass("col-xs-11"))
                        return void b.removeClass("col-xs-11").addClass("col-xs-12");
                    if (b.hasClass("col-xs-10"))
                        return void b.removeClass("col-xs-10").addClass("col-xs-11");
                    if (b.hasClass("col-xs-9"))
                        return void b.removeClass("col-xs-9").addClass("col-xs-10");
                    if (b.hasClass("col-xs-8"))
                        return void b.removeClass("col-xs-8").addClass("col-xs-9");
                    if (b.hasClass("col-xs-7"))
                        return void b.removeClass("col-xs-7").addClass("col-xs-8");
                    if (b.hasClass("col-xs-6"))
                        return void b.removeClass("col-xs-6").addClass("col-xs-7");
                    if (b.hasClass("col-xs-5"))
                        return void b.removeClass("col-xs-5").addClass("col-xs-6");
                    if (b.hasClass("col-xs-4"))
                        return void b.removeClass("col-xs-4").addClass("col-xs-5");
                    if (b.hasClass("col-xs-3"))
                        return void b.removeClass("col-xs-3").addClass("col-xs-4");
                    if (b.hasClass("col-xs-2"))
                        return void b.removeClass("col-xs-2").addClass("col-xs-3");
                    if (b.hasClass("col-xs-1"))
                        return void b.removeClass("col-xs-1").addClass("col-xs-2")
                }
            } else if ($(b).is('[class*="col-sm-"]:not([class*="col-md-"])') || $(b).parent().is('div [class*="col-sm-"]:not([class*="col-md-"])')) {
                if ($(b).parent().is('div [class*="col-sm-"]:not([class*="col-md-"])') && (b = $(b).parent()),
                !$(b).hasClass("col-sm-12")) {
                    if (b.hasClass("col-sm-11"))
                        return void b.removeClass("col-sm-11").addClass("col-sm-12");
                    if (b.hasClass("col-sm-10"))
                        return void b.removeClass("col-sm-10").addClass("col-sm-11");
                    if (b.hasClass("col-sm-9"))
                        return void b.removeClass("col-sm-9").addClass("col-sm-10");
                    if (b.hasClass("col-sm-8"))
                        return void b.removeClass("col-sm-8").addClass("col-sm-9");
                    if (b.hasClass("col-sm-7"))
                        return void b.removeClass("col-sm-7").addClass("col-sm-8");
                    if (b.hasClass("col-sm-6"))
                        return void b.removeClass("col-sm-6").addClass("col-sm-7");
                    if (b.hasClass("col-sm-5"))
                        return void b.removeClass("col-sm-5").addClass("col-sm-6");
                    if (b.hasClass("col-sm-4"))
                        return void b.removeClass("col-sm-4").addClass("col-sm-5");
                    if (b.hasClass("col-sm-3"))
                        return void b.removeClass("col-sm-3").addClass("col-sm-4");
                    if (b.hasClass("col-sm-2"))
                        return void b.removeClass("col-sm-2").addClass("col-sm-3");
                    if (b.hasClass("col-sm-1"))
                        return void b.removeClass("col-sm-1").addClass("col-sm-2")
                }
            } else if (($(b).is('[class*="col-md-"]') || $(b).parent().is('div [class*="col-md-"]')) && ($(b).parent().is('div [class*="col-md-"]') && (b = $(b).parent()),
            !$(b).hasClass("col-md-12"))) {
                if (b.hasClass("col-md-11"))
                    return void b.removeClass("col-md-11").addClass("col-md-12");
                if (b.hasClass("col-md-10"))
                    return void b.removeClass("col-md-10").addClass("col-md-11");
                if (b.hasClass("col-md-9"))
                    return void b.removeClass("col-md-9").addClass("col-md-10");
                if (b.hasClass("col-md-8"))
                    return void b.removeClass("col-md-8").addClass("col-md-9");
                if (b.hasClass("col-md-7"))
                    return void b.removeClass("col-md-7").addClass("col-md-8");
                if (b.hasClass("col-md-6"))
                    return void b.removeClass("col-md-6").addClass("col-md-7");
                if (b.hasClass("col-md-5"))
                    return void b.removeClass("col-md-5").addClass("col-md-6");
                if (b.hasClass("col-md-4"))
                    return void b.removeClass("col-md-4").addClass("col-md-5");
                if (b.hasClass("col-md-3"))
                    return void b.removeClass("col-md-3").addClass("col-md-4");
                if (b.hasClass("col-md-2"))
                    return void b.removeClass("col-md-2").addClass("col-md-3");
                if (b.hasClass("col-md-1"))
                    return void b.removeClass("col-md-1").addClass("col-md-2")
            }
        T()
    }
    function P(a) {
        var b = $("." + a);
        if ($(b).is("p , div, span, figure, article, img"))
            if ($(b).is('[class*="medium-"]') || $(b).parent().is('div [class*="medium-"]')) {
                if ($(b).parent().is('div [class*="medium-"]') && (b = $(b).parent()),
                !$(b).hasClass("medium-1")) {
                    if (b.hasClass("medium-12"))
                        return void b.removeClass("medium-12").addClass("medium-11");
                    if (b.hasClass("medium-11"))
                        return void b.removeClass("medium-11").addClass("medium-10");
                    if (b.hasClass("medium-10"))
                        return void b.removeClass("medium-10").addClass("medium-9");
                    if (b.hasClass("medium-9"))
                        return void b.removeClass("medium-9").addClass("medium-8");
                    if (b.hasClass("medium-8"))
                        return void b.removeClass("medium-8").addClass("medium-7");
                    if (b.hasClass("medium-7"))
                        return void b.removeClass("medium-7").addClass("medium-6");
                    if (b.hasClass("medium-6"))
                        return void b.removeClass("medium-6").addClass("medium-5");
                    if (b.hasClass("medium-5"))
                        return void b.removeClass("medium-5").addClass("medium-4");
                    if (b.hasClass("medium-4"))
                        return void b.removeClass("medium-4").addClass("medium-3");
                    if (b.hasClass("medium-3"))
                        return void b.removeClass("medium-3").addClass("medium-2");
                    if (b.hasClass("medium-2"))
                        return void b.removeClass("medium-2").addClass("medium-1")
                }
            } else if ($(b).is('[class*="col-xs-"]:not([class*="col-md-"])') || $(b).parent().is('div [class*="col-xs-"]:not([class*="col-md-"])')) {
                if ($(b).parent().is('div [class*="col-xs-"]:not([class*="col-md-"])') && (b = $(b).parent()),
                !$(b).hasClass("col-xs-1")) {
                    if (b.hasClass("col-xs-12"))
                        return void b.removeClass("col-xs-12").addClass("col-xs-11");
                    if (b.hasClass("col-xs-11"))
                        return void b.removeClass("col-xs-11").addClass("col-xs-10");
                    if (b.hasClass("col-xs-10"))
                        return void b.removeClass("col-xs-10").addClass("col-xs-9");
                    if (b.hasClass("col-xs-9"))
                        return void b.removeClass("col-xs-9").addClass("col-xs-8");
                    if (b.hasClass("col-xs-8"))
                        return void b.removeClass("col-xs-8").addClass("col-xs-7");
                    if (b.hasClass("col-xs-7"))
                        return void b.removeClass("col-xs-7").addClass("col-xs-6");
                    if (b.hasClass("col-xs-6"))
                        return void b.removeClass("col-xs-6").addClass("col-xs-5");
                    if (b.hasClass("col-xs-5"))
                        return void b.removeClass("col-xs-5").addClass("col-xs-4");
                    if (b.hasClass("col-xs-4"))
                        return void b.removeClass("col-xs-4").addClass("col-xs-3");
                    if (b.hasClass("col-xs-3"))
                        return void b.removeClass("col-xs-3").addClass("col-xs-2");
                    if (b.hasClass("col-xs-2"))
                        return void b.removeClass("col-xs-2").addClass("col-xs-1")
                }
            } else if ($(b).is('[class*="col-sm-"]:not([class*="col-md-"])') || $(b).parent().is('div [class*="col-sm-"]:not([class*="col-md-"])')) {
                if ($(b).parent().is('div [class*="col-sm-"]:not([class*="col-md-"])') && (b = $(b).parent()),
                !$(b).hasClass("col-sm-1")) {
                    if (b.hasClass("col-sm-12"))
                        return void b.removeClass("col-sm-12").addClass("col-sm-11");
                    if (b.hasClass("col-sm-11"))
                        return void b.removeClass("col-sm-11").addClass("col-sm-10");
                    if (b.hasClass("col-sm-10"))
                        return void b.removeClass("col-sm-10").addClass("col-sm-9");
                    if (b.hasClass("col-sm-9"))
                        return void b.removeClass("col-sm-9").addClass("col-sm-8");
                    if (b.hasClass("col-sm-8"))
                        return void b.removeClass("col-sm-8").addClass("col-sm-7");
                    if (b.hasClass("col-sm-7"))
                        return void b.removeClass("col-sm-7").addClass("col-sm-6");
                    if (b.hasClass("col-sm-6"))
                        return void b.removeClass("col-sm-6").addClass("col-sm-5");
                    if (b.hasClass("col-sm-5"))
                        return void b.removeClass("col-sm-5").addClass("col-sm-4");
                    if (b.hasClass("col-sm-4"))
                        return void b.removeClass("col-sm-4").addClass("col-sm-3");
                    if (b.hasClass("col-sm-3"))
                        return void b.removeClass("col-sm-3").addClass("col-sm-2");
                    if (b.hasClass("col-sm-2"))
                        return void b.removeClass("col-sm-2").addClass("col-sm-1")
                }
            } else if (($(b).is('[class*="col-md-"]') || $(b).parent().is('div [class*="col-md-"]')) && ($(b).parent().is('div [class*="col-md-"]') && (b = $(b).parent()),
            !$(b).hasClass("col-md-1"))) {
                if (b.hasClass("col-md-12"))
                    return void b.removeClass("col-md-12").addClass("col-md-11");
                if (b.hasClass("col-md-11"))
                    return void b.removeClass("col-md-11").addClass("col-md-10");
                if (b.hasClass("col-md-10"))
                    return void b.removeClass("col-md-10").addClass("col-md-9");
                if (b.hasClass("col-md-9"))
                    return void b.removeClass("col-md-9").addClass("col-md-8");
                if (b.hasClass("col-md-8"))
                    return void b.removeClass("col-md-8").addClass("col-md-7");
                if (b.hasClass("col-md-7"))
                    return void b.removeClass("col-md-7").addClass("col-md-6");
                if (b.hasClass("col-md-6"))
                    return void b.removeClass("col-md-6").addClass("col-md-5");
                if (b.hasClass("col-md-5"))
                    return void b.removeClass("col-md-5").addClass("col-md-4");
                if (b.hasClass("col-md-4"))
                    return void b.removeClass("col-md-4").addClass("col-md-3");
                if (b.hasClass("col-md-3"))
                    return void b.removeClass("col-md-3").addClass("col-md-2");
                if (b.hasClass("col-md-2"))
                    return void b.removeClass("col-md-2").addClass("col-md-1")
            }
        T()
    }*/

function mapDispatchToProps (dispatch) {
  return {
    onOpenContextMenu: () => {
      dispatch(openContextmenuToolbox());
    },

    onCloseContextMenu: () => {
      dispatch(closeContextmenuToolbox());
    },

    onOpenLinkEditModal: (target) => {
      dispatch(openLinkEditModal(target));
    },

    onOpenIconEditModal: (target) => {
      dispatch(openIconEditModal(target));
    },

    onOpenImageEditModal: (target) => {
      dispatch(openImageEditModal(target));
    }
  }
}

export default connect(null, mapDispatchToProps)(ClickToolbox);
