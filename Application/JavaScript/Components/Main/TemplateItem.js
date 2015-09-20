import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { proccessTemplateSelection } from '../../Actions/ActionCreators';
import LoadImage from '../Shared/LoadImage';

class TemplateItem extends Component {
  static propTypes = {
    templateInformation: PropTypes.object.isRequired
  };

  static defaultProps  = {
    templateInformation: {}
  };

  selectTemplate (e) {
    const { onTemplateSelection, templateInformation } = this.props;
    const templateName = templateInformation.title.toString().toLowerCase();

    return onTemplateSelection(templateName);
  }

  render () {
    const { templateInformation, dispatch } = this.props;
 
    if (!templateInformation) {
      throw Error('Template information is invalid. Please check builder configuration file.');
    } else if (!templateInformation.title) {
      throw Error('Template title is missing. Please check builder configuration file.')
    } else if (!templateInformation.description) {
      throw Error('Template description is missing. Please check builder configuration file.')
    } else if (!templateInformation.image) {
      throw Error('Template image is missing. Please check builder configuration file.')
    }

    return (
      <li
        className='ab-templateitem'
        onClick={::this.selectTemplate}>
        <figure className='ab-templateitem__figure'>
          <img src={templateInformation.image} alt="Image" />
          <figcaption>
            <h2>{templateInformation.title}</h2>
            <p>{templateInformation.description}</p>
          </figcaption>
        </figure>
      </li>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localizationData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onTemplateSelection: (templateName) => {
      dispatch(proccessTemplateSelection(templateName));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateItem);
