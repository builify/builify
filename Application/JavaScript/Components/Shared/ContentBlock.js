import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadContentBlockSourceToCanvas } from '../../Actions/ActionCreators';

class ContentBlock extends Component {
  selectContentBlock (e) {
    const { onContentBlockSelection, data, builder } = this.props;
    const { source, blockType, name } = data;
    const { selectedTemplate } = builder;

    return onContentBlockSelection(source, blockType, name, selectedTemplate);
  }

  render () {
    const { data } = this.props;
    const { name, thumbnail, blockType} = data;

    return (
      <figure 
        className='ab-contentblocks__block'
        data-blocktype={blockType}
        onClick={::this.selectContentBlock}> 
        <img src={thumbnail} />
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