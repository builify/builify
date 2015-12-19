import React from 'react';

export default class CanvasSuggestionBox extends React.Component {
  static propTypes = {
    display: React.PropTypes.bool
  };

  static defaultProps = {
    display: true
  };

  render () {
    const { display } = this.props;

    if (display) {
      return (
        <div className='ab-suggestionBox'>
          <h1>This is where your page will appear</h1>
          <h2>So drop some contentblocks!</h2>
        </div>
      );
    } else {
      return null;
    }
  }
}
