import React, { Component, PropTypes } from 'react';
import Switch from './Switch';

class Toggle extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    toggled: PropTypes.bool,
    defaultToggled: PropTypes.bool
  }

  static defaultProps = {
    name: 'toggleName01',
    value: 'toggleValue01',
    label: 'Toggle switch',
    toggled: true,
    defaultToggled: true
  };

  constructor (props) {
    super(props);

    this.state = {
      isSwitched: this.props.toggled
    };
  }

  toggleSwitch (e) {
    e.preventDefault();

    this.setState({
      isSwitched: !this.state.isSwitched
    });
  }

  render () {
    let { isSwitched } = this.state;

    return (
      <div 
        onClick={::this.toggleSwitch}
        className='ab-toggle'>
        <label>{this.props.label}</label>
        <Switch isToggled={isSwitched}/>
      </div>
    )
  }
}

export default Toggle;