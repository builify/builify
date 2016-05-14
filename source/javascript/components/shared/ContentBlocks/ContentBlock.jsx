import React from 'react';
import { connect } from 'react-redux';
import { loadContentBlockSource } from '../../../Actions';
import Events from '../../../Common/Events';
import classNames from 'classnames';
import ImageItem from '../ImageItem';

class ContentBlock extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onContentBlockSelection: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return true;
  }

  selectContentBlock () {
    const { onContentBlockSelection, data } = this.props;
    return onContentBlockSelection(data);
  }

  dragContentBlock (e) {
    Events.pauseEvent(e);
  }

  render () {
    const { builder, data } = this.props;
    const { name, thumbnail, blockType } = data;
    const { filterContentBlocksTarget } = builder;
    let blockClassName = classNames('ab-contentblocks__block');

    if (filterContentBlocksTarget !== 'all') {
      if (blockType !== filterContentBlocksTarget) {
        blockClassName = classNames('ab-contentblocks__block', 'hide');
      }
    }

    return (
      <figure
        className={blockClassName}
        data-blocktype={blockType}
        onClick={::this.selectContentBlock}>
        <ImageItem
          src={thumbnail}
          alt={name}/>
        <figcaption>
          <span>{name}</span>
        </figcaption>
      </figure>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onContentBlockSelection: (data) => {
      dispatch(loadContentBlockSource(data));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ContentBlock);
