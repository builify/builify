import { connect } from 'react-redux';
import { closeModal } from '../../../Actions';
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import ModalWrapper from '../ModalWrapper';
import ModalTab from '../ModalTab';
import ModalBottomNavigation from '../ModalBottomNavigation';
import TimeInput from '../../TimeInput';

class Countdown extends React.Component {
  state = {
    time: moment()
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  handleChange (time) {
    this.setState({
      time: time
    });
  }

  render () {
    const { active, closeModal } = this.props;
    const className = classNames('ab-modal', 'ab-modal__small');

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={closeModal}
        active={active}
        className={className}>
        <ModalTab
          title='Change Countdown Date'>
          <div className='ab-modal__tab'>
            <TimeInput
              time={this.state.time}
              onChange={::this.handleChange} />
          </div>
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
