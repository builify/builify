import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Canvas from './Canvas';
import ProjectStartScreen from './ProjectStartScreen';
import { CurrentLocations } from '../../Constants';

class Main extends React.Component {
  render () {
    const { builder } = this.props;
    const { currentLocation } = builder;

    const mainClassName = classNames('ab-main',
      currentLocation === CurrentLocations.TEMPLATESELECTION ? 'fullsize' :
      (currentLocation === CurrentLocations.PREVIEW ? 'preview' : ''));

    return (
      <main
        className={mainClassName}>
        <ProjectStartScreen />
        <Canvas />
      </main>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

export default connect(mapStateToProps)(Main);
