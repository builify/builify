import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { proccessTemplateSelection } from '../Actions/ActionCreators';
import classNames from 'classnames';
import ABuilder from '../Common/ABuilder'

@connect(state => ({
  localization: state.localizationData
}))
class Page extends Component {
  static propTypes = {
    isNewPage: PropTypes.string
  };

  render () {
    return (
      <div className='ab-page-new'>
        <span>New Page</span>
      </div>
    );
  }
}

@connect(state => ({
  localization: state.localizationData
}))
class ProjectStartScreen extends Component {
  render () {
    return (
      <Page isNewPage='false'/>
    );
  }
};

@connect(state => ({
  localization: state.localizationData
}))
class TemplateItem extends Component {
  static propTypes = {
    templateInformation: PropTypes.object.isRequired
  };

  static defaultProps  = {
    templateInformation: {}
  };

  selectTemplate (e) {
    const { templateInformation } = this.props;

    return proccessTemplateSelection(templateInformation.title.toString().toLowerCase());
  }

  render () {
    const { templateInformation, dispatch } = this.props;

    if (!templateInformation) {
      throw Error('Template information is invalid. Please check builder configuration file.');
    } else if (!templateInformation.title) {
      throw Error('Template title is missing. Please check builder configuration file.')
    } else if (!templateInformation.tags) {
      throw Error('Template tags is missing. Please check builder configuration file.')
    } else if (!templateInformation.description) {
      throw Error('Template description is missing. Please check builder configuration file.')
    } else if (!templateInformation.image) {
      throw Error('Template image is missing. Please check builder configuration file.')
    }

    return (
      <div 
        className='ab-templateitem' 
        {...bindActionCreators({
          onClick: ::this.selectTemplate
        }, dispatch)}>
        <figure className='ab-templateitem__figure'>
          <h1>{templateInformation.title}</h1>
          <div className='ab-templateitem__bg' style={{backgroundImage: 'url(' + templateInformation.image + ')'}}></div>
          <p>{templateInformation.description}</p>
        </figure>
      </div>
    );
  };
};

@connect(state => ({
  builderConfiguration: state.builderConfiguration,
  builder: state.builder
}))
export default class Main extends Component {
  doesURLHashHasTemplateName () {
    if (ABuilder.getURLHash().indexOf('template-') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  workflowNodes () {
    return (
      <ProjectStartScreen />
    );
  }

  templateSectionNodes (templates) {
    return (
      <div className="ab-main-template-selection">
        <h1>Select Template</h1>
        <div className='ab-flex'>
          {templates.map((template, i) =>
            <TemplateItem key={i} templateInformation={template} />
          )}
        </div>
      </div>
    );
  }

  renderNodes (templates) {
    const hashChangeEvent = (e) => {
      if (this.doesURLHashHasTemplateName()) {
        return this.workflowNodes();
      } else {
        return this.templateSectionNodes(templates);
      }
    };

    window.addEventListener('hashchange', hashChangeEvent, false);

    return hashChangeEvent();
  }

  render () {
    const { templates } = this.props.builderConfiguration;
    const isTemplateSelected = this.doesURLHashHasTemplateName();
    const mainClassName = classNames('ab-main', !isTemplateSelected ? 'fullsize' : '');

    return (
      <main 
        className={mainClassName} >
        {this.renderNodes(templates)}
      </main>
    );
  }
};