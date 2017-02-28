import React from 'react';
import classNames from '../../common/classnames';
import localization from '../../common/localization';

export default function SuggestionBox ({
  display
}) {
  if (!display) {
    return null;
  }

  return (
    <div className={classNames('suggestion-box')}>
      <h1 className={classNames('suggestion-box__title')}>{ localization('canvas.suggestionbox.h1') }</h1>
      <h2 className={classNames('suggestion-box__sub')}>{ localization('canvas.suggestionbox.h2') }</h2>
    </div>
  );
}

SuggestionBox.propTypes = {
  display: React.PropTypes.bool
};

SuggestionBox.defaultProps = {
  display: true
};
