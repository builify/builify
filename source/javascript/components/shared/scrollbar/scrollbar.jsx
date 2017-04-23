import React from 'react';
import PropTypes from 'prop-types';
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
    aside: PropTypes.bool,
    innerPadding: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
  };

  static defaultProps = {
    aside: false,
    innerPadding: false
  };

  shouldComponentUpdate (nextProps) {
    return (this.props.children !== nextProps.children);
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
