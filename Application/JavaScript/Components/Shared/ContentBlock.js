import React, { Component } from 'react';

class ContentBlock extends Component {
  clickEvent (e) {
    alert("s")
  }

  render () {
    return (
      <figure 
        className='ab-contentblocks__block'
        onClick={::this.clickEvent}> 
        <img src='http://pivot.mediumra.re/variant/img/sections/variant-hero-slider-2.jpg' />
        <figcaption>
          <span>Multilayer slide</span>
        </figcaption>
      </figure>
    )
  }
}

export default ContentBlock;