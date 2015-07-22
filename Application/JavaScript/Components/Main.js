import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'redux/react';

@connect(state => ({
  localization: state.localizationData
}))
class Template extends Component {
  static propTypes = {
    templateInformation: PropTypes.object
  };

  static defaultProps  = {
    templateInformation: {}
  };

  selectTemplate (e) {
    if (history.pushState) {
      history.pushState(null, null, '#template');
    } else {
      location.hash = '#template';
    }
  }

  render () {
    const { templateInformation } = this.props;
    return (
      <div className='ab-template' onClick={::this.selectTemplate}>
        <figure className='ab-templateitem__figure'>
          <img src={templateInformation.image} />
          <figcaption>
            <h1>{templateInformation.title}</h1>
            <p>{templateInformation.description}</p>
          </figcaption>
        </figure>
      </div>
    );
  };
};

@connect(state => ({
  builderConfiguration: state.builderConfiguration
}))
export default class Main extends Component {
  state = {
    isTemplateSelected: true
  };

  workflowNodes () {
    return (
      <h2>What</h2>
    );
  };

  templateSectionNodes (templates) {
    return (
      <div className="ab-main-template-selection">
        <h1>Select Template</h1>
        {templates.map((template, i) =>
          <Template key={i} templateInformation={template} />
        )}
      </div>
    );
  };

  renderNodes (templates) {
    if (this.state.isTemplateSelected) {
      return this.workflowNodes();
    } else {
      return this.templateSectionNodes(templates);
    }
  }

  render () {
    const mainClassName = classNames('ab-main', !this.state.isTemplateSelected ? 'fullsize' : '');
    const { templates } = this.props.builderConfiguration;

    return (
      <main className={mainClassName}>
        {this.renderNodes(templates)}
      </main>
    )
  }
};