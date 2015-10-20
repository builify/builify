import React, { Component } from 'react';
import { connect } from 'react-redux';
import SvgIcon from './SvgIcon.jsx';

class SectionToolBox extends Component {
  render () {
    const iconSize = 24;
    const iconStyle = {
      fill: '#FFF'
    };

    return (
      <div
        className='ab-cstoolbox'>
        <ul>
          <li title='Change Block Settings'>
            <SvgIcon
              icon='settings'
              size={iconSize}
              style={iconStyle } />
          </li>
          <li title='Remove Block'>
            <SvgIcon
              icon='remove-circle-outline'
              size={iconSize}
              style={iconStyle } />
          </li>
        </ul>
      </div>
    )
  }
}

export default SectionToolBox;
