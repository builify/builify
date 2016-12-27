import React from 'react';
import _assign from 'lodash/assign';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import { connect } from 'react-redux';
import { closeModal, sendFeedBack } from '../../../actions';

class Feedback extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired,
    sendFeedBack: React.PropTypes.func.isRequired
  };

  state = {
    issue: '.custom-css { font-size: 14px; }'
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  handleInputChange (value) {
    this.setState({
      ...this.state,
      issue: value
    });
  }

  sendFeedBack () {
    const { issue } = this.state;
    const payload = {
      issue: issue
    };

    this.closeDialog();

    return this.props.sendFeedBack(payload);
  }

  render () {
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Send', onClick: ::this.sendFeedBack }
    ];
    const containerStyle = {
      background: '#f5f5f5'
    };
    const style = {
      height: '200px',
      fontSize: '12px',
      maxHeight: '300px'
    };
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref='modalWrapper' className={className} onClose={this.props.closeModal}>
        <ModalTab title='Custom CSS' onClose={this.props.closeModal}>
          <div>
            <div className={classNames('modal__tab')}>
              <Input
                className={classNames('modal__input')}
                type='text'
                label='Custom CSS'
                multiline
                showLength
                style={style}
                value={this.state.issue}
                onChange={::this.handleInputChange} />
            </div>
          </div>
          <BottomNavigation style={containerStyle} actions={actions} />
        </ModalTab>
      </ModalWrapper>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },

    sendFeedBack: (payload) => {
      dispatch(sendFeedBack(payload));
    }
  };
}

export default connect(null, mapDispatchToProps)(Feedback);
