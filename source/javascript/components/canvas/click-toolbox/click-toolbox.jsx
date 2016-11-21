import React from 'react';
import classNames from 'classnames';
import TTDOM from '../../../common/TTDOM';
import ClickToolBoxItem from './item';
import Helpers from './helpers';
import HTMLTagNamesToString from './html-tagnames';

export default class ClickToolbox extends React.Component {
  static propTypes = {
    openContextMenu: React.PropTypes.func.isRequired,
    closeContextMenu: React.PropTypes.func.isRequired,
    openIconEditModal: React.PropTypes.func.isRequired,
    openImageEditModal: React.PropTypes.func.isRequired,
    cloneItem: React.PropTypes.func.isRequired
  };

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

    if ((y + panelElementHeight) > (this._browserSize.height - this._panelXPadding - 50)) {
      const dif = Math.abs((y + panelElementHeight) - (this._browserSize.height - this._panelXPadding - 50));

      panelElement.style.top = `${y - dif}px`;
    }
  }

  getHTMLTagName (target) {
    const targetName = target.tagName.toLowerCase();
    return `${HTMLTagNamesToString[targetName]} (${targetName.toUpperCase()})`;
  }

  openPanel (e) {
    if (e.shiftKey) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    let eventPosition = {
      x: e.clientX,
      y: e.clientY
    };
    let target = e.target;
    let isElemenetChangeable = true;
    const findUp = TTDOM.find.findUpAttr(target, 'data-abctoolbox data-abcpanel');

    if (findUp !== null || target.getAttribute('data-abctoolbox') || target.getAttribute('data-abcpanel')) {
      this.closePanel();
      return false;
    }

    target = Helpers.checkIfBackgroundImageHolderIsNear(target);
    const targetName = this.getHTMLTagName(target);

    if (targetName === undefined) {
      this.closePanel();
      return false;
    }

    this.props.openContextMenu();

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
    if (this.state.panelOpen) {
      this.setState({
        panelOpen: false
      });

      return this.props.closeContextMenu();
    }

    return false;
  }

  listExpandColumn () {
    const clickEvent = () => {
        // Why is it reversed?
      return Helpers.replaceGridClassnames(this.state.target);
    };

    return <ClickToolBoxItem text='Expand Column' icon='format-indent-increase' onClick={clickEvent} />;
  }

  listShrinkColumn () {
    const clickEvent = () => {
      // Why is it reversed?
      return Helpers.replaceGridClassnames(this.state.target, true);
    };

    return <ClickToolBoxItem text='Shrink Column' icon='format-indent-decrease' onClick={clickEvent} />;
  }

  listImageChange () {
    const clickEvent = () => {
      return this.props.openImageEditModal(this.state.target);
    };

    return <ClickToolBoxItem icon='image'  text='Edit Image' onClick={clickEvent} />;
  }

  listClone () {
    const clickEvent = () => {
      Helpers.cloneItem(this.state.target);
      return this.props.cloneItem();
    };

    return <ClickToolBoxItem icon='control-point-duplicate' text='Clone' onClick={clickEvent} />;
  }

  listIconChange () {
    const clickEvent = () => {
      return this.props.openIconEditModal(this.state.target);
    };

    return <ClickToolBoxItem icon='star' text='Change Icon' onClick={clickEvent} />;
  }

  listItemRemove () {
    const clickEvent = () => {
      TTDOM.element.remove(this.state.target);
      return this.closePanel();
    };

    return <ClickToolBoxItem icon='clear' text='Remove' onClick={clickEvent} />;
  }

  renderChildren () {
    const targetElement = this.state.target;
    let elementOptions = {
      showIconChange: false,
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
        { (elementOptions.showChangeImage || elementOptions.showChangeBackgroundImage) && this.listImageChange() }
        { elementOptions.showIconChange && this.listIconChange() }
        { elementOptions.showClone && this.listClone() }
        { elementOptions.showExpandColumn && this.listExpandColumn() }
        { elementOptions.showShrinkColumn && this.listShrinkColumn() }
        { elementOptions.showRemove && this.listItemRemove() }
      </div>
    );
  }

  render () {
    const { panelOpen, panelCoordinates, targetName } = this.state;
    const planelClassName = classNames('ab-crightpanel', {
      'show': panelOpen
    });
    const panelStyle = {
      top: panelCoordinates.y,
      left: panelCoordinates.x
    };

    return (
      <div data-abcpanel ref='panel' id='ab-cpanel' style={panelStyle} className={planelClassName}>
        <div className='ab-crightpanel__text'>
          <span>{ targetName }</span>
        </div>
        { this.renderChildren() }
      </div>
    );
  }
}
