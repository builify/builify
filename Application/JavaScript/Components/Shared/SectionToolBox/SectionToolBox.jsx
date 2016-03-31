import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../Common/Random';
import ToolboxItem from './ToolboxItem';
import * as Actions from '../../../Actions';

class SectionToolBox extends React.Component {
  render () {
    const { canvas } = this.props;
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
                icon='format-paint'
                onClick={::this.changeBackgroundColor} />
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
                icon='photo'
                onClick={::this.changeBackgroundImage} />
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
            title='Remove Block'
            icon='remove'
            onClick={::this.removeBlock} />
        </ul>
      </div>
    );
  }

  changeBackgroundImage () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { block } = currentHoverBlock;
    const { elementReference } = block;

    return this.props.openImageEditModal(elementReference);
  }

  changeBackgroundColor () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { block } = currentHoverBlock;
    const { elementRefrence } = block;
    const backgroundColor = elementRefrence.querySelector('block-background-cover-color');

    console.log(backgroundColor);
  }

  removeBlock () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { block } = currentHoverBlock;

    return this.props.removeContentBlock(block);
  }
}

function mapStateToProps (state) {
  return {
    canvas: state.canvas
  };
}

function mapDispatchToProps (dispatch) {
  return {
    removeContentBlock: (block) => {
      dispatch(Actions.removeContentBlock(block));
    },

    openImageEditModal: (target) => {
      dispatch(Actions.openImageEditModal(target));
    },

    openColorPicker: (target) => {
      dispatch(Actions.openColorPicker(target));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SectionToolBox);
