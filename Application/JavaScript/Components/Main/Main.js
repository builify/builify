import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { proccessTemplateSelection, startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { CurrentLocationEnum } from '../../Constants/Defines';
import classNames from 'classnames';
import ABuilder from '../../Common/Builder';
import Canvas from './Canvas';
import ProjectStartScreen from './ProjectStartScreen';
import PreviewContainer from './PreviewContainer';
import TemplateSelectionScreen from './TemplateSelectionScreen';

class Main extends Component {
  doesURLHashHasTemplateName () {
    return (ABuilder.getURLHash().indexOf('template-') !== -1 ? true : false);
  }
 
  previewNodes () {
    return <PreviewContainer />
  }

  canvasNodes () {
    return <Canvas />
  }

  workflowNodes () {
    return <ProjectStartScreen />
  }

  templateSectionNodes (templates) {
    return <TemplateSelectionScreen templates={templates} />
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
    )
  }
}

const mapStateToProps = (state) => ({
  builderConfiguration: state.builderConfiguration,
  builder: state.builder,
  localization: state.localizationData
});

export default connect(
  mapStateToProps
)(Main);