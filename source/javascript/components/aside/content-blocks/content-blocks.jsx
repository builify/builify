import React from 'react';
import _map from 'lodash/map';
import _has from 'lodash/has';
import Random from '../../../common/random';
import classNames from '../../../common/classnames';
import BlockTitle from './block-title';
import ContentBlock from './block';
import { connect } from 'react-redux';
import { loadContentBlockSource } from '../../../actions';

class ContentBlocks extends React.Component {
  static propTypes = {
    blocks: React.PropTypes.array.isRequired,
    filterContentBlocksTarget: React.PropTypes.string.isRequired,
    loadContentBlockSource: React.PropTypes.func.isRequired
  };

  _itemsToRender = [];

  shouldComponentUpdate (nextProps) {
    if (nextProps.filterContentBlocksTarget !== this.props.filterContentBlocksTarget) {
      return true;
    }

    return false;
  }

  componentWillMount () {
    const { blocks } = this.props;

    if (blocks.length === 0) {
      return null;
    }

    _map(blocks, (block) => {
      if (_has(block, 'type')) {
        const { type } = block;

        this._itemsToRender.push({
          type: 'blocktitle',
          name: type
        });

        if (_has(block, 'items')) {
          const blockItems = block.items;

          _map(blockItems, (blockItem) => {
            const { title, source, features } = blockItem;
            const thumbnail = `${blockItem.thumbnail}`;

            this._itemsToRender.push({
              type: 'block',
              blockType: type,
              name: title,
              source: source,
              thumbnail: thumbnail,
              features: features
            });
          });
        }
      } else {
        throw Error(`Missing type of ${JSON.stringify(block)}`);
      }
    });
  }

  renderItems () {
    const { loadContentBlockSource, filterContentBlocksTarget } = this.props;

    return _map(this._itemsToRender, (item) => {
      const { type } = item;

      if (type === 'blocktitle') {
        const { name } = item;

        return (
          <BlockTitle
            key={Random.randomKey('blocktitle')}
            filterContentBlocksTarget={filterContentBlocksTarget}
            title={name} />
        );
        
      } else if (type === 'block') {
        return (
          <ContentBlock
            key={Random.randomKey('block')}
            data={item}
            onClick={loadContentBlockSource}
            filterContentBlocksTarget={filterContentBlocksTarget} />
        );
      }
    });
  }

  render () {
    return (
      <div className={classNames('contentblocks')}>
        <div className={classNames('contentblocks__inner')}>
          { this.renderItems() }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { template, builder } = state;
  const { blocks } = template;
  const { filterContentBlocksTarget } = builder;

  return {
    filterContentBlocksTarget,
    blocks
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadContentBlockSource: function (item) {
      dispatch(loadContentBlockSource(item));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBlocks);
