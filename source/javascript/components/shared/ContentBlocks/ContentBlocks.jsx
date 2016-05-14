import React from 'react';
import { connect } from 'react-redux';
import Random from '../../../Common/Random';
import _ from 'lodash';
import BlockTitle from '../BlockTitle';
import ContentBlock from './ContentBlock';

class ContentBlocks extends React.Component {
  itemsToRender = [];

  shouldComponentUpdate () {
    return false;
  }

  componentWillMount () {
    const { template } = this.props;

    if (_.has(template, 'blocks')) {
      const { blocks } = template;

      _.map(blocks, (block) => {
        if (_.has(block, 'type')) {
          const { type } = block;

          this.itemsToRender.push({
            type: 'blocktitle',
            name: type
          });

          if (_.has(block, 'items')) {
            const blockItems = block.items;

            _.map(blockItems, (blockItem) => {
              const { title, source, features } = blockItem;
              let thumbnail = null;

              if (_.has(blockItem, 'thumbnail')) {
                thumbnail = blockItem.thumbnail;
              }

              this.itemsToRender.push({
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
  }

  renderItems () {
    return _.map(this.itemsToRender, item => {
      const { type } = item;

      if (type === 'blocktitle') {
        return (
          <BlockTitle
            key={Random.randomKey('blocktitle')}
            data={item} />
        );
      } else if (type === 'block') {
        return (
          <ContentBlock
            key={Random.randomKey('block')}
            data={item} />
        );
      }
    });
  }

  render () {
    return (
      <div
        className='ab-contentblocks'>
        <div className='ab-contentblocks__inner'>
          { this.renderItems() }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  };
}

export default connect(mapStateToProps)(ContentBlocks);
