import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadContentBlockSourceToCanvas } from '../../Actions/ActionCreators';

class ContentBlock extends Component {
  selectContentBlock (e) {
    const { onContentBlockSelection, data, builder } = this.props;
    const { source } = data;
    const { selectedTemplate } = builder;

    return onContentBlockSelection(source, selectedTemplate);
  }

  render () {
    const { data } = this.props;
    const { title, thumbnail } = data;

    return (
      <figure 
        className='ab-contentblocks__block'
        onClick={::this.selectContentBlock}> 
        <img src={thumbnail} />
        <figcaption>
          <span>{title}</span>
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
    onContentBlockSelection: (source, templateName) => {
      dispatch(loadContentBlockSourceToCanvas(source, templateName));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBlock);