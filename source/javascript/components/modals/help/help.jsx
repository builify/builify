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
    const className = classNames(['modal', 'modal__transparent']);

    return (
      <ModalWrapper ref='modalWrapper' className={className} onClose={this.props.closeModal}>
        <section>
          <h3 className={classNames('modal__transparent__title')}>Help</h3>
          <p>Create your pages by adding contentblocks and styling them. Read <a href="http://builify.trip-trax.com/documentation" target="_blank">documentation</a> for help.</p>
        </section>
        <section>
          <h3 className={classNames('modal__transparent__title')}>Keyboard shortcuts</h3>
          <table className={classNames('modal__transparent__shortcuts')}>
            <tbody>
              <tr>
                <th>Key</th>
                <th>Action</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + S</td>
                <td>Save current page</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + R</td>
                <td>Restart page</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + V + D</td>
                <td>Desktop preview mode</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + V + M</td>
                <td>Tablet preview mode</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>CTRL + V + P</td>
                <td>Phone preview mode</td>
              </tr>
            </tbody>
          </table>
        </section>
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
