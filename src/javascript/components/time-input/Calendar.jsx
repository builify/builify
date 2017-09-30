import React from 'react';
import PropTypes from 'prop-types';
import { range, chunk } from 'lodash';
import classNames from 'classnames';
import Events from '../../Common/Events';
import Icon from '../shared/icon';

class Day extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  render () {
    const { i, w, d, onClick } = this.props;
    const prevMonth = (w === 0 & i > 7);
    const nextMonth = (w >= 4 && i <= 14);
    const className = classNames({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': (!prevMonth && !nextMonth && (i === d))
    });

    return <td onClick={onClick} className={className} {...this.props}>{i}</td>;
  }
}

export default class Calendar extends React.Component {
  static propTypes = {
    time: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    onChange: () => {}
  };

  prevMonthClick (evt) {
    Events.pauseEvent(evt);
    this.props.onChange(this.props.time.subtract(1, 'month'));
  }

  nextMonthClick (evt) {
    Events.pauseEvent(evt);
    this.props.onChange(this.props.time.add(1, 'month'));
  }

  selectDate (i, w) {
    const { time } = this.props;
    const prevMonth = (w === 0 & i > 7);
    const nextMonth = (w >= 4 && i <= 14);

    console.log('d');

    time.date(i);

    if (prevMonth) {
      time.subtract(1, 'month');
    }

    if (nextMonth) {
      time.add(1, 'month');
    }

    return this.props.onChange(time);
  }

  render () {
    const { time } = this.props;
    const d = time.date();
    const d1 = time.clone().subtract(1, 'month').endOf('month').date();
    const d2 = time.clone().date(1).day();
    const d3 = time.clone().endOf('month').date();
    const days = [].concat(
      range(d1-d2+1, d1+1),
      range(1, d3+1),
      range(1, 42-d3-d2+1)
    );
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const className = classNames('ab-calendar', this.props.className);
    const iconSize = 26;

    return (
      <div className={className}>
        <div className='ab-calendar__toolbar'>
          <button type='button' className='prev-month' onClick={::this.prevMonthClick}>
            <Icon icon='chevron-left' size={iconSize} />
          </button>
          <span className='current-date'>{time.format('MMMM YYYY')}</span>
          <button type='button' className='next-month' onClick={::this.nextMonthClick}>
            <Icon icon='chevron-right' size={iconSize} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              { weeks.map((w, i) => <td key={i}>{w}</td>) }
            </tr>
          </thead>
          <tbody>
            { chunk(days, 7).map((row, w) => (
              <tr key={w}>
                { row.map((i) => (
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    onClick={() => {
                      this.selectDate(i, w);
                    }} />
                )) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}
