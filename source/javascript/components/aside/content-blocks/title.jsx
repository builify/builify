import React from 'react';
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
  filterContentBlocksTarget: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};
