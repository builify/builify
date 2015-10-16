import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Builder from '../../Common/Builder';
import Switch from './Switch';

class Toggle extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    toggled: PropTypes.bool,
    defaultToggled: PropTypes.bool,
    action: PropTypes.object
  }

  static defaultProps = {
    name: 'toggleName01',
    value: 'toggleValue01',
    label: 'Toggle switch',
    toggled: true,
    defaultToggled: true,
    action: {}
  }

  constructor (props) {
    super(props);

    this.state = {
      isSwitched: this.props.toggled
    };
  }

  toggleSwitch (e) {
    const { action } = this.props;

    e.preventDefault();

    if (action.hasOwnProperty('target') && action.hasOwnProperty('activeClassname')) {
      const { target, activeClassname } = action;
      const targetElement = Builder.getIframeWindow(document.getElementById('ab-cfrm'));

      if (targetElement !== undefined) {
        const elementToAddress = targetElement.document.querySelector(target);
        
        if (elementToAddress !== null) {
          elementToAddress.classList.toggle(activeClassname);
        }
      }
    }

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

function mapStateToProps (state) {
  return {
    theme: state.theme
  }
}

export default connect(
  mapStateToProps
)(Toggle);