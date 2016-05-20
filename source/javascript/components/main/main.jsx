import React from 'react';
import classNames from '../../common/classnames';
import Canvas from '../canvas';
import ProjectStartScreen from './start-screen';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../constants';

class Main extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired
  };

  render () {
    const { builder } = this.props;
    const { currentLocation } = builder;

    const mainClassName = classNames('main', {
      'fullsize': currentLocation === CurrentLocations.TEMPLATESELECTION,
      'preview': currentLocation === CurrentLocations.PREVIEW
    });

    return (
      <main className={mainClassName}>
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
