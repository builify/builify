import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import DOM from '../../../Common/DOM';

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
      const browserSize = DOM.browser.size();
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
        <div className='ab-scrollbar__inner'>
          { children }
        </div>
      );
    }

    return children;
  }

  render () {
    const stylesheetStyle = this.getStyle(this.props);
    const className = 'ab-scrolbar';

    return (
      <Scrollbars
        className={className}
        style={stylesheetStyle}>
        { this.renderChildren() }
      </Scrollbars>
    );
  }
}
