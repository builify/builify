import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocationEnum } from '../../Constants/Defines';
import cx from 'classnames';
import Canvas from './Canvas.jsx';
import ProjectStartScreen from './ProjectStartScreen.jsx';
import TextEditorPanel from '../Shared/TextEditorPanel.jsx';

class Main extends Component {
  renderChildren () {
    const { builder } = this.props;
    const { currentLocation } = builder;

    if (currentLocation === CurrentLocationEnum.STARTSCREEN) {
      return (
        <ProjectStartScreen />
      )
    } else {
      return (
        <Canvas />
      )
    }
  }

  render () {
    let externalClassName = '';
    const { builder } = this.props;
    const { currentLocation } = builder;

    const mainClassName = cx('ab-main',
      currentLocation === CurrentLocationEnum.TEMPLATESELECTION ? 'fullsize' :
      (currentLocation === CurrentLocationEnum.PREVIEW ? 'preview' : ''));

    return (
      <main
        className={mainClassName}>
        <TextEditorPanel />
        {this.renderChildren()}
      </main>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(Main);
