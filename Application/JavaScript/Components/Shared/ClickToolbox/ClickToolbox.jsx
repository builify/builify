import React from 'react';
import { connect } from 'react-redux';
import TTDOM from '../../../Common/TTDOM';
import { findUpAttr } from '../../../Common/Common';
import * as Actions from '../../../Actions';
import classNames from 'classnames';
import Events from '../../../Common/Events';
import ClickToolBoxItem from './Item';
import Helpers from './Helpers';
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
  _browserSize = TTDOM.browser.size();

  componentDidMount () {
    const panelElement = this.refs.panel;
    const clickTargetElement = panelElement.parentElement;

    TTDOM.events.add(window, 'resize', () => {
      this._browserSize = TTDOM.browser.size();
    });

    TTDOM.events.add(clickTargetElement, 'contextmenu click', (e) => {
      const { type } = e;

      if (type === 'contextmenu') {
        this.openPanel(e);
      } else if (type === 'click') {
        this.closePanel(e);
      }
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
    let target = e.target;
    let isElemenetChangeable = true;
    const findUp = findUpAttr(target, 'data-abctoolbox data-abcpanel');

    if (findUp !== null ||
      target.getAttribute('data-abctoolbox') ||
      target.getAttribute('data-abcpanel')) {
      this.closePanel();
      return false;
    }

    target = Helpers.checkIfBackgroundImageHolderIsNear(target);
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

  closePanel () {
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

  _cloneItem (e) {
    const { onCloneItem } = this.props;
    const { target } = this.state;

    Events.pauseEvent(e);

    Helpers.cloneItem(target);

    return onCloneItem();
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

  _expandColumn (e) {
    const { target } = this.state;

    Events.pauseEvent(e);

    // Why is it reversed?
    Helpers.replaceGridClassnames(target);
  }

  _shrinkColumn (e) {
    const { target } = this.state;

    Events.pauseEvent(e);

    // Why is it reversed?
    Helpers.replaceGridClassnames(target, true);
  }

  listExpandColumn () {
    return (
      <ClickToolBoxItem
        text='Expand Column'
        icon='format-indent-increase'
        onClick={::this._expandColumn} />
    );
  }

  listShrinkColumn () {
    return (
      <ClickToolBoxItem
        text='Shrink Column'
        icon='format-indent-decrease'
        onClick={::this._shrinkColumn} />
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

  listClone () {
    return (
      <ClickToolBoxItem
        icon='control-point-duplicate'
        text='Clone'
        onClick={::this._cloneItem} />
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
      showClone: true,
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

        if (tagName === 'I' || targetElement.classList.contains('icon')) {
          elementOptions.showIconChange = true;
        }

        elementOptions = Helpers.hasGridClassnames(targetElement, elementOptions);
      }

      if (targetElement.classList.contains('background-image-holder')) {
        elementOptions.showChangeBackgroundImage = true;
      }
    }

    return (
      <div>
        { (elementOptions.showChangeImage ||
          elementOptions.showChangeBackgroundImage )?
          this.listImageChange() : null }
        { elementOptions.showIconChange ? this.listIconChange() : null}
        { elementOptions.showLinkChange ? this.listLinkChange() : null }
        { elementOptions.showClone ? this.listClone() : null }
        { elementOptions.showExpandColumn ? this.listExpandColumn() : null }
        { elementOptions.showShrinkColumn ? this.listShrinkColumn() : null }
        { elementOptions.showRemove ? this.listItemRemove() : null }
      </div>
    );
  }

  render () {
    const { panelOpen, panelCoordinates, targetName } = this.state;
    const planelClassName = classNames('ab-crightpanel', panelOpen ? 'show' : '');
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

function mapDispatchToProps (dispatch) {
  return {
    onOpenContextMenu: () => {
      dispatch(Actions.openContextmenuToolbox());
    },

    onCloseContextMenu: () => {
      dispatch(Actions.closeContextmenuToolbox());
    },

    onOpenLinkEditModal: (target) => {
      dispatch(Actions.openLinkEditModal(target));
    },

    onOpenIconEditModal: (target) => {
      dispatch(Actions.openIconEditModal(target));
    },

    onOpenImageEditModal: (target) => {
      dispatch(Actions.openImageEditModal(target));
    },

    onCloneItem: () => {
      dispatch(Actions.cloneItem());
    }
  };
}

export default connect(null, mapDispatchToProps)(ClickToolbox);
