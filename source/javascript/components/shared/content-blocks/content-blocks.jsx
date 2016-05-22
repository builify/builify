import React from 'react';
import _map from 'lodash/map';
import _has from 'lodash/has';
import Random from '../../../common/random';
import classNames from '../../../common/classnames';
import BlockTitle from '../BlockTitle';
import ContentBlock from './block';
import { connect } from 'react-redux';
import { loadContentBlockSource } from '../../../Actions';

class ContentBlocks extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    template: React.PropTypes.object.isRequired,
    loadContentBlockSource: React.PropTypes.func.isRequired
  };

  itemsToRender = [];

  shouldComponentUpdate (nextProps) {
    if (nextProps.builder.filterContentBlocksTarget !== this.props.builder.filterContentBlocksTarget) {
      return true;
    }

    return false;
  }

  componentWillMount () {
    const { template } = this.props;

    if (_has(template, 'blocks')) {
      const { blocks } = template;

      _map(blocks, (block) => {
        if (_has(block, 'type')) {
          const { type } = block;

          this.itemsToRender.push({
            type: 'blocktitle',
            name: type
          });

          if (_has(block, 'items')) {
            const blockItems = block.items;

            _map(blockItems, (blockItem) => {
              const { title, source, features } = blockItem;
              let thumbnail = null;

              if (_has(blockItem, 'thumbnail')) {
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
    const { loadContentBlockSource } = this.props;

    return _map(this.itemsToRender, item => {
      const { type } = item;

      if (type === 'blocktitle') {
        return <BlockTitle key={Random.randomKey('blocktitle')} data={item} />;
      } else if (type === 'block') {
        return (
          <ContentBlock
            key={Random.randomKey('block')}
            data={item}
            onClick={loadContentBlockSource}
            builder={this.props.builder} />
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
  return {
    template: state.template,
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadContentBlockSource: (data) => {
      dispatch(loadContentBlockSource(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBlocks);
