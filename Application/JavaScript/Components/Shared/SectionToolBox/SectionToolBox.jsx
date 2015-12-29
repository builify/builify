import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import Switch from '../Switch';
import { removeContentBlock, openContentblockSourceEditModal } from '../../../Actions';

class SectionToolBox extends React.Component {
  state = {
    settingsMenuOpened: false
  }

  render () {
    const { settingsMenuOpened } = this.state;
    const { canvas, onRemove } = this.props;
    const { currentHoverBlock } = canvas;
    const { block, topX } = currentHoverBlock;
    const className = classNames('ab-cstoolbox');
    const dropdownClassname = classNames('dropdown', settingsMenuOpened ? 'active' : null);
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };
    const toolBoxStyle = {
      top: topX
    };

    if (_.values(block).length === 0 || !_.has(block, 'elementReference')) {
      return null;
    }

    return (
      <div
        data-abctoolbox
        className={className}
        style={toolBoxStyle}>
        <ul className='settings'>
          <li
            onClick={() => {
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
            onClick={() => {
              return onRemove(block);
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
    );
  }
}

function mapStateToProps (state) {
  return {
    canvas: state.canvas
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onRemove: (id) => {
      dispatch(removeContentBlock(id));
    },

    onOpenContentblockSourceEditModal: (currentHoverBlock) => {
      dispatch(openContentblockSourceEditModal(currentHoverBlock.element));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SectionToolBox);
