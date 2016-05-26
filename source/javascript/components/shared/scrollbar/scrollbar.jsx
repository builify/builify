import React from 'react';
import TTDOM from '../../../common/TTDOM';
import classNames from '../../../common/classnames';
import { Scrollbars } from 'react-custom-scrollbars';

export default class Scrollbar extends React.Component {
  static propTypes = {
    aside: React.PropTypes.bool,
    innerPadding: React.PropTypes.bool,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    children: React.PropTypes.node
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
    const { children } = this.props;

    if (this.props.innerPadding) {
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
