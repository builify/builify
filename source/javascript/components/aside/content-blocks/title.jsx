import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';

export default function BlockTitle ({
  filterContentBlocksTarget,
  title
}) {
  const className = classNames(null, 'blocktitle', {
    hide: filterContentBlocksTarget !== 'all'
  });

  return (
    <h2 className={className}>
      <span>{ title }</span>
    </h2>
  );
}

BlockTitle.propTypes = {
  filterContentBlocksTarget: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
