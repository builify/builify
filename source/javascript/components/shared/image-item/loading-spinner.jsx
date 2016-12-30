import React from 'react';

export default class ImageSpinner extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    color: React.PropTypes.string,
    size: React.PropTypes.number
  };

  static defaultProps = {
    loading: true,
    size: 50
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    const { size } = this.props;
    const moonSize = size / 7;

    return (
      <div className='ab-loadimage__icon'
        style={{
          marginTop: -(size / 2),
          marginLeft: -(size / 2),
          width: size,
          height: size
        }}>
        <div className='icon'
          style={{
            width: size,
            height: size
          }}>
          <div className='icon__ball'
            style={{
              height: moonSize,
              width: moonSize
            }} />
          <div className='icon__track'
            style={{
              width: size,
              height: size,
              borderWidth: moonSize
            }} />
        </div>
      </div>
    );
  }
}

