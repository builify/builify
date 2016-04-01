import React from 'react';
import classNames from 'classnames';
import InputSlider from '../Shared/Size';

export default class Time extends React.Component {
  static propTypes = {
    time: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    className: '',
    onChange: () => {}
  };

  render () {
    const className = classNames(this.props.className);

    return (
      <div className={className}>
        <InputSlider
          item={{
            label: 'test',
            min: 0,
            max: 10,
            step: 1
          }}/>
      </div>
    );
  }
}
