import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';

function BlockTitle ({
  title
}) {
  return (
    <h3 className={classNames('be-block__title')}>{ title }</h3>
  );
}

BlockTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default BlockTitle;
