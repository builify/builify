import React from 'react';
import QueryString from 'querystring';
import _isNull from 'lodash/isnull';
import _isUndefined from 'lodash/isundefined';
import _isElement from 'lodash/iselement';
import URL from 'url';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import PreviewVideo from '../../shared/preview-video';
import { connect } from 'react-redux';
import { closeModal, addNotification } from '../../../actions';

class VideoEdit extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    editTarget: React.PropTypes.node.isRequired,
    addNotification: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired
  };

  state = {
    url: 'https://www.youtube.com/watch?v=XNdNLNFZBmk'
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  saveVideo () {
    const { url } = this.state;
    const { editTarget } = this.props;
    const videoHolderElement = editTarget.querySelector('.block-video-holder');

    if (!_isUndefined(videoHolderElement) && _isElement(videoHolderElement)) {
      const parsedURL = URL.parse(url);
      const query = QueryString.parse(parsedURL.query);
      const host = parsedURL.host.toLowerCase();
      let videoID = null;

      if (host.indexOf('youtube.com') >= 0) {
        videoID = query.v;
      } else if (host.indexOf('youtu.be') >= 0) {
        videoID = parsedURL.path.substring(1);
      }

      if (!_isNull(videoID)) {
        videoHolderElement.setAttribute('data-videoid', videoID);

        this.props.addNotification({
          message: 'Video changed!',
          title: 'Video Change',
          level: 'info',
          autoDismiss: 3
        });
      }
    }

    this.closeDialog();
  }

  handleInputChange (value) {
    this.setState({
      url: value
    });
  }

  componentWillMount () {
    const { editTarget } = this.props;
    const videoHolderElement = editTarget.querySelector('.block-video-holder');

    if (!_isUndefined(videoHolderElement) && _isElement(videoHolderElement)) {
      const videoID = videoHolderElement.getAttribute('data-videoid');
      const url = `https://www.youtube.com/watch?v=${videoID}`;

      this.setState({
        url: url
      });
    }
  }

  render () {
    const { url } = this.state;
    const { active, closeModal } = this.props;
    const className = classNames(['modal', 'modal__small']);
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveVideo }
    ];

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={closeModal}
        active={active}
        className={className}>
        <ModalTab
          title='Change Video Source'>
          <div className={classNames('modal__tab')}>
            <Input
              className={classNames('modal__input')}
              type='text'
              label='URL'
              name='url'
              value={url}
              maxLength={128}
              onChange={::this.handleInputChange} />
            <PreviewVideo background='white' width='600px' height='330px' src={url} />
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
    },

    addNotification: (notification) => {
      dispatch(addNotification(notification));
    }
  };
}

export default connect(null, mapDispatchToProps)(VideoEdit);
