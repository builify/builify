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
    if (!this.props.display) {
      return null;
    }

    return (
      <div className={classNames('suggestion-box')}>
        <h1 className={classNames('suggestion-box__title')}>{ localization('canvas.suggestionbox.h1') }</h1>
        <h2 className={classNames('suggestion-box__sub')}>{ localization('canvas.suggestionbox.h2') }</h2>
      </div>
    );
  }
}
