import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeContentBlock, openContentblockSourceEditModal } from '../../../Actions';
import cx from 'classnames';
import Icon from '../Icon';
import Dropdown from '../Dropdown';
import Switch from '../Switch';

class SectionToolBox extends Component {
  state = {
    settingsMenuOpened: false
  }

  render () {
    const { settingsMenuOpened } = this.state;
    const { canvas, onRemove, onOpenContentblockSourceEditModal } = this.props;
    const { currentHoverBlock } = canvas;
    const { element, topX } = currentHoverBlock;
    const className = cx('ab-cstoolbox');
    const dropdownClassname = cx('dropdown', settingsMenuOpened ? 'active' : null);
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
            onClick={(e) => {
              this.setState({
                settingsMenuOpened: !this.state.settingsMenuOpened
              });
            }}
            title='Settings'>
            <Icon
              icon='settings'
              size={iconSize}
              style={iconStyle } />
          </li>
          <li
            onClick={(e) => {
              return onRemove(element);
            }}
            title='Remove Block'>
            <Icon
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
