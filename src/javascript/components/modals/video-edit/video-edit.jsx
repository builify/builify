import React from 'react';
import PropTypes from 'prop-types';
import QueryString from 'querystring';
import URL from 'url';
import { connect } from 'react-redux';
import {
  isNull as _isNull,
  isElement as _isElement
} from 'lodash';
import classNames from '../../../common/classnames';
import ModalWrapper from '../common/wrapper';
import ModalTab from '../common/tab';
import BottomNavigation from '../common/bottom-navigation';
import Input from '../../shared/input';
import PreviewVideo from '../../shared/preview-video';
import { closeModal, addNotification } from '../../../actions';

const DEFAULT_VIDEO_EDIT_URL = 'https://www.youtube.com/watch?v=XNdNLNFZBmk';

class VideoEdit extends React.Component {
  static propTypes = {
    editTarget: PropTypes.any,
    addNotification: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  };

  static defaultProps = {
    editTarget: null
  };

  state = {
    url: DEFAULT_VIDEO_EDIT_URL
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.url !== this.state.url) {
      return true;
    }

    return false;
  }

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  saveVideo () {
    const { url } = this.state;
    const { editTarget } = this.props;

    if (!_isElement(editTarget)) {
      return this.closeDialog();
    }

    const videoHolderElement = editTarget.querySelector('.background-video-holder');

    if (_isElement(videoHolderElement)) {
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

    return this.closeDialog();
  }

  handleInputChange (value) {
    this.setState({
      url: value
    });
  }

  componentWillMount () {
    const { editTarget } = this.props;

    if (_isElement(editTarget)) {
      const videoHolderElement = editTarget.querySelector('.background-video-holder');

      if (_isElement(videoHolderElement)) {
        const videoID = videoHolderElement.getAttribute('data-videoid');
        const url = `https://www.youtube.com/watch?v=${videoID}`;

        this.setState({
          url
        });
      }
    }
  }

  render () {
    const { url } = this.state;
    const { closeModal } = this.props;
    const className = classNames(['modal', 'modal__small']);
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveVideo }
    ];

    return (
      <ModalWrapper ref='modalWrapper' onClose={closeModal} className={className}>
        <ModalTab title='Change Video Source' onClose={::this.closeDialog}>
          <div className={classNames('modal__tab')}>
            <Input
              className={classNames('modal__input')}
              type='text'
              label='URL'
              name='url'
              icon='youtube'
              value={url}
              maxLength={256}
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
