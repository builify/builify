import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { proccessTemplateSelection, startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import { CurrentLocationEnum } from '../../Constants/Enums';
import classNames from 'classnames';
import ABuilder from '../../Common/ABuilder';
import Canvas from './Canvas';
import ProjectStartScreen from './ProjectStartScreen';
import TemplateItem from './TemplateItem';
import PreviewContainer from './PreviewContainer';

class Main extends Component {
  doesURLHashHasTemplateName () {
    if (ABuilder.getURLHash().indexOf('template-') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  previewNodes () {
    return (
      <PreviewContainer />
    );
  }

  canvasNodes () {
    return (
      <Canvas />
    );
  }

  workflowNodes () {
    return (
      <ProjectStartScreen />
    );
  }

  templateSectionNodes (templates) {
    return (
      <div className="ab-main-template-selection">
        <h1>{getString('templateselection')}</h1>
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
      let { currentLocation } = this.props.builder;

      switch (currentLocation) {
        case CurrentLocationEnum.TEMPLATESELECTION:
          return this.templateSectionNodes(templates);

        case CurrentLocationEnum.STARTSCREEN:
          return this.workflowNodes();

        case CurrentLocationEnum.CANVAS:
          return this.canvasNodes();

        case CurrentLocationEnum.PREVIEW:
          return this.previewNodes();
      }
    };

    ABuilder.on('hashchange', hashChangeEvent);

    return hashChangeEvent();
  }

  render () {
    let externalClassName = '';
    const { currentLocation } = this.props.builder;

    switch (currentLocation) {
      case CurrentLocationEnum.TEMPLATESELECTION:
        externalClassName = 'fullsize';
        break;

      case CurrentLocationEnum.PREVIEW:
        externalClassName = 'preview';
        break;

      default:
        break;
    }

    const { templates } = this.props.builderConfiguration;
    const mainClassName = classNames('ab-main', externalClassName);

    return (
      <main 
        className={mainClassName} >
        {this.renderNodes(templates)}
      </main>
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localizationData
  };
}

export default connect(mapStateToProps)(Main);