import React, { Component, PropTypes } from 'react';

class CanvasSuggestionBox extends Component {
  static propTypes = {
    display: PropTypes.bool
  }

  static defaultProps = {
    display: true
  }

  render () {
    const { display } = this.props;

    if (display) {
      return (
        <div className='ab-suggestionBox'>
          <h1>This is where your page will appear</h1>
          <h2>So drop some contentblocks!</h2>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default CanvasSuggestionBox;
