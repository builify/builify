import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import {
    values as _values,
    has as _has,
    map as _map,
    isNull as _isNull
} from 'lodash';
import classNames from '../../../common/classnames';
import ToolboxItem from './item';
import localization from '../../../common/localization';
import * as Actions from '../../../actions';

class SectionToolBox extends React.Component {
  static propTypes = {
    currentHoverBlock: PropTypes.object.isRequired,
    openVideoEditModal: PropTypes.func.isRequired,
    openCountdownEditModal: PropTypes.func.isRequired,
    removeContentBlock: PropTypes.func.isRequired,
    openColorPicker: PropTypes.func.isRequired,
    openImageEditModal: PropTypes.func.isRequired,
    openFormEditModal: PropTypes.func.isRequired
  };

  toolboxItemColorChange = null;

  renderItems () {
    const { currentHoverBlock } = this.props;
    const { block } = currentHoverBlock;
    const { features } = block;

    return _map(features, (featureValue, feature) => {
      let title = null;
      let icon = null;
      let clickFunction = null;

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
        } else if (feature === 'formInput') {
          title = 'Edit Form';
          icon = 'input';
          clickFunction = ::this.editFormInput;
        }
      }

      if (_isNull(title) || _isNull(clickFunction) || _isNull(icon)) {
        return null;
      }

      return (
        <ToolboxItem
          key={feature}
          itemRef={(ref) => {
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

  render () {
    const { currentHoverBlock } = this.props;
    const { block, topX } = currentHoverBlock;
    const className = classNames('cstoolbox');
    const toolBoxStyle = {
      top: topX
    };

    if (_values(block).length === 0 || !_has(block, 'elementReference')) {
      return null;
    }

    return (
      <div data-abctoolbox className={className} style={toolBoxStyle}>
        <ul className='settings'>
          { this.renderItems() }
          <ToolboxItem
            title={localization('remove')}
            icon='remove'
            onClick={::this.removeBlock} />
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
    const sourceElement = findDOMNode(this.toolboxItemColorChange);

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

  editFormInput () {
    const { currentHoverBlock } = this.props;
    const { block } = currentHoverBlock;

    return this.props.openFormEditModal(block);
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
    },

    openFormEditModal: (target) => {
      dispatch(Actions.openFormEditModal(target));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionToolBox);
