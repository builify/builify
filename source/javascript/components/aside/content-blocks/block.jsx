import React from 'react';
import classNames from '../../../common/classnames';
import ImageItem from '../../shared/image-item';

export default class ContentBlock extends React.Component {
  static propTypes = {
    filterContentBlocksTarget: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  selectContentBlock () {
    return this.props.onClick(this.props.data);
  }

  dragContentBlock (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  render () {
    const { data, filterContentBlocksTarget } = this.props;
    const { name, thumbnail, blockType } = data;
    const className = classNames('contentblocks__block', {
      'hide': filterContentBlocksTarget !== 'all' && blockType !== filterContentBlocksTarget
    });

    return (
      <figure
        title={name}
        className={className}
        data-blocktype={blockType}
        onClick={::this.selectContentBlock}>
        <ImageItem src={thumbnail} alt={name}/>
        <figcaption>
          { name && <span>{ name }</span> }
        </figcaption>
      </figure>
    );
  }
}
