import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeContentBlock, openContentblockSourceEditModal } from '../../Actions/ActionCreators';
import cx from 'classnames';
import SvgIcon from './SvgIcon';
import Dropdown from './Dropdown';
import Switch from './Switch';

class SectionToolBox extends Component {
  render () {
    const { canvas, onRemove, onOpenContentblockSourceEditModal } = this.props;
    const { currentHoverBlock, isContentBlockSettingsMenuOpened } = canvas;
    const { element, topX } = currentHoverBlock;
    const className = cx('ab-cstoolbox');
    const dropdownClassname = cx('dropdown', isContentBlockSettingsMenuOpened ? 'active' : null);
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };
    const toolBoxStyle = {
      top: topX
    };

    return (
      <div
        data-abctoolbox
        className={className}
        style={toolBoxStyle}>
        <ul className='settings'>
          <li
            title='Edit Source'>
            <SvgIcon
              onClick={(e) => {
                return onOpenContentblockSourceEditModal(currentHoverBlock);
              }}
              icon='pencil'
              size={iconSize}
              style={iconStyle } />
          </li>
          <li
            title='Remove Block'>
            <SvgIcon
              onClick={(e) => {
                return onRemove(element);
              }}
              icon='remove'
              size={iconSize}
              style={iconStyle } />
          </li>
        </ul>
        <ul className={dropdownClassname}>
          <li className='title'>
            <span>Section Controls</span>
          </li>
          <li>
            <Switch
              label='Display on mobile' />
          </li>
        </ul>
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
    onRemove: (id) => {
      dispatch(removeContentBlock(id));
    },

    onOpenContentblockSourceEditModal: (currentHoverBlock) => {
      dispatch(openContentblockSourceEditModal(currentHoverBlock.element));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionToolBox);
