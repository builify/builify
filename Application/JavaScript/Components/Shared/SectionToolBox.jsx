import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeContentBlock } from '../../Actions/ActionCreators';
import cx from 'classnames';
import SvgIcon from './SvgIcon.jsx';

class SectionToolBox extends Component {
  render () {
    const { canvas, onRemove } = this.props;
    const { currentHoverBlock } = canvas;
    const { element, topX } = currentHoverBlock;
    const toolBoxClassName = cx('ab-cstoolbox');
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
        className={toolBoxClassName}
        style={toolBoxStyle}>
        <ul>
          <li
            title='Change Block Settings'>
            <SvgIcon
              icon='settings'
              size={iconSize}
              style={iconStyle } />
          </li>
          <li
            title='Remove Block'>
            <SvgIcon
              onClick={(e) => {
                return onRemove(element);
              }}
              icon='remove-circle-outline'
              size={iconSize}
              style={iconStyle } />
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionToolBox);
