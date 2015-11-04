import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../Constants/Defines';
import cx from 'classnames';
import Canvas from './Canvas';
import ProjectStartScreen from './ProjectStartScreen';
import TextEditorPanel from '../Shared/TextEditorPanel';

class Main extends Component {
  renderChildren () {
    const { builder } = this.props;
    const { currentLocation } = builder;

    if (currentLocation === CurrentLocations.STARTSCREEN) {
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
      currentLocation === CurrentLocations.TEMPLATESELECTION ? 'fullsize' :
      (currentLocation === CurrentLocations.PREVIEW ? 'preview' : ''));

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
