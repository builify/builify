import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../Constants';
import cx from 'classnames';
import Canvas from './Canvas';
import ProjectStartScreen from './ProjectStartScreen';
import TextEditorPanel from '../Shared/TextEditorPanel';

class Main extends Component {
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
        <ProjectStartScreen />
        <Canvas />
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
