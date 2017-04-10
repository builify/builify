import React from 'react';
import PropTypes from 'prop-types';
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string
};

Title.defaultProps = {
  description: null,
  className: null
};
