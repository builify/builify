import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { proccessTemplateSelection, startNewPage, loadPreviousPage } from '../../Actions/ActionCreators';
import { CurrentLocationEnum } from '../../Constants/Defines';
import { on } from '../../Common/Common';
import classNames from 'classnames';
import Canvas from './Canvas.jsx';
import ProjectStartScreen from './ProjectStartScreen.jsx';
import PreviewContainer from './PreviewContainer.jsx';

class Main extends Component {
  previewNodes () {
    return <PreviewContainer />
  }

  canvasNodes () {
    return <Canvas />
  }

  workflowNodes () {
    return <ProjectStartScreen />
  }

  renderNodes (templates) {
    const hashChangeEvent = (e) => {
      let { currentLocation } = this.props.builder;

      switch (currentLocation) {
        case CurrentLocationEnum.STARTSCREEN:
          return this.workflowNodes();

        case CurrentLocationEnum.CANVAS:
          return this.canvasNodes();

        case CurrentLocationEnum.PREVIEW:
          return this.previewNodes();
      }
    };

    on('hashchange', hashChangeEvent);

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
        className={mainClassName}>
        {this.renderNodes(templates)}
      </main>
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

export default connect(
  mapStateToProps
)(Main);
