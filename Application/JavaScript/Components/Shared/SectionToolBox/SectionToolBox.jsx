import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../Common/Random';
import ToolboxItem from './ToolboxItem';
import * as Actions from '../../../Actions';

class SectionToolBox extends React.Component {
  toolboxItemColorChange = null;

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
        let title = null;
        let icon = null;
        let clickFunction = () => {};

        if (featureValue === true) {
          if (feature === 'colorBackground') {
            title = 'Change Background Color';
            icon = 'format-paint';
            clickFunction = ::this.changeBackgroundColor;
          } else if (feature === 'videoBackground') {
            title = 'Change Background Video';
            icon = 'video-collection';
            clickFunction = ::this.changeBackgroundVideo;
          } else if (feature === 'imageBackground') {
            title = 'Change Background Image';
            icon = 'photo';
            clickFunction = ::this.changeBackgroundImage;
          } else if (feature === 'countdown') {
            title = 'Change Countdown';
            icon = 'exposure-plus-1';
            clickFunction = ::this.changeCountdown;
          }
        }

        if (title !== null) {
          return (
            <ToolboxItem
              key={feature}
              ref={(ref) => {
                if (feature === 'colorBackground') {
                  this.toolboxItemColorChange = ref;
                }
              }}
              title={title}
              icon={icon}
              onClick={clickFunction} />
          );
        } else {
          return null;
        }
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
    const { elementReference } = block;
    const sourceElement = ReactDOM.findDOMNode(this.toolboxItemColorChange);

    return this.props.openColorPicker(elementReference, sourceElement);
  }

  changeBackgroundVideo () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { block } = currentHoverBlock;
    const { elementReference } = block;

    return this.props.openVideoEditModal(elementReference);
  }

  changeCountdown () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { block } = currentHoverBlock;
    const { elementReference } = block;

    return this.props.openCountdownEditModal(elementReference);
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

    openVideoEditModal: (target) => {
      dispatch(Actions.openVideoEditModal(target));
    },

    openCountdownEditModal: (target) => {
      dispatch(Actions.openCountdownEditModal(target));
    },

    openColorPicker: (target, sourceElement) => {
      dispatch(Actions.openColorPicker(target, sourceElement));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SectionToolBox);
