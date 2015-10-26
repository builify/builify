import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import _ from 'lodash';
import BlockTitle from './BlockTitle.jsx';
import ContentBlock from './ContentBlock.jsx';

class ContentBlocks extends Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { template } = this.props;
    let itemsToRender = [];

    if (_.has(template, 'blocks')) {
      const { blocks } = template;
      const blocksLength = blocks.length;

      _.map(blocks, (block, i) => {
        if (_.has(block, 'type')) {
          const { type } = block;

          itemsToRender.push({
            type: 'blocktitle',
            name: type
          });

          if (_.has(block, 'items')) {
            const blockItems = block.items;
            const itemsLength = blockItems.length;

            _.map(blockItems, (blockItem, i) => {
              const { title, source } = blockItem;
              const thumbnail = blockItem.hasOwnProperty('thumbnail') ? blockItem.thumbnail : null;

              itemsToRender.push({
                type: 'block',
                blockType: type,
                name: title,
                source: source,
                thumbnail: thumbnail
              });
            })
          }
        } else {
          throw Error('Missing type of ' + JSON.stringify(block));
        }
      });
    }

    return (
      <div
        className='ab-contentblocks'>
        <div className='ab-contentblocks__inner'>
          {itemsToRender.map((item, i) => {
            const { type } = item;

            if (type === 'blocktitle') {
              const key = randomKey('blocktitle');

              return (
                <BlockTitle
                  key={key}
                  data={item} />
              )
            } else if (type === 'block') {
              const key = randomKey('block');

              return (
                <ContentBlock
                  key={key}
                  data={item} />
              )
            }
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  }
}

export default connect(
  mapStateToProps
)(ContentBlocks);
