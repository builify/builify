import React from 'react';
import classNames from '../../common/classnames';

export default class CanvasSuggestionBox extends React.Component {
  static propTypes = {
    display: React.PropTypes.bool
  };

  static defaultProps = {
    display: true
  };

  shouldComponentUpdate (nextProps) {
    if (nextProps.display !== this.props.display) {
      return true;
    }

    return false;
  }

  render () {
    if (this.props.display === true) {
      return (
        <div className={classNames('suggestion-box')}>
          <h1>This is where your page will appear</h1>
          <h2>So drop some contentblocks!</h2>
        </div>
      );
    }

    return null;
  }
}
