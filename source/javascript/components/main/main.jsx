import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Canvas from '../canvas';
import ProjectStartScreen from './start-screen';
import { CurrentLocations } from '../../constants';

class Main extends React.Component {
  render () {
    const { builder } = this.props;
    const { currentLocation } = builder;

    const mainClassName = classNames('ab-main', {
      'fullsize': currentLocation === CurrentLocations.TEMPLATESELECTION,
      'preview': currentLocation === CurrentLocations.PREVIEW
    });

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
