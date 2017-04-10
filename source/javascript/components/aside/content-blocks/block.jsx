import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';
import ImageItem from '../../shared/image-item';

export default function ContentBlock ({
  filterContentBlocksTarget,
  data,
  onClick
}) {
  const { name, thumbnail, blockType } = data;
  const className = classNames('contentblocks__block', {
    hide: filterContentBlocksTarget !== 'all' && blockType !== filterContentBlocksTarget
  });
  const selectContentBlock = () => {
    return onClick(data);
  };

  return (
    <figure
      title={name}
      className={className}
      data-blocktype={blockType}
      onClick={selectContentBlock}>
      <ImageItem src={thumbnail} alt={name} />
      <figcaption>
        { name && <span>{ name }</span> }
      </figcaption>
    </figure>
  );
}

ContentBlock.propTypes = {
  filterContentBlocksTarget: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
