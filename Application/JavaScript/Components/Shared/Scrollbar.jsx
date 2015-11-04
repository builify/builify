import React, { Component, PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { getBrowserSize } from '../../Common/Common';

class Scrollbar extends Component {
  static propTypes = {
    aside: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
  }

  static defaultProps = {
    aside: false
  }

  render () {
    const { aside, height, width, children } = this.props;
    let scrollBarStyle = {};

    if (aside) {
      const browserSize = getBrowserSize();
      const scrollBarHeight = browserSize.height;

      scrollBarStyle = {
        height: scrollBarHeight,
        width: 275
      };
    } else {
      scrollBarStyle = {
        height: height,
        width: width
      };
    }

    return (
      <Scrollbars
        className='ab-scrollbar'
        style={scrollBarStyle}>
        <div className='ab-scrollbar__inner'>
          {children}
        </div>
      </Scrollbars>
    )
  }
}

export default Scrollbar;
