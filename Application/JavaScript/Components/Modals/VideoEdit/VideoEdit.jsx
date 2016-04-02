import { connect } from 'react-redux';
import { closeModal } from '../../../Actions';
import React from 'react';
import classNames from 'classnames';
import Mime from 'mime';
import isNull from 'lodash/isnull';
import QueryString from 'querystring';
import URL from 'url';
import ModalWrapper from '../Common/Wrapper';
import ModalTab from '../Common/Tab';
import BottomNavigation from '../Common/BottomNavigation';

class PreviewVideo extends React.Component {
  static defaultProps = {
    background: 'black'
  };

  state = {
    type: null,
    videoID: null
  };

  componentWillMount () {
    this.updatePreview(this.props.src);
  }

  componentWillReceiveProps (props) {
    if (props.src !== this.props.src) {
      this.updatePreview(props.src);
    }
  }

  updatePreview (source) {
    const mimeType = Mime.lookup(source);
    var type = this.state.type;
    var videoID = this.state.videoID;

    if (mimeType === 'application/octet-stream') {
      const parsedURL = URL.parse(source);
      const query = QueryString.parse(parsedURL.query);
      const host = parsedURL.host.toLowerCase();

      if (host.indexOf('youtube.com') >= 0) {
        type = 'youtube';
        videoID = query.v;
      } else if (host.indexOf('youtu.be') >= 0) {
        type = 'youtube';
        videoID = parsedURL.path.substring(1);
      }
    }

    this.setState({
      type: type,
      videoID: videoID
    });
  }

  renderVideo () {
    const { type, videoID } = this.state;

    if (isNull(type) || isNull(videoID)) {
      return null;
    } else {
      if (type === 'youtube') {
        const source = `http://www.youtube.com/embed/${videoID}?autoplay=0`;

        return (
          <iframe
            type='text/html'
            width={this.props.width}
            height={ this.props.height}
            src={source}
            frameBorder='0' />
        );
      }
    }
  }

  render () {
    const style = {
      width: this.props.width,
      height: this.props.height,
      overflow: 'hidden',
      background: this.props.background
    };

    return (
      <div className='ab-previewview' style={style}>
       { this.renderVideo() }
      </div>
    );
  }
}

class VideoEdit extends React.Component {
  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  render () {
    const { active, closeModal } = this.props;
    const className = classNames('ab-modal', 'ab-modal__small');
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save' }
    ];

    return (
      <ModalWrapper
        ref='modalWrapper'
        onClose={closeModal}
        active={active}
        className={className}>
        <ModalTab
          title='Change Video'>
          <div className='ab-modal__tab'>
            <PreviewVideo
              background='white'
              width='600px'
              height='330px'
              src={'https://www.youtube.com/watch?v=XNdNLNFZBmk'} />
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
