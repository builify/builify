import React from 'react';
import ReactDOM from 'react-dom';
import _values from 'lodash/values';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _isNull from 'lodash/isnull';
import classNames from 'classnames';
import ToolboxItem from './item';
import { connect } from 'react-redux';
import * as Actions from '../../../actions';

class SectionToolBox extends React.Component {
  static propTypes = {
    currentHoverBlock: React.PropTypes.object.isRequired,
    openVideoEditModal: React.PropTypes.func.isRequired,
    openCountdownEditModal: React.PropTypes.func.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    openColorPicker: React.PropTypes.func.isRequired,
    openImageEditModal: React.PropTypes.func.isRequired
  };

  toolboxItemColorChange = null;

  render () {
    const { currentHoverBlock } = this.props;
    const { block, topX } = currentHoverBlock;
    const { features } = block;
    const className = classNames('ab-cstoolbox');
    const toolBoxStyle = {
      top: topX
    };
    let featureItems = null;

    if (_values(block).length === 0 || !_has(block, 'elementReference')) {
      return null;
    }

    if (features) {
      featureItems = _map(features, (featureValue, feature) => {
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

        if (_isNull(title)) {
          return null;
        }

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
      });
    }

    return (
      <div data-abctoolbox className={className} style={toolBoxStyle}>
        <ul className='settings'>
          { featureItems }
          <ToolboxItem title='Remove Block' icon='remove' onClick={::this.removeBlock} />
        </ul>
      </div>
    );
  }

  changeBackgroundImage () {
    const { currentHoverBlock } = this.props;
    const { elementReference } = currentHoverBlock;

    return this.props.openImageEditModal(elementReference);
  }

  changeBackgroundColor () {
    const { currentHoverBlock } = this.props;
    const { elementReference } = currentHoverBlock;
    const sourceElement = ReactDOM.findDOMNode(this.toolboxItemColorChange); // eslint-disable-line

    return this.props.openColorPicker(elementReference, sourceElement);
  }

  changeBackgroundVideo () {
    const { currentHoverBlock } = this.props;
    const { elementReference } = currentHoverBlock;

    return this.props.openVideoEditModal(elementReference);
  }

  changeCountdown () {
    const { currentHoverBlock } = this.props;
    const { elementReference } = currentHoverBlock;

    return this.props.openCountdownEditModal(elementReference);
  }

  removeBlock () {
    const { currentHoverBlock } = this.props;
    const { block } = currentHoverBlock;

    return this.props.removeContentBlock(block);
  }
}

function mapStateToProps (state) {
  const { canvas } = state;
  const { currentHoverBlock } = canvas;

  return {
    currentHoverBlock
  };
}

function mapDispatchToProps (dispatch) {
  return {
    removeContentBlock: function (block) {
      dispatch(Actions.removeContentBlock(block));
    },

    openImageEditModal: function (target) {
      dispatch(Actions.openImageEditModal(target));
    },

    openVideoEditModal: function (target) {
      dispatch(Actions.openVideoEditModal(target));
    },

    openCountdownEditModal: function (target){
      dispatch(Actions.openCountdownEditModal(target));
    },

    openColorPicker: function (target, sourceElement) {
      dispatch(Actions.openColorPicker(target, sourceElement));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionToolBox);
