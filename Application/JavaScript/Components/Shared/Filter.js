import React, { Component } from 'react';
import Icon from './Icon';

class Filter extends Component {
  openFilter (e) {
    e.preventDefault();
  }

  render () {
    return (
      <div className='ab-filter'>
        <div 
          className='ab-filter__text'
          onClick={::this.openFilter}>
          <div>{'Filter'}</div>
        </div>
        <div className='ab-filter__items'>

        </div>
      </div>
    )
  }
}

export default Filter;