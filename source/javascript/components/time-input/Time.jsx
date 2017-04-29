import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimePicker from '../Shared/TimePicker';

export default class Time extends React.Component {
  static propTypes = {
    time: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
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
