import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { getBrowserSize } from '../../Common/Common';

class Scrollbar extends Component {
  render () {
    const browserSize = getBrowserSize();
    const scrollBarHeight = browserSize.height;
    const scrollBarWidth = 275;
    const scrollBarStyle = {
      height: scrollBarHeight,
      width: scrollBarWidth
    };

    return (
      <Scrollbars
        className='ab-scrollbar'
        style={scrollBarStyle}>
        <div className='ab-scrollbar__inner'>
          {this.props.children}
        </div>
      </Scrollbars>
    )
  }
}

export default Scrollbar;