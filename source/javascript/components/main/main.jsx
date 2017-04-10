import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from '../../common/classnames';
import Canvas from '../canvas';
import ProjectStartScreen from './start-screen';
import { CurrentLocations } from '../../constants';

class Main extends React.Component {
  static propTypes = {
    currentLocation: PropTypes.number.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.currentLocation !== nextProps.currentLocation) {
      return true;
    }

    return false;
  }

  render () {
    const { currentLocation } = this.props;

    const mainClassName = classNames('main', {
      fullsize: currentLocation === CurrentLocations.TEMPLATESELECTION,
      preview: currentLocation === CurrentLocations.PREVIEW
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
  const { builder } = state;
  const { currentLocation } = builder;

  return {
    currentLocation
  };
}

export default connect(mapStateToProps)(Main);
