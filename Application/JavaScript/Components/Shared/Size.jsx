import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProperty, randomKey } from '../../Common/Common';
import { getString } from '../../Common/Localization';

class Size extends Component {
  render () {
    const { template, item } = this.props;
    let defaultValue = getProperty(template, item.label);
    const outputRefName = randomKey('sizeOutput');
    const changeEvent = (e) => {
      e.preventDefault();
      let { target } = e;
      let { value } = target;

      this.refs[outputRefName].innerHTML = value;
    };
    let isIE = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

    return (
      <div
        className='ab-size'>
        <label>{getString(item.label)}</label>
        <input
          onMouseUp={isIE ? changeEvent : () => {}}
          onChange={!isIE ? changeEvent : () => {}}
          defaultValue={defaultValue !== 'undefined' ? defaultValue : 0}
          step={1}
          min={item.min}
          max={item.max}
          type='range'
          name='range' />
        <div className='ab-size__output'>
          <span ref={outputRefName}>
            {defaultValue !== 'undefined' ? defaultValue : 0}
          </span>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    template: state.template
  }
}

export default connect(
  mapStateToProps
)(Size);
