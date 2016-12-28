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
    issue: 'Describe your issues or share your ideas'
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.issue !== this.state.issue) {
      return true;
    }

    return false;
  }

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
    const containerWithPaddingStyle = _assign({}, containerStyle, {
      borderTop: '1px solid #e1e1e1',
      padding: '20px 0 0 0'
    });
    const style = {
      height: '120px',
      marginBottom: '10px'
    };
    const paragraphStyle = {
      fontSize: '14px',
      color: '#666',
      padding: '10px 40px 0 40px'
    };
    const className = classNames(['modal', 'modal__dialog']);

    return (
      <ModalWrapper ref='modalWrapper' className={className} onClose={this.props.closeModal}>
        <ModalTab title='Send Feedback' onClose={::this.closeDialog}>
          <div>
            <div className={classNames('modal__tab')}>
              <Input
                className={classNames('modal__input')}
                type='text'
                label='Feedback'
                multiline={true}
                maxLength={2000}
                style={style}
                value={this.state.issue}
                onChange={::this.handleInputChange} />
              <div style={containerWithPaddingStyle}>
                <p style={paragraphStyle}>Your feedback and additional info will be sent to <a href='http://builify.com'>BUILify</a>. See Privacy Policy and Terms of Service.</p>
              </div>
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
    closeModal: function () {
      dispatch(closeModal());
    },

    sendFeedBack: function (payload) {
      dispatch(sendFeedBack(payload));
    }
  };
}

export default connect(null, mapDispatchToProps)(Feedback);
