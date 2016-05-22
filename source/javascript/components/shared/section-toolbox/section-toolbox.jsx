import React from 'react';
import ReactDOM from 'react-dom';
import _values from 'lodash/values';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _isNull from 'lodash/isnull';
import classNames from 'classnames';
import ToolboxItem from './item';
import { connect } from 'react-redux';

class SectionToolBox extends React.Component {
  static propTypes = {
    canvas: React.PropTypes.object.isRequired,
    openVideoEditModal: React.PropTypes.func.isRequired,
    openCountdownEditModal: React.PropTypes.func.isRequired,
    removeContentBlock: React.PropTypes.func.isRequired,
    openColorPicker: React.PropTypes.func.isRequired,
    openImageEditModal: React.PropTypes.func.isRequired
  };

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

        if (!_isNull(title)) {
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
        }

        return null;
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
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { elementReference } = currentHoverBlock;

    return this.props.openImageEditModal(elementReference);
  }

  changeBackgroundColor () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { elementReference } = currentHoverBlock;
    const sourceElement = ReactDOM.findDOMNode(this.toolboxItemColorChange);

    return this.props.openColorPicker(elementReference, sourceElement);
  }

  changeBackgroundVideo () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { elementReference } = currentHoverBlock;

    return this.props.openVideoEditModal(elementReference);
  }

  changeCountdown () {
    const { canvas } = this.props;
    const { currentHoverBlock } = canvas;
    const { elementReference } = currentHoverBlock;

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

export default connect(mapStateToProps)(SectionToolBox);
