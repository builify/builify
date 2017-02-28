import React from 'react';
import { connect } from 'react-redux';
import {
  map as _map,
  has as _has
} from 'lodash';
import Random from '../../../common/random';
import classNames from '../../../common/classnames';
import BlockTitle from './title';
import ContentBlock from './block';
import Scrollbar from '../../shared/scrollbar';
import { loadContentBlockSource as loadContentBlockSourceAction } from '../../../actions';

class ContentBlocks extends React.Component {
  static propTypes = {
    blocks: React.PropTypes.array.isRequired,
    filterContentBlocksTarget: React.PropTypes.string.isRequired,
    loadContentBlockSource: React.PropTypes.func.isRequired
  };

  componentWillMount () {
    const { blocks } = this.props;

    if (blocks.length === 0) {
      return;
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
              source,
              thumbnail,
              features
            });
          });
        }
      } else {
        throw Error(`Missing type of ${JSON.stringify(block)}`);
      }
    });
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.filterContentBlocksTarget !== this.props.filterContentBlocksTarget) {
      return true;
    }

    return false;
  }

  _itemsToRender = [];

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

      return null;
    });
  }

  render () {
    const browserHeight = window.innerHeight || document.body.clientHeight;
    const scrollbarDimensions = {
      width: 275,
      height: browserHeight - 270
    };

    return (
      <Scrollbar
        width={scrollbarDimensions.width}
        height={scrollbarDimensions.height}>
        <div className={classNames('contentblocks')}>
          <div className={classNames('contentblocks__inner')}>
            { this.renderItems() }
          </div>
        </div>
      </Scrollbar>
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
    loadContentBlockSource: (item) => {
      dispatch(loadContentBlockSourceAction(item));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBlocks);
