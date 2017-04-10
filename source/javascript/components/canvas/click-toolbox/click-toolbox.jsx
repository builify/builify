import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isNull as _isNull,
  isEmpty as _isEmpty
} from 'lodash';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import TTDOM from '../../../common/TTDOM';
import ClickToolBoxItem from './item';
import Helpers from './helpers';
import HTMLTagNamesToString from './html-tagnames';
import * as Actions from '../../../actions';

function getHTMLTagName (target) {
  const targetName = target.tagName.toLowerCase();
  return `${HTMLTagNamesToString[targetName]}`;
}

class ClickToolbox extends React.Component {
  static propTypes = {
    openContextMenu: PropTypes.func.isRequired,
    closeContextMenu: PropTypes.func.isRequired,
    openIconEditModal: PropTypes.func.isRequired,
    openImageEditModal: PropTypes.func.isRequired,
    openBlockEditorTab: PropTypes.func.isRequired,
    cloneItem: PropTypes.func.isRequired
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

  componentDidMount () {
    const panelElement = this._panelElement;
    const clickTargetElement = panelElement.parentElement;

    TTDOM.events.add(window, 'resize', () => {
      this._browserSize = TTDOM.browser.size();
    });

    if (clickTargetElement) {
      TTDOM.events.add(clickTargetElement, 'contextmenu click', (e) => {
        const { type } = e;

        if (type === 'contextmenu') {
          this.openPanel(e);
        } else if (type === 'click') {
          this.closePanel(e);
        }
      });
    }
  }

  componentDidUpdate () {
    const panelElement = this._panelElement;
    const panelElementHeight = panelElement.offsetHeight;
    const { y } = this.state.panelCoordinates;

    if ((y + panelElementHeight) > (this._browserSize.height - this._panelXPadding - 50)) {
      const dif = Math.abs((y + panelElementHeight) - (this._browserSize.height - this._panelXPadding - 50));

      panelElement.style.top = `${y - dif}px`;
    }
  }
  _panelElement = null;
  _panelXPadding = 15;
  _browserSize = TTDOM.browser.size();

  openPanel (e) {
    if (e.shiftKey) {
      return false;
    }

    e.stopPropagation();
    e.preventDefault();

    const eventPosition = {
      x: e.clientX,
      y: e.clientY
    };
    let target = e.target;
    const isElemenetChangeable = true;
    const findUp = TTDOM.find.findUpAttr(target, 'data-abctoolbox data-abcpanel');

    if (findUp !== null || target.getAttribute('data-abctoolbox') || target.getAttribute('data-abcpanel')) {
      this.closePanel();
      return false;
    }

    target = Helpers.checkIfBackgroundImageHolderIsNear(target);
    const targetName = getHTMLTagName(target);

    if (targetName === undefined) {
      this.closePanel();
      return false;
    }

    this.props.openContextMenu();

    const panelWidth = 170;
    const xOfrightPanelEdge = eventPosition.x + panelWidth + 275;

    if (+xOfrightPanelEdge >= (this._browserSize.width - this._panelXPadding)) {
      const dif = +xOfrightPanelEdge - (this._browserSize.width - (this._panelXPadding * 2));

      eventPosition.x -= dif;
    }

    this.setState({
      panelOpen: true,
      panelCoordinates: {
        x: eventPosition.x,
        y: eventPosition.y
      },
      target,
      targetName,
      isElemenetChangeable
    });

    return this;
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
    const label = localization('expand column');
    const clickEvent = () => {
        // Why is it reversed?
      return Helpers.replaceGridClassnames(this.state.target);
    };

    return <ClickToolBoxItem text={label} icon="format-indent-increase" onClick={clickEvent} />;
  }

  listShrinkColumn () {
    const label = localization('shrink column');
    const clickEvent = () => {
      // Why is it reversed?
      return Helpers.replaceGridClassnames(this.state.target, true);
    };

    return <ClickToolBoxItem text={label} icon="format-indent-decrease" onClick={clickEvent} />;
  }

  listImageChange () {
    const label = localization('edit image');
    const clickEvent = () => {
      return this.props.openImageEditModal(this.state.target);
    };

    return <ClickToolBoxItem icon="image" text={label} onClick={clickEvent} />;
  }

  listClone () {
    const label = localization('clone');
    const clickEvent = () => {
      Helpers.cloneItem(this.state.target);
      return this.props.cloneItem();
    };

    return <ClickToolBoxItem icon="control-point-duplicate" text={label} onClick={clickEvent} />;
  }

  listIconChange () {
    const label = localization('change icon');
    const clickEvent = () => {
      return this.props.openIconEditModal(this.state.target);
    };

    return <ClickToolBoxItem icon="star" text={label} onClick={clickEvent} />;
  }

  listItemRemove () {
    const label = localization('remove');
    const clickEvent = () => {
      TTDOM.element.remove(this.state.target);
      return this.closePanel();
    };

    return <ClickToolBoxItem icon="clear" text={label} onClick={clickEvent} />;
  }

  listItemOpenEditor () {
    const label = localization('open editor');
    const clickEvent = () => {
      return this.props.openBlockEditorTab(this.state.target);
    };

    return <ClickToolBoxItem icon="mode-edit" text={label} onClick={clickEvent} />;
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

    if (!_isNull(targetElement)) {
      const isNotChangeble = targetElement.getAttribute('data-abccorent');
      const isChangeble = isNotChangeble || true;
      const tagName = targetElement.tagName.toLowerCase();

      if (isChangeble) {
        if (!targetElement.getAttribute('data-abcnotremoveable')) {
          elementOptions.showRemove = true;
        }

        if (tagName === 'img') {
          elementOptions.showChangeImage = true;
        } else if (tagName === 'div') {
          const backgroundImage = targetElement.style.backgroundImage;

          if (!_isEmpty(backgroundImage)) {
            elementOptions.showChangeImage = true;
          }
        }

        if (targetElement.classList.contains('icon') ||
            targetElement.classList.contains('fa')) {
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
        { this.listItemOpenEditor() }
        { elementOptions.showRemove && this.listItemRemove() }
      </div>
    );
  }

  render () {
    const { panelOpen, panelCoordinates, targetName } = this.state;
    const planelClassName = classNames('crightpanel', {
      show: panelOpen
    });
    const panelStyle = {
      top: panelCoordinates.y,
      left: panelCoordinates.x
    };

    return (
      <div
        id={'ab-cpanel'}
        data-abcpanel
        ref={(node) => { this._panelElement = node; }}
        style={panelStyle}
        className={planelClassName}>
        <div className={classNames('crightpanel__text')}>
          <span>{ targetName }</span>
        </div>
        { this.renderChildren() }
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openContextMenu: () => {
      dispatch(Actions.openContextmenuToolbox());
    },

    closeContextMenu: () => {
      dispatch(Actions.closeContextmenuToolbox());
    },

    openIconEditModal: (target) => {
      dispatch(Actions.openIconEditModal(target));
    },

    openImageEditModal: (target) => {
      dispatch(Actions.openImageEditModal(target));
    },

    openBlockEditorTab: (target) => {
      dispatch(Actions.openBlockEditorTab(target));
    },

    cloneItem: () => {
      dispatch(Actions.cloneItem());
    }
  };
}

export default connect(null, mapDispatchToProps)(ClickToolbox);
