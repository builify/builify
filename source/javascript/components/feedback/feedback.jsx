import React from 'react';
import { connect } from 'react-redux';
import { openFeedbackModal } from '../../actions';

class FeedBackWrapper extends React.Component {
  static propTypes = {
    openFeedbackModal: React.PropTypes.func.isRequired
  };

  openDisplay () {
    return this.props.openFeedbackModal();
  }

  render () {
    return (
      <div>
        <div className='tt-feedback' onClick={::this.openDisplay}>
          <div className='tt-feedback__text'>Send Feedback</div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openFeedbackModal: () => {
      dispatch(openFeedbackModal());
    }
  };
}

export default connect(null, mapDispatchToProps)(FeedBackWrapper);
