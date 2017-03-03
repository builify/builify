import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TTDOM from '../../../common/TTDOM';
import classNames from '../../../common/classnames';

function getStyle ({
  aside,
  height,
  width
} = {}) {
  if (aside) {
    const browserSize = TTDOM.browser.size();
    const asideWidth = 275;

    return {
      height: browserSize.height,
      width: asideWidth
    };
  }

  return {
    height,
    width
  };
}

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

  shouldComponentUpdate (nextProps) {
    if (this.props.children !== nextProps.children) {
      return true;
    }

    return false;
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
    const stylesheetStyle = getStyle(this.props);

    return (
      <Scrollbars className={classNames('scrollbar')} style={stylesheetStyle}>
        { this.renderChildren() }
      </Scrollbars>
    );
  }
}
