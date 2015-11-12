import React, { Component } from 'react';
import Button from './Button';
import Title from './Title';

class PageFile extends Component {
  render () {
    return (
      <div>
        <Title title='Page File' />
        <div className='ab-itemwrap'>
          <Button
            accent={false}
            label='Save Page As' />
          <Button
            label='Import Page' />
          <Button
            label='Export Page' />
        </div>
      </div>
    )
  }
}

export default PageFile;
