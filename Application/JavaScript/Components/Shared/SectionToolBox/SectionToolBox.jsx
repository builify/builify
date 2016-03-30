import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import Switch from '../Switch';
import { removeContentBlock, openContentblockSourceEditModal } from '../../../Actions';

class ToolboxItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    onClick: React.PropTypes.func,
    icon: React.PropTypes.string
  };

  static defaultProps = {
    title: '',
    onClick: () => {}
  };

  render () {
    const { onClick, title } = this.props;
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };
    var icon = null;

    if (this.props.icon) {
      icon = (
        <Icon
          icon={this.props.icon}
          size={iconSize}
          style={iconStyle} />
      );
    }

    return (
      <li
        onClick={onClick}
        title={title}>
        { icon }
      </li>
    );
  }
}
class SectionToolBox extends React.Component {
  state = {
    settingsMenuOpened: false
  };

  render () {
    const { canvas, onRemove } = this.props;
    const { currentHoverBlock } = canvas;
    const { block, topX } = currentHoverBlock;
    const { features } = block;
    const className = classNames('ab-cstoolbox');
    const toolBoxStyle = {
      top: topX
    };
    let featureItems = null;

    if (_.values(block).length === 0 || !_.has(block, 'elementReference')) {
      return null;
    }

    if (features) {
      featureItems = _.map(features, (featureValue, feature) => {
        if (featureValue === true) {
          if (feature === 'colorBackground') {
            return (
              <ToolboxItem
                title='Change Background Color'
                icon='format-paint' />
            );
          } else if (feature === 'videoBackground') {
            return (
              <ToolboxItem
                title='Change Background Video'
                icon='video-collection' />
            );
          } else if (feature === 'imageBackground') {
            return (
              <ToolboxItem
                title='Change Background Image'
                icon='photo' />
            );
          } else if (feature === 'countdown') {
            return (
              <ToolboxItem
                title='Change Countdown'
                icon='exposure-plus-1' />
            );
          }
        }

        return null;
      });
    }

    return (
      <div
        data-abctoolbox
        className={className}
        style={toolBoxStyle}>
        <ul className='settings'>
          { featureItems }
          <ToolboxItem
            title='Settings'
            icon='settings' />
          <ToolboxItem
           title='Remove Block'
           icon='remove' />
        </ul>
      </div>
    );
  }
}

/*<ul className={dropdownClassname}>
  <li className='title'>
    <span>Section Controls</span>
  </li>
  <li>
    <Switch
      label='Display on mobile' />
  </li>
</ul>*/

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
