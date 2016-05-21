import React from 'react';
import Mime from 'mime';
import _isNull from 'lodash/isnull';
import QueryString from 'querystring';
import URL from 'url';

export default class PreviewVideo extends React.Component {
  static propTypes = {
    src: React.PropTypes.string,
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    background: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  };

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

    if (_isNull(type) || _isNull(videoID)) {
      return null;
    } else {
      if (type === 'youtube') {
        const source = `http://www.youtube.com/embed/${videoID}?autoplay=0`;

        return (
          <iframe
            type='text/html'
            width={this.props.width}
            height={this.props.height}
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
      <div className='tt-previewview' style={style}>
        { this.renderVideo() }
      </div>
    );
  }
}
