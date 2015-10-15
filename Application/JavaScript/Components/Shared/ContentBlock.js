import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadContentBlockSourceToCanvas } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import ImageItem from './ImageItem';

class ContentBlock extends Component {
  shouldComponentUpdate () {
    return false;
  }
  
  selectContentBlock (e) {
    const { onContentBlockSelection, data, builder } = this.props;
    const { source, blockType, name } = data;
    const { selectedTemplate } = builder;

    return onContentBlockSelection(source, blockType, name, selectedTemplate);
  }

  render () {
    const { builder, data } = this.props;
    const { name, thumbnail, blockType} = data;
    const { filterContentBlocksTarget } = builder;
    let blockClassName = classNames('ab-contentblocks__block');

    if (filterContentBlocksTarget != 'all') {
      if (blockType != filterContentBlocksTarget) {
        blockClassName = classNames('ab-contentblocks__block', 'hide');
      }
    }

    return (
      <figure 
        className={blockClassName}
        data-blocktype={blockType}
        onClick={::this.selectContentBlock}> 
        <ImageItem src={thumbnail} alt={name}/>
        <figcaption>
          <span>{name}</span>
        </figcaption>
      </figure>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onContentBlockSelection: (source, blockType, blockName, templateName) => {
      dispatch(loadContentBlockSourceToCanvas(source, blockType, blockName, templateName));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBlock);