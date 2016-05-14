import { connect } from 'react-redux';
import { closeModal } from '../../../actions';
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import TimeInput from '../../time-input';

class Countdown extends React.Component {
  state = {
    time: moment()
  };

  componentWillMount () {
    const { editTarget } = this.props;

    if (editTarget) {
      const countdownElement = editTarget.querySelector('.countdown');

      if (countdownElement) {
        const dataDate = countdownElement.getAttribute('data-date');
        const momentDate = moment(dataDate, 'YYYY-MM-DD');

        this.setState({
          time: momentDate
        });
      }
    }
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  handleChange (time) {
    this.setState({
      time: time
    });
  }

  saveDate () {
    const { editTarget } = this.props;

    if (editTarget) {
      const countdownElement = editTarget.querySelector('.countdown');

      if (countdownElement && countdownElement.getAttribute('data-date')) {
        countdownElement.setAttribute('data-date', '2017/03/01');
      }
    }

    this.closeDialog();
  }

  render () {
    const { active, closeModal } = this.props;
    const className = classNames('ab-modal', 'ab-modal__small', 'ab-modal__userselect');
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveDate }
    ];

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={closeModal}
        active={active}
        className={className}>
        <ModalTab
          title='Change Countdown Date'
          info={this.state.time.format('dddd, MMMM Do YYYY, HH:mm')}>
          <div className='ab-modal__tab'>
            <TimeInput
              time={this.state.time}
              onChange={::this.handleChange} />
          </div>
          <BottomNavigation actions={actions} />
        </ModalTab>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(Countdown);
