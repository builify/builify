import React from 'react';
import classNames from 'classnames';
import TimePicker from './TimePicker';

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
    const { time, onChange } = this.props;
    const className = classNames('ab-time', this.props.className);

    return (
      <div className={className}>
        <TimePicker
          time={time}
          onChange={onChange} />
      </div>
    );
  }
}
