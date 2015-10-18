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
          <h1>Drop some content!</h1>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default CanvasSuggestionBox;