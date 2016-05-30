import React from 'react';
import classNames from '../../common/classnames';
import localization from '../../common/localization';

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
          <h1>{localization('canvas.suggestionbox.h1')}</h1>
          <h2>{localization('canvas.suggestionbox.h2')}</h2>
        </div>
      );
    }

    return null;
  }
}
