import React, { Component, PropTypes } from 'react';

class ImageSpinner extends Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    color: React.PropTypes.string,
    size: React.PropTypes.number
  }

  static defaultProps = {
    loading: true,
    size: 50
  }

  state = {
    loading: this.props.loading
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  render () {
    const { loading } = this.state;

    if (loading) {
      const { size } = this.props;
      const moonSize = size / 7;

      return (
        <div
          className='ab-loadimage__icon'
          style={{
            marginTop: -(size / 2),
            marginLeft: -(size / 2),
            width: size,
            height: size
          }}>
          <div
            className='icon'
            style={{
              width: size,
              height: size
            }}>
            <div
              className='icon__ball'
              style={{
                height: moonSize,
                width: moonSize
              }} />
            <div
              className='icon__track'
              style={{
                width: size,
                height: size,
                borderWidth: moonSize
              }} />
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default ImageSpinner;
