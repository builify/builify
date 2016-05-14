import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TTDOM from '../../../common/TTDOM';
import classNames from '../../../common/classnames';

export default class Scrollbar extends React.Component {
  static propTypes = {
    aside: React.PropTypes.bool,
    innerPadding: React.PropTypes.bool,
    height: React.PropTypes.number,
    width: React.PropTypes.number
  };

  static defaultProps = {
    aside: false,
    innerPadding: false
  };

  getStyle ({ aside, height, width }) {
    if (aside) {
      const browserSize = TTDOM.browser.size();
      const { height } = browserSize;
      const asideWidth = 275;

      return {
        height: height,
        width: asideWidth
      };
    }

    return  {
      height: height,
      width: width
    };
  }

  renderChildren () {
    const { children, innerPadding } = this.props;

    if (innerPadding) {
      return (
        <div className={classNames('scrollbar__inner')}>
          { children }
        </div>
      );
    }

    return children;
  }

  render () {
    const stylesheetStyle = this.getStyle(this.props);

    return (
      <Scrollbars className={classNames('scrollbar')} style={stylesheetStyle}>
        { this.renderChildren() }
      </Scrollbars>
    );
  }
}
