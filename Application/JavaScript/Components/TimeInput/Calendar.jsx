import React from 'react';
import classNames from 'classnames';
import range from 'lodash/utility/range';
import chunk from 'lodash/array/chunk';
import Events from '../../Common/Events';

class Day extends React.Component {
  render () {
    const { i, w, d } = this.props;
    const prevMonth = (w === 0 & i > 7);
    const nextMonth = (w >= 4 && i <= 14);
    const className = classNames({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': (!prevMonth && !nextMonth && (i === d))
    });

    return <td className={className} {...this.props}>{i}</td>;
  }
}

export default class Calendar extends React.Component {
  static propTypes = {
    time: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func
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

    return (
      <div className={className}>
        <div className='ab-calendar__toolbar'>
          <button type='button' className='prev-month' onClick={::this.prevMonthClick}>
           Prev
          </button>
          <span className='current-date'>{time.format('MMMM YYYY')}</span>
          <button type='button' className='next-month' onClick={::this.nextMonthClick}>
           Next
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
                    onClick={this.selectDate.bind(null, i, w)} />
                )) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}
