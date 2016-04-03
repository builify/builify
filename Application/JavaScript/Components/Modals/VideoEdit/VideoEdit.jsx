import { connect } from 'react-redux';
import { closeModal } from '../../../Actions';
import React from 'react';
import classNames from 'classnames';
import QueryString from 'querystring';
import isNull from 'lodash/isnull';
import URL from 'url';
import ModalWrapper from '../Common/Wrapper';
import ModalTab from '../Common/Tab';
import BottomNavigation from '../Common/BottomNavigation';
import Input from '../../Shared/Input';
import PreviewVideo from '../../Shared/PreviewVideo';

class VideoEdit extends React.Component {
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

    if (videoHolderElement) {
      const parsedURL = URL.parse(url);
      const query = QueryString.parse(parsedURL.query);
      const host = parsedURL.host.toLowerCase();
      let videoID = null;

      if (host.indexOf('youtube.com') >= 0) {
        videoID = query.v;
      } else if (host.indexOf('youtu.be') >= 0) {
        videoID = parsedURL.path.substring(1);
      }

      if (!isNull(videoID)) {
        videoHolderElement.setAttribute('data-videoid', videoID);
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

    if (videoHolderElement) {
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
    const className = classNames('ab-modal', 'ab-modal__small');
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
          <div className='ab-modal__tab'>
            <Input
              className='ab-modal__input'
              type='text'
              label='URL'
              name='url'
              value={url}
              maxLength={128}
              onChange={::this.handleInputChange} />
            <PreviewVideo
              background='white'
              width='600px'
              height='330px'
              src={url} />
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

export default connect(null, mapDispatchToProps)(VideoEdit);
