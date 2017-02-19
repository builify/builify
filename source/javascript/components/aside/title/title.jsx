import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';

export default function Title ({
  title,
  description,
  className
}) {
  const titleClassName = classNames('title', className);
  const descClassName = classNames('title__desc');

  if (!title) {
    return null;
  }

  return (
    <div className={titleClassName}>
      <h2>
        <span>{ localization(title) }</span>
      </h2>
      { description && <p className={descClassName}>{ description }</p> }
    </div>
  );
}

Title.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  className: React.PropTypes.string
};

Title.defaultProps = {
  description: null,
  className: null
};
